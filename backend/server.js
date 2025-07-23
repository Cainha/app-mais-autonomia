const express = require('express');
const admin = require('firebase-admin');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

const serviceAccount = require('./serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://mais-autonomia-default-rtdb.firebaseio.com"
});

const db = admin.database();

const autenticarUsuario = async (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith('Bearer ')) {
    return res.status(401).json({ erro: 'Token não fornecido ou mal formatado' });
  }
  const idToken = authorization.split('Bearer ')[1];
  try {
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    req.userId = decodedToken.uid;
    next();
  } catch (error) {
    return res.status(403).json({ erro: 'Token inválido ou expirado' });
  }
};

app.post('/perfil', autenticarUsuario, async (req, res) => {
  try {
    const { userId, body: { nome, cpf } } = req;
    if (!nome || !cpf) {
      return res.status(400).json({ erro: 'Nome e CPF são obrigatórios.' });
    }
    await db.ref(`usuarios/${userId}`).set({ nome, cpf });
    res.status(201).json({ sucesso: true, mensagem: 'Perfil criado com sucesso.' });
  } catch (error) {
    res.status(500).json({ erro: 'Erro ao salvar perfil do usuário.' });
  }
});

app.use('/medicamentos', autenticarUsuario);
app.use('/arquivados', autenticarUsuario);

// --- ROTAS DE MEDICAMENTOS ---
app.get('/medicamentos', async (req, res) => {
  const snapshot = await db.ref(`medicamentos/${req.userId}`).once('value');
  const data = snapshot.val() || {};
  const lista = Object.keys(data).map(key => ({ id: key, ...data[key] }));
  res.json(lista);
});

app.post('/medicamentos', async (req, res) => {
  const { userId, body: novoMed } = req;

  try {
    // Se o tipo de término for "No fim da cartela", calcular a data de término
    if (novoMed.finaliza === 'No fim da cartela' && novoMed.quantidade > 0) {
      const hoje = new Date();
      let diasAdicionais = 0;

      switch (novoMed.frequencia) {
        case 'Diariamente':
          diasAdicionais = novoMed.quantidade - 1;
          break;
        case 'Intercalado':
          diasAdicionais = (novoMed.quantidade * 2) - 1;
          break;
        case 'A cada 2 dias':
          diasAdicionais = (novoMed.quantidade * 3) - 1;
          break;
        default:
          diasAdicionais = novoMed.quantidade - 1;
      }

      const dataTermino = new Date(hoje);
      dataTermino.setDate(hoje.getDate() + diasAdicionais);

      // Formatar data para dd/MM/yyyy
      const dia = dataTermino.getDate().toString().padStart(2, '0');
      const mes = (dataTermino.getMonth() + 1).toString().padStart(2, '0');
      const ano = dataTermino.getFullYear();

      novoMed.dataTermino = `${dia}/${mes}/${ano}`;
    }

    const novaRef = await db.ref(`medicamentos/${userId}`).push(novoMed);
    res.status(201).json({
      id: novaRef.key,
      ...novoMed,
      // Garantir que todos os campos estejam presentes
      comprimidosRestantes: novoMed.quantidade || 0
    });

  } catch (error) {
    console.error('Erro ao salvar medicamento:', error);
    res.status(500).json({ erro: 'Não foi possível salvar o medicamento' });
  }
});

app.put('/medicamentos/:id', async (req, res) => {
  const { userId, params: { id }, body: medAtualizado } = req;
  await db.ref(`medicamentos/${userId}/${id}`).update(medAtualizado);
  res.json({ id, ...medAtualizado });
});

// --- NOVA ROTA PARA ARQUIVAR ---
app.post('/medicamentos/:id/archive', async (req, res) => {
  const { userId, params: { id } } = req;
  const medRef = db.ref(`medicamentos/${userId}/${id}`);
  const snapshot = await medRef.once('value');
  const medData = snapshot.val();

  if (!medData) {
    return res.status(404).json({ erro: 'Medicamento não encontrado.' });
  }

  const arqRef = db.ref(`arquivados/${userId}/${id}`);
  await arqRef.set(medData);

  await medRef.remove();

  res.json({ sucesso: true, mensagem: 'Medicamento arquivado com sucesso.' });
});


// --- ROTAS DE ARQUIVADOS ---
app.get('/arquivados', async (req, res) => {
  const snapshot = await db.ref(`arquivados/${req.userId}`).once('value');
  const data = snapshot.val() || {};
  const lista = Object.keys(data).map(key => ({ id: key, ...data[key] }));
  res.json(lista);
});

// --- NOVA ROTA PARA RESTAURAR ---
app.post('/arquivados/:id/restore', async (req, res) => {
  const { userId, params: { id } } = req;
  const arqRef = db.ref(`arquivados/${userId}/${id}`);
  const snapshot = await arqRef.once('value');
  const medData = snapshot.val();

  if (!medData) {
    return res.status(404).json({ erro: 'Medicamento arquivado não encontrado.' });
  }

  const medRef = db.ref(`medicamentos/${userId}/${id}`);
  await medRef.set(medData);

  await arqRef.remove();

  res.json({ sucesso: true, mensagem: 'Medicamento restaurado com sucesso.' });
});

app.delete('/arquivados/:id', async (req, res) => {
  const { userId, params: { id } } = req;
  await db.ref(`arquivados/${userId}/${id}`).remove();
  res.json({ message: 'Arquivado removido com sucesso' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor a rodar na porta ${PORT}`);
});
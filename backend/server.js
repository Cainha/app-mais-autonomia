const express = require('express');
const admin = require('firebase-admin');
const cors = require('cors');
const app = express();

// Habilita CORS
app.use(cors());
app.use(express.json());

const serviceAccount = require('./serviceAccountKey.json');
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

// Rota de teste
app.get('/test', (req, res) => {
  res.json({ message: 'Backend está funcionando!' });
});

app.post('/login-google', async (req, res) => {
  const { idToken } = req.body;
  
  if (!idToken) {
    return res.status(400).json({ 
      sucesso: false, 
      mensagem: 'Token não fornecido' 
    });
  }

  try {
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    res.json({ 
      sucesso: true, 
      usuario: decodedToken 
    });
  } catch (error) {
    console.error('Erro ao verificar token:', error);
    res.status(401).json({ 
      sucesso: false, 
      mensagem: 'Token inválido',
      erro: error.message 
    });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Backend rodando na porta ${PORT}`);
  console.log(`Teste o servidor em: http://localhost:${PORT}/test`);
});
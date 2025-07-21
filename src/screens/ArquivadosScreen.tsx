import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator, Alert } from 'react-native';
import MedicamentoCardArquivado from '../components/MedicamentoCardArquivado';
import ConfirmationModal from '../components/ConfirmationModal';
import { useFocusEffect } from '@react-navigation/native';

const iconeMap: Record<string, any> = {
  moon: require('../assets/lua.png'),
  sunrise: require('../assets/nascerSol.png'),
  sun: require('../assets/sol.png'),
  cloud: require('../assets/solSePondo.png'),
};

function getTurnoVisual(horario: string) {
  const [h] = horario.split(':').map(Number);
  if (h >= 5 && h <= 10) {
    return { icone: 'sunrise' };
  } else if (h >= 11 && h <= 15) {
    return { icone: 'sun' };
  } else if (h >= 16 && h <= 20) {
    return { icone: 'cloud' };
  } else {
    return { icone: 'moon' };
  }
}

export default function ArquivadosScreen() {
  const [arquivados, setArquivados] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState<{ tipo: 'restaurar' | 'excluir'; med: any } | null>(null);

  const fetchArquivados = async () => {
    setLoading(true);
    try {
      const res = await fetch('http://10.0.2.2:3000/arquivados');
      const data = await res.json();
      setArquivados(data);
    } catch (e) {
      setArquivados([]);
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchArquivados();
    }, [])
  );

  const handleRestaurar = async (med: any) => {
    try {
      // Adiciona de volta em medicamentos
      await fetch('http://10.0.2.2:3000/medicamentos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(med),
      });
      // Remove de arquivados
      await fetch(`http://10.0.2.2:3000/arquivados/${med.id}`, {
        method: 'DELETE',
      });
      fetchArquivados();
      Alert.alert('Restaurado', 'O medicamento foi restaurado para a lista principal.');
    } catch (e) {
      Alert.alert('Erro', 'Não foi possível restaurar o medicamento.');
    }
  };

  const handleExcluir = async (med: any) => {
    try {
      await fetch(`http://10.0.2.2:3000/arquivados/${med.id}`, {
        method: 'DELETE',
      });
      fetchArquivados();
      Alert.alert('Excluído', 'O medicamento arquivado foi excluído.');
    } catch (e) {
      Alert.alert('Erro', 'Não foi possível excluir o medicamento.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tratamentos Arquivados</Text>
      {loading ? (
        <ActivityIndicator size="large" color="#1565c0" style={{ marginTop: 32 }} />
      ) : arquivados.length === 0 ? (
        <Text style={styles.emptyText}>Nenhum medicamento arquivado.</Text>
      ) : (
        <FlatList
          data={arquivados}
          keyExtractor={item => item.id}
          contentContainerStyle={{ paddingBottom: 80 }}
          renderItem={({ item }) => {
            const visual = getTurnoVisual(item.horario);
            return (
              <MedicamentoCardArquivado
                {...item}
                icone={iconeMap[visual.icone]}
                onRestaurar={() => setModal({ tipo: 'restaurar', med: item })}
                onExcluir={() => setModal({ tipo: 'excluir', med: item })}
              />
            );
          }}
        />
      )}
      <ConfirmationModal
        visible={!!modal && modal.tipo === 'restaurar'}
        title="Você deseja restaurar este tratamento?"
        message="Esta ação irá mover o medicamento de volta para a lista principal."
        confirmText="Restaurar"
        cancelText="Cancelar"
        onConfirm={() => {
          if (modal) handleRestaurar(modal.med);
          setModal(null);
        }}
        onCancel={() => setModal(null)}
      />
      <ConfirmationModal
        visible={!!modal && modal.tipo === 'excluir'}
        title="Você tem certeza que deseja excluir este medicamento arquivado?"
        message="Este medicamento não poderá mais ser restaurado para as medicações atuais, mas permanecerá registrado no relatório."
        icon={require('../assets/iconeLixeira.png')}
        confirmText="Excluir"
        cancelText="Cancelar"
        onConfirm={() => {
          if (modal) handleExcluir(modal.med);
          setModal(null);
        }}
        onCancel={() => setModal(null)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    paddingHorizontal: 8,
    paddingTop: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#222',
    marginBottom: 16,
    marginLeft: 8,
  },
  emptyText: {
    textAlign: 'center',
    color: '#ffffff',
    marginTop: 32,
    fontSize: 16,
  },
}); 
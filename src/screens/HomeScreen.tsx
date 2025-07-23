import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import FloatingActionButton from '../components/FloatingActionButton';
import MedicamentoCard from '../components/MedicamentoCard';
import { getTurnoVisual } from '../utils/medicamentoVisual';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation/types';

interface Medicamento {
  id: string;
  nome: string;
  dosagem: string;
  frequencia: string;
  data: string;
  comprimidosRestantes: number;
  horario: string;
}

export default function HomeScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [medicamentos, setMedicamentos] = useState<Medicamento[]>([]);
  const [loading, setLoading] = useState(true);

  // Buscar medicamentos do backend
  const fetchMedicamentos = async () => {
    setLoading(true);
    try {
      const res = await fetch('http://10.0.2.2:3000/medicamentos');
      const data = await res.json();
      setMedicamentos(data);
      console.log('Medicamentos carregados:', data);
    } catch (e) {
      setMedicamentos([]);
      Alert.alert('Erro ao buscar medicamentos', 'Não foi possível conectar ao backend.');
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchMedicamentos();
    }, [])
  );

  const handleEditar = (medicamento: Medicamento) => {
    navigation.navigate('EditarMedicamento', { medicamento });
  };


  console.log('HomeScreen carregada!')
   console.log('Medicamentos carregados:', medicamentos);
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tratamento</Text>
      {loading ? (
        <ActivityIndicator size="large" color="#1565c0" style={{ marginTop: 32 }} />
      ) : medicamentos.length === 0 ? (
        <Text style={styles.emptyText}>Nenhum medicamento cadastrado.</Text>
      ) : (
        <FlatList
          data={medicamentos}
          keyExtractor={item => item.id}
          contentContainerStyle={{ paddingBottom: 80 }}
          renderItem={({ item }) => {
            const visual = getTurnoVisual(item.horario);
            return (
              <MedicamentoCard
                {...item}
                cor={visual.cor}
                icone={visual.icone}
                onEditar={() => handleEditar(item)}
              />
            );
          }}
        />
      )}
      <FloatingActionButton label="Adicionar medicamento" onPress={() => navigation.navigate('AdicionarMedicamento')} />
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
    color: '#888',
    marginTop: 32,
    fontSize: 16,
  },
});
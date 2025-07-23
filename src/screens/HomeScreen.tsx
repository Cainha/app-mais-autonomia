// src/screens/HomeScreen.js

import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  Image,
  Alert,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import type { AppNavigationProp } from '../navigation/types';

import MedicamentoCard from '../components/MedicamentoCard';

// importar ícone de logout
const logoutIcon = require('../assets/logout.png');

interface Medicamento {
  id: string;
  nome: string;
  dosagem: string;
  frequencia: string;
  data: string;
  comprimidosRestantes: number;
  horario: string;
  arquivado?: boolean;
}

function getTurnoVisual(horario: string): { icone: 'sunrise' | 'sun' | 'cloud' | 'moon', cor: string } {
  if (!horario) return { icone: 'sun', cor: '#FFD700' };
  const [h] = horario.split(':').map(Number);
  if (h >= 5 && h < 11) return { icone: 'sunrise', cor: '#F25AA0' };
  if (h >= 11 && h < 16) return { icone: 'sun', cor: '#FFD700' };
  if (h >= 16 && h < 21) return { icone: 'cloud', cor: '#F2911B' };
  return { icone: 'moon', cor: '#5C6BC0' };
}

export default function HomeScreen() {
  const navigation = useNavigation<AppNavigationProp>();
  const isFocused = useIsFocused();

  const [medicamentos, setMedicamentos] = useState<Medicamento[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!isFocused) return;
    const user = auth().currentUser;
    if (!user) {
      setIsLoading(false);
      return;
    }

    const medicamentosRef = database().ref(`/medicamentos/${user.uid}`);
    const onValueChange = medicamentosRef.on('value', snapshot => {
      const data = snapshot.val();
      const listaMedicamentos = data
        ? Object.keys(data).map(key => ({ id: key, ...data[key] }))
        : [];
      const medicamentosAtivos = listaMedicamentos.filter(item => !item.arquivado);
      setMedicamentos(medicamentosAtivos);
      setIsLoading(false);
    });

    return () => medicamentosRef.off('value', onValueChange);
  }, [isFocused]);

  const handleLogout = async () => {
    try {
      await auth().signOut();
    } catch (e: any) {
      Alert.alert('Erro ao Sair', e.message);
    }
  };

  const handleEditar = (medicamento: Medicamento) => {
    navigation.navigate('EditarMedicamento', { medicamento });
  };

  const renderItem = ({ item }: { item: Medicamento }) => {
    const visual = getTurnoVisual(item.horario);
    return (
      <MedicamentoCard
        {...item}
        icone={visual.icone}
        cor={visual.cor}
        onEditar={() => handleEditar(item)}
      />
    );
  };

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#1565c0" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Seus Medicamentos</Text>
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Image source={logoutIcon} style={styles.logoutIcon} />
          <Text style={styles.logoutButtonText}>Sair</Text>
        </TouchableOpacity>
      </View>

      {medicamentos.length === 0 ? (
        <View style={styles.centered}>
          <Text style={styles.emptyText}>Nenhum medicamento ativo.</Text>
          <Text style={styles.emptySubText}>
            Adicione um novo medicamento no botão '+'
          </Text>
        </View>
      ) : (
        <FlatList
          data={medicamentos}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          contentContainerStyle={{ paddingBottom: 80 }}
        />
      )}

      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate('AdicionarMedicamento')}
      >
        <Text style={styles.addButtonText}>+</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    paddingHorizontal: 16,
    paddingTop: 32, // aumenta espaçamento superior
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#333',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#d32f2f',
  },
  logoutIcon: {
    width: 20,
    height: 20,
    marginRight: 6,
    tintColor: '#d32f2f',
  },
  logoutButtonText: {
    color: '#d32f2f',
    fontWeight: 'bold',
    fontSize: 14,
  },
  emptyText: {
    textAlign: 'center',
    fontSize: 18,
    color: 'gray',
    fontWeight: 'bold',
  },
  emptySubText: {
    textAlign: 'center',
    marginTop: 8,
    fontSize: 14,
    color: 'gray',
  },
  addButton: {
    position: 'absolute',
    right: 30,
    bottom: 30,
    backgroundColor: '#1565c0',
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 30,
    lineHeight: 30,
  },
});

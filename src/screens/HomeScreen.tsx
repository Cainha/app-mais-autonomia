import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import FloatingActionButton from '../components/FloatingActionButton';

export default function HomeScreen({ navigation }: any) {
  return (
    <View style={styles.container}>
      {/* Header simples */}
      <View style={styles.header}>
        <Text style={styles.title}>Tratamento</Text>
        <TouchableOpacity style={styles.profileButton}>
          <Icon name="person" size={28} color="#333" />
        </TouchableOpacity>
      </View>
      {/* Conteúdo principal pode ser adicionado aqui */}

      {/* Botão flutuante reutilizável */}
      <FloatingActionButton
        label="Adicionar medicamento"
        onPress={() => navigation.navigate('AdicionarMedicamento')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eaf6f6',
    paddingTop: 40,
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: '400',
    color: '#222',
  },
  profileButton: {
    backgroundColor: '#f2f2f2',
    borderRadius: 20,
    padding: 6,
  },
});
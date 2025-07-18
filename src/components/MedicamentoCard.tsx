import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

interface MedicamentoCardProps {
  nome: string;
  dosagem: string;
  frequencia: string;
  data: string;
  comprimidosRestantes: number;
  horario: string;
  turnoIcon?: React.ReactNode;
  onEditar?: () => void;
  onRestaurar?: () => void;
  onExcluir?: () => void;
  arquivado?: boolean;
}

const MedicamentoCard: React.FC<MedicamentoCardProps> = ({
  nome,
  dosagem,
  frequencia,
  data,
  comprimidosRestantes,
  horario,
  turnoIcon,
  onEditar,
  onRestaurar,
  onExcluir,
  arquivado,
}) => (
  <View style={styles.card}>
    {/* Ícone de turno */}
    {turnoIcon}
    <Text style={styles.title}>{nome} - {dosagem}</Text>
    <Text>{frequencia} até {data}</Text>
    <Text>{comprimidosRestantes} Comprimidos restantes</Text>
    <Text>{horario}</Text>
    <View style={styles.actions}>
      {onEditar && <TouchableOpacity onPress={onEditar}><Text>Editar</Text></TouchableOpacity>}
      {arquivado && onRestaurar && <TouchableOpacity onPress={onRestaurar}><Text>Restaurar</Text></TouchableOpacity>}
      {arquivado && onExcluir && <TouchableOpacity onPress={onExcluir}><Text>Excluir</Text></TouchableOpacity>}
    </View>
  </View>
);

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginVertical: 8,
    elevation: 2,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  actions: {
    flexDirection: 'row',
    marginTop: 8,
    gap: 8,
  },
});

export default MedicamentoCard; 
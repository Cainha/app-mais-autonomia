import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';

interface MedicamentoCardProps {
  nome: string;
  dosagem: string;
  frequencia: string;
  data: string;
  comprimidosRestantes: number;
  horario: string;
  icone: 'sunrise' | 'sun' | 'cloud' | 'moon';
  cor: string;
  onEditar?: () => void;
}

const iconeMap: Record<string, any> = {
  moon: require('../assets/lua.png'),
  sunrise: require('../assets/nascerSol.png'),
  sun: require('../assets/sol.png'),
  cloud: require('../assets/solSePondo.png'),
};
const calendario = require('../assets/calendario.png');
const relogio = require('../assets/relogio.png');
const editarIcon = require('../assets/editar.png');

const MedicamentoCard: React.FC<MedicamentoCardProps> = ({
  nome,
  dosagem,
  frequencia,
  data,
  comprimidosRestantes,
  horario,
  cor,
  icone,
  onEditar,
}) => (
  <View style={styles.wrapper}>
    <View style={[styles.sideBar, { backgroundColor: cor }]} />
    <View style={styles.content}>
      <View style={styles.header}>
        <Text style={styles.title}>{nome} - {dosagem}</Text>
        {onEditar && (
          <TouchableOpacity style={styles.editBtn} onPress={onEditar}>
            <Image source={editarIcon} style={styles.editIcon} />
            <Text style={styles.editBtnText}>Editar</Text>
          </TouchableOpacity>
        )}
      </View>
      <View style={styles.infoRow}>
        <Image source={calendario} style={styles.infoIcon} />
        <Text style={styles.infoText}>{frequencia} até {data}</Text>
        <Image source={relogio} style={[styles.infoIcon, { marginLeft: 12 }]} />
        <Text style={styles.infoText}>{horario}</Text>
      </View>
      <Text style={styles.restantes}>{comprimidosRestantes.toString().padStart(2, '0')} Comprimidos restantes</Text>
    </View>
    <View style={styles.iconTurno}>
      <Image source={iconeMap[icone]} style={styles.icone} resizeMode="contain" />
    </View>
  </View>
);

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    marginVertical: 8,
    elevation: 2,
    alignItems: 'center',
    overflow: 'hidden',
    minHeight: 90,
  },
  sideBar: {
    width: 16,
    borderTopLeftRadius: 16,
    borderBottomLeftRadius: 16,
  },
  content: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
    position: 'relative',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 18,
    color: '#111',
    flexShrink: 1,
  },
  editBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1ea7fd',
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 6,
    gap: 4,
    minWidth: 80,
    justifyContent: 'center',
  },
  editIcon: {
    width: 18,
    height: 18,
    marginRight: 4,
  },
  editBtnText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 15,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
    gap: 4,
  },
  infoIcon: {
    width: 18,
    height: 18,
    marginRight: 2,
  },
  infoText: {
    fontSize: 15,
    color: '#222',
    marginRight: 8,
  },
  restantes: {
    fontSize: 15,
    color: '#222',
    marginTop: 4,
    fontWeight: 'bold',
  },
  iconTurno: {
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
    marginLeft: 4,
    alignSelf: 'center',
  },
  icone: {
    width: 44,
    height: 44,
  },
});

export default MedicamentoCard; 
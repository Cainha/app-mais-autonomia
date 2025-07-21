import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';

interface MedicamentoCardArquivadoProps {
  nome: string;
  dosagem: string;
  frequencia: string;
  data: string;
  comprimidosRestantes: number;
  horario: string;
  icone: any; // PNG ou require
  onRestaurar: () => void;
  onExcluir: () => void;
}

const restaurarIcon = require('../assets/restaurar.png');
const excluirIcon = require('../assets/iconeLixeira.png');

export default function MedicamentoCardArquivado({
  nome,
  dosagem,
  frequencia,
  data,
  comprimidosRestantes,
  horario,
  icone,
  onRestaurar,
  onExcluir,
}: MedicamentoCardArquivadoProps) {
  return (
    <View style={styles.wrapper}>
      <View style={styles.sideBar} />
      <View style={styles.content}>
        <Text style={styles.title}>{nome} - {dosagem}</Text>
        <View style={styles.row}>
          <Text style={styles.infoText}>{frequencia} até {data}</Text>
          <Text style={styles.infoText}>  |  {horario}</Text>
        </View>
        <Text style={styles.restantes}>{comprimidosRestantes.toString().padStart(2, '0')} Comprimidos restantes</Text>
        <View style={styles.iconContainer}>
          <Image source={icone} style={styles.icone} resizeMode="contain" />
        </View>
        <View style={styles.buttonRow}>
          <TouchableOpacity style={styles.restaurarBtn} onPress={onRestaurar}>
            <Image source={restaurarIcon} style={styles.btnIcon} />
            <Text style={styles.restaurarText}>Restaurar</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.excluirBtn} onPress={onExcluir}>
            <Image source={excluirIcon} style={styles.btnIcon} />
            <Text style={styles.excluirText}>Excluir</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 16,
    marginVertical: 8,
    elevation: 2,
    alignItems: 'stretch',
    overflow: 'hidden',
  },
  sideBar: {
    width: 16,
    backgroundColor: '#b3e5fc',
    borderTopLeftRadius: 16,
    borderBottomLeftRadius: 16,
  },
  content: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 18,
    color: '#111',
    marginBottom: 8,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  infoText: {
    fontSize: 15,
    color: '#222',
  },
  restantes: {
    fontSize: 15,
    color: '#222',
    marginTop: 4,
    fontWeight: 'bold',
  },
  iconContainer: {
    position: 'absolute',
    right: 12,
    top: 16,
    width: 48,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icone: {
    width: 40,
    height: 40,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 16,
    gap: 16,
  },
  restaurarBtn: {
    backgroundColor: '#1ea7fd',
    borderRadius: 24,
    paddingHorizontal: 32,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: '#2196f3',
    minWidth: 120,
    alignItems: 'center',
    flexDirection: 'row',
    gap: 6,
    justifyContent: 'center',
  },
  restaurarText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
  },
  excluirBtn: {
    backgroundColor: '#fff',
    borderRadius: 24,
    paddingHorizontal: 32,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: '#2196f3',
    minWidth: 120,
    alignItems: 'center',
    flexDirection: 'row',
    gap: 6,
    justifyContent: 'center',
  },
  excluirText: {
    color: '#2196f3',
    fontWeight: 'bold',
    fontSize: 18,
  },
  btnIcon: {
    width: 20,
    height: 20,
    marginRight: 4,
  },
}); 
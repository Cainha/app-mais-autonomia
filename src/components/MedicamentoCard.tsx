// src/components/MedicamentoCard.tsx

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
  onDesarquivar?: () => void;
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
  onDesarquivar,
}) => {
  return (
    <View style={styles.wrapper}>
      {/* Sidebar colorido */}
      <View style={[styles.sideBar, { backgroundColor: cor }]} />

      {/* Conteúdo */}
      <View style={styles.content}>
        <View style={styles.textContainer}>
          <View style={styles.header}>
            <Text style={styles.title} numberOfLines={1} ellipsizeMode="tail">
              {nome} - {dosagem}
            </Text>

            {/* Botão de editar sempre azul */}
            {onEditar && (
              <TouchableOpacity
                style={styles.editBtn}
                onPress={onEditar}
              >
                <Image source={editarIcon} style={styles.editIcon} />
                <Text style={styles.editText}>Editar</Text>
              </TouchableOpacity>
            )}

            {/* Se houver desarquivar, mantém verde */}
            {onDesarquivar && (
              <TouchableOpacity
                style={[styles.actionBtn, { backgroundColor: '#4CAF50' }]}
                onPress={onDesarquivar}
              >
                <Text style={styles.actionBtnText}>Desarquivar</Text>
              </TouchableOpacity>
            )}
          </View>

          <View style={styles.infoRow}>
            <Image source={calendario} style={styles.infoIcon} />
            <Text style={styles.infoText}>
              {data === 'Contínuo' ? frequencia : `${frequencia} até ${data}`}
            </Text>
          </View>

          <View style={styles.infoRow}>
            <Image source={relogio} style={styles.infoIcon} />
            <Text style={styles.infoText}>{horario}</Text>
          </View>

          <Text style={styles.restantes}>
            {comprimidosRestantes.toString().padStart(2, '0')} Comprimidos restantes
          </Text>
        </View>

        <View style={styles.iconTurno}>
          <Image source={iconeMap[icone]} style={styles.icone} resizeMode="contain" />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    backgroundColor: '#FFF',
    borderRadius: 16,
    marginVertical: 8,
    marginHorizontal: 4,
    elevation: 3,
    overflow: 'hidden',
  },
  sideBar: {
    width: 16,
  },
  content: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
    gap: 4,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  title: {
    flex: 1,
    fontWeight: 'bold',
    fontSize: 18,
    color: '#111',
  },
  editBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1565c0',  // azul fixo
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginLeft: 8,
  },
  editIcon: {
    width: 14,
    height: 14,
    marginRight: 4,
    tintColor: '#fff',
  },
  editText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
  actionBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginLeft: 8,
  },
  actionBtnText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  infoIcon: {
    width: 16,
    height: 16,
  },
  infoText: {
    fontSize: 14,
    color: '#333',
  },
  restantes: {
    fontSize: 14,
    color: '#333',
    fontWeight: 'bold',
    marginTop: 4,
  },
  iconTurno: {
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
  icone: {
    width: 48,
    height: 48,
  },
});

export default MedicamentoCard;

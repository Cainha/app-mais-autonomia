import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, Text, Alert, Image } from 'react-native';
import InputText from '../components/InputText';
import Counter from '../components/Counter';
import FrequencySelector from '../components/FrequencySelector';
import Calendar from '../components/Calendar';
import TimeInput from '../components/TimeInput';
import PrimaryButton from '../components/PrimaryButton';
import SecondaryButton from '../components/SecondaryButton';
import RadioGroup from '../components/RadioGroup';
import { useNavigation, useRoute } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation/types';
import ConfirmationModal from '../components/ConfirmationModal';

export default function EditarMedicamentoScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const route = useRoute<any>();
  const medicamentoEdit = route.params?.medicamento;

  const [nome, setNome] = useState('');
  const [dosagem, setDosagem] = useState('');
  const [quantidade, setQuantidade] = useState(0);
  const [frequencia, setFrequencia] = useState('Diariamente');
  const [finaliza, setFinaliza] = useState('No fim da cartela');
  const [data, setData] = useState(new Date());
  const [horario, setHorario] = useState(new Date());
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (medicamentoEdit) {
      setNome(medicamentoEdit.nome || '');
      setDosagem(medicamentoEdit.dosagem || '');
      setQuantidade(medicamentoEdit.comprimidosRestantes || 0);
      setFrequencia(medicamentoEdit.frequencia || 'Diariamente');
      setFinaliza('No fim da cartela');
      if (medicamentoEdit.data) setData(stringToDate(medicamentoEdit.data));
      if (medicamentoEdit.horario) setHorario(stringToTime(medicamentoEdit.horario));
    }
  }, [medicamentoEdit]);

  function stringToDate(str: string) {
    const [d, m, y] = str.split('/').map(Number);
    return new Date(y, m - 1, d);
  }
  function stringToTime(str: string) {
    const [h, min] = str.split(':').map(Number);
    const date = new Date();
    date.setHours(h, min, 0, 0);
    return date;
  }
  function dateToString(date: Date) {
    return date.toLocaleDateString('pt-BR');
  }
  function timeToString(date: Date) {
    return date.toTimeString().slice(0, 5);
  }

  const handleSalvar = async () => {
    const novoMed = {
      id: medicamentoEdit.id,
      nome,
      dosagem,
      frequencia,
      data: dateToString(data),
      comprimidosRestantes: quantidade,
      horario: timeToString(horario),
    };
    try {
      await fetch(`http://10.0.2.2:3000/medicamentos/${medicamentoEdit.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(novoMed),
      });
      navigation.navigate('Main');
    } catch (e) {
      Alert.alert('Erro', 'Não foi possível salvar as alterações.');
    }
  };

  const handleArquivar = () => {
    setShowModal(true);
  };
  const confirmArquivar = async () => {
    try {
      // Primeiro, envia para /arquivados
      await fetch('http://10.0.2.2:3000/arquivados', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: medicamentoEdit.id,
          nome,
          dosagem,
          frequencia,
          data: dateToString(data),
          comprimidosRestantes: quantidade,
          horario: timeToString(horario),
        }),
      });
      // Depois, remove de /medicamentos
      await fetch(`http://10.0.2.2:3000/medicamentos/${medicamentoEdit.id}`, {
        method: 'DELETE',
      });
      setShowModal(false);
      navigation.navigate('Main', { screen: 'Arquivados' });
    } catch (e) {
      setShowModal(false);
      Alert.alert('Erro', 'Não foi possível arquivar o medicamento.');
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Editar medicamento</Text>
        <Text style={styles.label}>Nome do medicamento</Text>
        <InputText
          value={nome}
          onChangeText={setNome}
          placeholder="Digite aqui..."
        />
        <View style={styles.sectionBox}>
          <Text style={styles.labelBox}>Quantos comprimidos tem sua cartela?</Text>
          <Counter
            value={quantidade}
            onChange={setQuantidade}
            min={0}
            max={999}
          />
        </View>
        <Text style={styles.label}>Dosagem (mg)</Text>
        <InputText
          value={dosagem}
          onChangeText={setDosagem}
          placeholder="Ex: 20mg"
        />
        <Text style={styles.label}>Com que frequência?</Text>
        <FrequencySelector
          value={frequencia}
          onChange={setFrequencia}
        />
        <Text style={styles.label}>Quando finaliza o medicamento?</Text>
        <RadioGroup
          options={[
            'No fim da cartela',
            'Na data',
            'Tratamento contínuo'
          ]}
          selected={finaliza}
          onSelect={setFinaliza}
        />
        {finaliza === 'Na data' && (
          <Calendar
            value={data}
            onChange={setData}
          />
        )}
        <Text style={styles.label}>Horário</Text>
        <TimeInput
          value={horario}
          onChange={setHorario}
        />
        <View style={styles.buttonContainer}>
          <SecondaryButton
            label="Arquivar medicação"
            onPress={handleArquivar}
          />
          <PrimaryButton
            label="Finalizar edição"
            onPress={handleSalvar}
          />
        </View>
      </View>
      <ConfirmationModal
        visible={showModal}
        title="Você deseja arquivar este tratamento?"
        message="Esta ação poderá ser desfeita através da opção na barra de navegação."
        icon={require('../assets/iconeArquivar.png')}
        confirmText="Arquivar"
        cancelText="Cancelar"
        onConfirm={confirmArquivar}
        onCancel={() => setShowModal(false)}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    padding: 16,
    gap: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#222',
    marginBottom: 16,
    textAlign: 'center',
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
    marginBottom: 8,
  },
  sectionBox: {
    backgroundColor: '#eaf3ff',
    borderRadius: 12,
    padding: 12,
    marginBottom: 8,
  },
  labelBox: {
    fontSize: 15,
    color: '#1565c0',
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
  },
  buttonContainer: {
    marginTop: 24,
    marginBottom: 32,
    gap: 12,
  },
}); 
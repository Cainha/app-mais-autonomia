import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, Text } from 'react-native';
import InputText from '../components/InputText';
import Counter from '../components/Counter';
import FrequencySelector from '../components/FrequencySelector';
import Calendar from '../components/Calendar';
import TimeInput from '../components/TimeInput';
import PrimaryButton from '../components/PrimaryButton';
import RadioGroup from '../components/RadioGroup';
import { useNavigation, useRoute } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation/types';

export default function AdicionarMedicamentoScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const route = useRoute<any>();
  const editando = Boolean(route.params && route.params.medicamento);
  const medicamentoEdit = route.params?.medicamento;

  const [nome, setNome] = useState('');
  const [quantidade, setQuantidade] = useState(0);
  const [frequencia, setFrequencia] = useState('Diariamente');
  const [finaliza, setFinaliza] = useState('No fim da cartela');
  const [data, setData] = useState(new Date());
  const [horario, setHorario] = useState(new Date());
  const [dosagem, setDosagem] = useState('');

  useEffect(() => {
    if (editando && medicamentoEdit) {
      setNome(medicamentoEdit.nome || '');
      setQuantidade(medicamentoEdit.comprimidosRestantes || 0);
      setFrequencia(medicamentoEdit.frequencia || 'Diariamente');
      setFinaliza('No fim da cartela'); // Ajuste se necessário
      if (medicamentoEdit.data) setData(stringToDate(medicamentoEdit.data));
      if (medicamentoEdit.horario) setHorario(stringToTime(medicamentoEdit.horario));
    }
  }, [editando, medicamentoEdit]);

  function stringToDate(str: string) {
    // Espera formato dd/mm/yyyy
    const [d, m, y] = str.split('/').map(Number);
    return new Date(y, m - 1, d);
  }
  function stringToTime(str: string) {
    // Espera formato HH:mm
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
      id: editando ? medicamentoEdit.id : undefined,
      nome,
      dosagem,
      frequencia,
      data: dateToString(data),
      comprimidosRestantes: quantidade,
      horario: timeToString(horario),
    };
    try {
      if (editando) {
        // PUT para editar
        await fetch(`http://10.0.2.2:3000/medicamentos/${medicamentoEdit.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(novoMed),
        });
      } else {
        // POST para adicionar
        await fetch('http://10.0.2.2:3000/medicamentos', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(novoMed),
        });
      }
      navigation.navigate('Main');
    } catch (e) {
      // Trate o erro se quiser
    }
  };
  
  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
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
          <PrimaryButton
            label={editando ? 'Salvar alterações' : 'Adicionar nova medicação'}
            onPress={handleSalvar}
          />
        </View>
      </View>
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
  },
});
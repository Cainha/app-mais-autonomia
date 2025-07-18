import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Text } from 'react-native';
import InputText from '../components/InputText';
import Counter from '../components/Counter';
import FrequencySelector from '../components/FrequencySelector';
import Calendar from '../components/Calendar';
import TimeInput from '../components/TimeInput';
import PrimaryButton from '../components/PrimaryButton';
import RadioGroup from '../components/RadioGroup';
import { useNavigation } from '@react-navigation/native';

export default function AdicionarMedicamentoScreen() {
  const navigation = useNavigation();
  const [nome, setNome] = useState('');
  const [quantidade, setQuantidade] = useState(0);
  const [frequencia, setFrequencia] = useState('Diariamente');
  const [finaliza, setFinaliza] = useState('No fim da cartela');
  const [data, setData] = useState(new Date());
  const [horario, setHorario] = useState(new Date());

  const handleSalvar = () => {
    // Implementar lógica de salvar
    navigation.goBack();
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
          selectedOption={finaliza}
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
            title="Adicionar nova medicação"
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
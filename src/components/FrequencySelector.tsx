import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';

interface FrequencySelectorProps {
  value: string;
  onChange: (value: string) => void;
}

const frequencies = [
  'Diariamente',
  'Intercalado',
  'A cada 2 dias',
];

export default function FrequencySelector({ value, onChange }: FrequencySelectorProps) {
  return (
    <View style={styles.container}>
      {frequencies.map((frequency, index) => (
        <TouchableOpacity
          key={index}
          style={[
            styles.chip,
            value === frequency && styles.chipSelected,
          ]}
          onPress={() => onChange(frequency)}
        >
          <Text style={[
            styles.chipText,
            value === frequency && styles.chipTextSelected,
          ]}>{frequency}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: 8,
    marginVertical: 8,
  },
  chip: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#b3d1fa',
    backgroundColor: '#fff',
    marginRight: 8,
  },
  chipSelected: {
    backgroundColor: '#eaf3ff',
    borderColor: '#1565c0',
  },
  chipText: {
    color: '#1565c0',
    fontWeight: '500',
    fontSize: 15,
  },
  chipTextSelected: {
    color: '#1565c0',
    fontWeight: 'bold',
  },
}); 
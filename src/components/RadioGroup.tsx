import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';

interface RadioGroupProps {
  options: string[];
  selected: string;
  onSelect: (option: string) => void;
}

const RadioGroup: React.FC<RadioGroupProps> = ({ options, selected, onSelect }) => (
  <View style={styles.container}>
    {options.map((option) => (
      <TouchableOpacity
        key={option}
        style={styles.option}
        onPress={() => onSelect(option)}
      >
        <View style={[styles.radio, selected === option && styles.selectedRadio]} />
        <Text style={styles.label}>{option}</Text>
      </TouchableOpacity>
    ))}
  </View>
);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    gap: 8,
    marginVertical: 8,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  radio: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#1565c0',
    marginRight: 8,
  },
  selectedRadio: {
    backgroundColor: '#1565c0',
  },
  label: {
    fontSize: 14,
    color: '#333',
  },
});

export default RadioGroup; 
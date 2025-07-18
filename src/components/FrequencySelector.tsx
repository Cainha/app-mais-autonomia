import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';

interface FrequencySelectorProps {
  options: string[];
  selected: string;
  onSelect: (option: string) => void;
}

const FrequencySelector: React.FC<FrequencySelectorProps> = ({ options, selected, onSelect }) => (
  <View style={styles.container}>
    {options.map((option) => (
      <TouchableOpacity
        key={option}
        style={[styles.button, selected === option && styles.selected]}
        onPress={() => onSelect(option)}
      >
        <Text style={[styles.text, selected === option && styles.selectedText]}>{option}</Text>
      </TouchableOpacity>
    ))}
  </View>
);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: 8,
    marginVertical: 8,
  },
  button: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    backgroundColor: '#e3f2fd',
    marginRight: 8,
  },
  selected: {
    backgroundColor: '#1565c0',
  },
  text: {
    color: '#1565c0',
  },
  selectedText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default FrequencySelector; 
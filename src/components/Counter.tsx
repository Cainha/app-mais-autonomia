import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text, TextInput } from 'react-native';

interface CounterProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
}

export default function Counter({ value, onChange, min = 0, max = 999 }: CounterProps) {
  const handleIncrement = () => {
    if (value < max) onChange(value + 1);
  };
  const handleDecrement = () => {
    if (value > min) onChange(value - 1);
  };
  const handleInputChange = (text: string) => {
    const num = parseInt(text.replace(/\D/g, '')) || 0;
    if (num >= min && num <= max) onChange(num);
  };
  return (
    <View style={styles.wrapper}>
      <TouchableOpacity style={styles.button} onPress={handleDecrement}>
        <Text style={styles.buttonText}>-</Text>
      </TouchableOpacity>
      <TextInput
        style={styles.input}
        value={value.toString()}
        onChangeText={handleInputChange}
        keyboardType="numeric"
        textAlign="center"
        maxLength={3}
      />
      <TouchableOpacity style={styles.button} onPress={handleIncrement}>
        <Text style={styles.buttonText}>+</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#eaf3ff',
    borderRadius: 12,
    padding: 12,
    justifyContent: 'center',
    marginVertical: 8,
  },
  button: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#1565c0',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 28,
    fontWeight: 'bold',
  },
  input: {
    width: 60,
    fontSize: 24,
    color: '#222',
    backgroundColor: 'transparent',
    borderWidth: 0,
  },
}); 
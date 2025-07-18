import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

interface CounterProps {
  value: number;
  onIncrement: () => void;
  onDecrement: () => void;
}

const Counter: React.FC<CounterProps> = ({ value, onIncrement, onDecrement }) => (
  <View style={styles.container}>
    <TouchableOpacity onPress={onDecrement} style={styles.button}>
      <Text style={styles.buttonText}>-</Text>
    </TouchableOpacity>
    <Text style={styles.value}>{value}</Text>
    <TouchableOpacity onPress={onIncrement} style={styles.button}>
      <Text style={styles.buttonText}>+</Text>
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#e3f2fd',
    borderRadius: 8,
    padding: 8,
  },
  button: {
    padding: 8,
    backgroundColor: '#bbdefb',
    borderRadius: 8,
    marginHorizontal: 8,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  value: {
    fontSize: 18,
    minWidth: 32,
    textAlign: 'center',
  },
});

export default Counter; 
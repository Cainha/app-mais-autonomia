import React from 'react';
import { View, TextInput, StyleSheet, TextInputProps } from 'react-native';

interface DateInputProps extends TextInputProps {
  // Pode ser expandido para usar um date picker futuramente
}

const DateInput: React.FC<DateInputProps> = (props) => {
  return <TextInput style={styles.input} placeholder="dd/mm/aaaa" {...props} />;
};

const styles = StyleSheet.create({
  input: {
    width: 120,
    height: 44,
    borderWidth: 1,
    borderColor: '#bbb',
    borderRadius: 6,
    paddingHorizontal: 12,
    backgroundColor: '#fafafa',
  },
});

export default DateInput; 
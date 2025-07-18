import React from 'react';
import { View, TextInput, StyleSheet, TextInputProps } from 'react-native';

interface TimeInputProps extends TextInputProps {
  // Pode ser expandido para usar um time picker futuramente
}

const TimeInput: React.FC<TimeInputProps> = (props) => {
  return <TextInput style={styles.input} placeholder="00:00" {...props} />;
};

const styles = StyleSheet.create({
  input: {
    width: 80,
    height: 44,
    borderWidth: 1,
    borderColor: '#bbb',
    borderRadius: 6,
    paddingHorizontal: 12,
    backgroundColor: '#fafafa',
    textAlign: 'center',
  },
});

export default TimeInput; 
import React from 'react';
import { TouchableOpacity, Text, StyleSheet, TouchableOpacityProps } from 'react-native';

interface SecondaryButtonProps extends TouchableOpacityProps {
  label: string;
}

const SecondaryButton: React.FC<SecondaryButtonProps> = ({ label, ...props }) => (
  <TouchableOpacity style={styles.button} {...props}>
    <Text style={styles.label}>{label}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  button: {
    width: '100%',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#1565c0',
    paddingVertical: 12,
    borderRadius: 24,
    alignItems: 'center',
    marginBottom: 12,
  },
  label: {
    color: '#1565c0',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default SecondaryButton; 
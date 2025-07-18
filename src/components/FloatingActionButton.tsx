import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ViewStyle } from 'react-native';

interface FloatingActionButtonProps {
  label: string;
  onPress: () => void;
  style?: ViewStyle;
}

const FloatingActionButton: React.FC<FloatingActionButtonProps> = ({ label, onPress, style }) => (
  <TouchableOpacity style={[styles.button, style]} onPress={onPress}>
    <Text style={styles.label}>{label}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  button: {
    position: 'absolute',
    right: 16,
    bottom: 32,
    backgroundColor: '#1565c0',
    borderRadius: 24,
    paddingHorizontal: 20,
    paddingVertical: 12,
    elevation: 4,
  },
  label: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default FloatingActionButton; 
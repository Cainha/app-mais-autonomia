import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, Modal } from 'react-native';
import DatePicker from 'react-native-date-picker';

interface TimeInputProps {
  value: Date;
  onChange: (date: Date) => void;
}

export default function TimeInput({ value, onChange }: TimeInputProps) {
  const [open, setOpen] = useState(false);
  const formatTime = (date: Date) => {
    const h = date.getHours().toString().padStart(2, '0');
    const m = date.getMinutes().toString().padStart(2, '0');
    return { h, m };
  };
  const { h, m } = formatTime(value);
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.input} onPress={() => setOpen(true)}>
        <Text style={styles.time}>{h}</Text>
        <Text style={styles.colon}> : </Text>
        <Text style={styles.time}>{m}</Text>
      </TouchableOpacity>
      <Modal visible={open} transparent animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <DatePicker
              date={value}
              onDateChange={onChange}
              mode="time"
              locale="pt-BR"
              androidVariant="nativeAndroid"
              is24hourSource="locale"
            />
            <TouchableOpacity style={styles.closeButton} onPress={() => setOpen(false)}>
              <Text style={styles.closeButtonText}>Confirmar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}
const styles = StyleSheet.create({
  container: { width: '100%' },
  input: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#eaf3ff',
    borderRadius: 8,
    paddingHorizontal: 24,
    paddingVertical: 12,
    justifyContent: 'center',
    marginVertical: 8,
  },
  time: {
    fontSize: 32,
    color: '#1565c0',
    fontWeight: 'bold',
    minWidth: 40,
    textAlign: 'center',
  },
  colon: {
    fontSize: 32,
    color: '#1565c0',
    fontWeight: 'bold',
    marginHorizontal: 4,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
  },
  closeButton: {
    marginTop: 20,
    backgroundColor: '#1565c0',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  closeButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
}); 
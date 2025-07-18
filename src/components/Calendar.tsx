import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, Modal } from 'react-native';
import DatePicker from 'react-native-date-picker';
import Icon from 'react-native-vector-icons/MaterialIcons';

interface CalendarProps {
  value: Date;
  onChange: (date: Date) => void;
  placeholder?: string;
}

export default function Calendar({ value, onChange, placeholder = 'dd/mm/aaaa' }: CalendarProps) {
  const [open, setOpen] = useState(false);
  const formatDate = (date: Date) => date ? date.toLocaleDateString('pt-BR') : placeholder;
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.input} onPress={() => setOpen(true)}>
        <Icon name="calendar-today" size={22} color="#1565c0" style={{marginRight: 8}} />
        <Text style={[styles.text, !value && styles.placeholder]}>{formatDate(value)}</Text>
      </TouchableOpacity>
      <Modal visible={open} transparent animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <DatePicker
              date={value || new Date()}
              onDateChange={onChange}
              mode="date"
              locale="pt-BR"
              androidVariant="nativeAndroid"
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
    width: '100%',
    height: 44,
    backgroundColor: '#fff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#b3d1fa',
    paddingHorizontal: 12,
    marginVertical: 8,
  },
  text: { fontSize: 16, color: '#222' },
  placeholder: { color: '#999' },
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
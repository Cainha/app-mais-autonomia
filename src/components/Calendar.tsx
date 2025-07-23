// src/components/Calendar.tsx
import React, { useState } from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  Modal,
  StyleSheet,
  Image,
} from 'react-native';
import DatePicker from 'react-native-date-picker';

interface CalendarProps {
  value: Date | undefined;
  onChange: (date: Date) => void;
  placeholder?: string;
}

export default function Calendar({
  value,
  onChange,
  placeholder = 'dd/mm/aaaa',
}: CalendarProps) {
  const [open, setOpen] = useState(false);
  const formatDate = (date?: Date) =>
    date ? date.toLocaleDateString('pt-BR') : placeholder;

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.input}
        onPress={() => setOpen(true)}
      >
        {/* ícone de calendário customizado */}
        <Image
          source={require('../assets/calendario.png')}
          style={styles.icon}
        />
        <Text
          style={[styles.text, !value && styles.placeholder]}
        >
          {formatDate(value)}
        </Text>
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
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setOpen(false)}
            >
              <Text style={styles.closeButtonText}>Confirmar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  input: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
  },
  icon: {
    width: 22,
    height: 22,
    marginRight: 8,
  },
  text: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  placeholder: {
    color: '#999',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 24,
    width: 300,
    alignItems: 'center',
  },
  closeButton: {
    marginTop: 16,
    backgroundColor: '#1565c0',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 24,
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

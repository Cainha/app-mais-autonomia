// src/screens/LoginScreen.tsx
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import CheckBox from '@react-native-community/checkbox';

export default function LoginScreen() {
  const [cpf, setCpf] = useState('');
  const [senha, setSenha] = useState('');
  const [lembrar, setLembrar] = useState(false);

  return (
    <View style={styles.container}>
      {/* Logo */}
      <Image source={require('../assets/logoMaisAutonomia.png')} style={styles.logo} />

      {/* Título */}
      <Text style={styles.title}>Bem-vindo!</Text>
      <Text style={styles.subtitle}>Cuidamos dos seus lembretes para você cuidar da sua saúde.</Text>

      {/* CPF */}
      <Text style={styles.label}>CPF</Text>
      <TextInput
        style={styles.input}
        placeholder="Digite seu CPF"
        value={cpf}
        onChangeText={setCpf}
        keyboardType="numeric"
      />

      {/* Senha */}
      <Text style={styles.label}>Senha</Text>
      <TextInput
        style={styles.input}
        placeholder="Senha"
        value={senha}
        onChangeText={setSenha}
        secureTextEntry
      />

      {/* Lembrar de mim */}
      <View style={styles.checkboxContainer}>
        <CheckBox value={lembrar} onValueChange={setLembrar} />
        <Text style={styles.checkboxLabel}>Lembrar de mim</Text>
      </View>

      {/* Botão Entrar */}
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Entrar</Text>
      </TouchableOpacity>

      {/* Botões sociais */}
      <TouchableOpacity style={styles.socialButton}>
        <Text>Continuar com Gov.br</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.socialButton}>
        <Text>Continuar com Google</Text>
      </TouchableOpacity>

      {/* Cadastro */}
      <Text style={styles.cadastroText}>
        Ainda não tem conta? <Text style={styles.cadastroLink}>Cadastre-se!</Text>
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  logo: {
    width: 120,
    height: 120,
    resizeMode: 'contain',
    marginBottom: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1565c0',
    marginBottom: 4,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#333',
    marginBottom: 24,
    textAlign: 'center',
  },
  label: {
    alignSelf: 'flex-start',
    fontSize: 14,
    color: '#333',
    marginTop: 8,
  },
  input: {
    width: '100%',
    height: 44,
    borderWidth: 1,
    borderColor: '#bbb',
    borderRadius: 6,
    paddingHorizontal: 12,
    marginBottom: 8,
    backgroundColor: '#fafafa',
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    alignSelf: 'flex-start',
  },
  checkboxLabel: {
    marginLeft: 8,
    fontSize: 14,
    color: '#333',
  },
  button: {
    width: '100%',
    backgroundColor: '#1565c0',
    paddingVertical: 12,
    borderRadius: 24,
    alignItems: 'center',
    marginBottom: 12,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  socialButton: {
    width: '100%',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#bbb',
    paddingVertical: 10,
    borderRadius: 24,
    alignItems: 'center',
    marginBottom: 8,
  },
  cadastroText: {
    marginTop: 16,
    fontSize: 14,
    color: '#333',
    textAlign: 'center',
  },
  cadastroLink: {
    color: '#1565c0',
    textDecorationLine: 'underline',
  },
});


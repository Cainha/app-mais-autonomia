// src/screens/LoginScreen.tsx
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Alert } from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import auth from '@react-native-firebase/auth';
import { GoogleSignin, statusCodes, User as GoogleUser } from '@react-native-google-signin/google-signin';
import { useEffect } from 'react';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

// Defina o tipo das rotas do Stack
 type RootStackParamList = {
   Login: undefined;
   Main: undefined;
   AdicionarMedicamento: undefined;
 };

interface Props {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Login'>;
}

export default function LoginScreen({ navigation }: Props) {
  const [cpf, setCpf] = useState('');
  const [senha, setSenha] = useState('');
  const [lembrar, setLembrar] = useState(false);

  useEffect(() => {
    GoogleSignin.configure({
      webClientId: '852847633507-027moc64gnq0drp88f5mi1rhqf5tp5k2.apps.googleusercontent.com', 
    });
  }, []);

  const signInWithGoogle = async () => {
    try {
      // Verifica se o Google Play Services está disponível
      await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
      
      // Faz o sign-in
      const userInfo = await GoogleSignin.signIn();
      
      if (!userInfo.idToken) {
        throw new Error('Não foi possível obter o token do Google');
      }

      // Tenta fazer login no backend
      const response = await fetch('http://10.0.2.2:3000/login-google', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({ idToken: userInfo.idToken }),
      });

      const data = await response.json();
      
      if (data.sucesso) {
        navigation.replace('Main');
      } else {
        Alert.alert('Erro no login', data.mensagem || 'Não foi possível fazer login');
      }
    } catch (error) {
      console.error('Erro completo:', error);
      
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        Alert.alert('Login cancelado', 'Você cancelou o login com Google');
      } else if (error.code === statusCodes.IN_PROGRESS) {
        Alert.alert('Processo em andamento', 'Operação de login já está em andamento');
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        Alert.alert('Google Play Services não disponível', 'Instale ou atualize o Google Play Services');
      } else {
        Alert.alert(
          'Erro ao fazer login com Google',
          'Verifique sua conexão com a internet e tente novamente'
        );
      }
    }
  };

  const signInWithCpfSenha = async () => {
    // Aqui você pode implementar a lógica real de autenticação com CPF e senha
    // Se for sucesso:
    navigation.replace('Main');
  };

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
      <TouchableOpacity style={styles.button} onPress={signInWithCpfSenha}>
        <Text style={styles.buttonText}>Entrar</Text>
      </TouchableOpacity>

      {/* Botões sociais */}
      <TouchableOpacity style={styles.socialButton}>
        <Text>Continuar com Gov.br</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.socialButton} onPress={signInWithGoogle}>
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


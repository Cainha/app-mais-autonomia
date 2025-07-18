import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import MainTabs from './MainTabs';

import LoginScreen from '../screens/LoginScreen';
import AdicionarMedicamentoScreen from '../screens/AdicionarMedicamentoScreen';

import { RootStackParamList } from './types';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Main"
        component={MainTabs} //
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="AdicionarMedicamento"
        component={AdicionarMedicamentoScreen}
        options={{ title: 'Adicionar Medicamento' }}
      />
    </Stack.Navigator>
  );
}
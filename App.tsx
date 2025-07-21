import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './src/screens/LoginScreen';
import AdicionarMedicamentoScreen from './src/screens/AdicionarMedicamentoScreen';
import MainTabs from './src/navigation/MainTabs';
import EditarMedicamentoScreen from './src/screens/EditarMedicamentoScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Main" component={MainTabs} options={{ headerShown: false }} />
        <Stack.Screen name="AdicionarMedicamento" component={AdicionarMedicamentoScreen} options={{ title: 'Adicionar Medicamento' }} />
        <Stack.Screen name="EditarMedicamento" component={EditarMedicamentoScreen} options={{ title: 'Editar medicamento' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
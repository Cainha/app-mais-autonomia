import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialIcons';
import LoginScreen from './src/screens/LoginScreen';
import HomeScreen from './src/screens/HomeScreen';
import ArquivadosScreen from './src/screens/ArquivadosScreen';
import AdicionarMedicamentoScreen from './src/screens/AdicionarMedicamentoScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function MainTabs() {
  return (
    <Tab.Navigator initialRouteName="Home"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          if (route.name === 'Home') {
            return <Icon name="home" size={size} color={color} />;
          } else if (route.name === 'Relatorio') {
            return <Icon name="insert_chart" size={size} color={color} />;
          } else if (route.name === 'Arquivados') {
            return <Icon name="archive" size={size} color={color} />;
          }
        },
        tabBarActiveTintColor: '#2196f3',
        tabBarInactiveTintColor: '#888',
        headerShown: false,
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} options={{ tabBarLabel: 'Página Inicial' }} />
      <Tab.Screen name="Relatorio" component={() => null} options={{ tabBarLabel: 'Relatório' }} />
      <Tab.Screen name="Arquivados" component={ArquivadosScreen} />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Main" component={MainTabs} options={{ headerShown: false }} />
        <Stack.Screen name="AdicionarMedicamento" component={AdicionarMedicamentoScreen} options={{ title: 'Adicionar Medicamento' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
// src/navigation/MainTabs.tsx

import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Alert, TouchableOpacity, Text, StyleSheet } from 'react-native';
import HomeScreen from '../screens/HomeScreen';
import ArquivadosScreen from '../screens/ArquivadosScreen';
import Icon from 'react-native-vector-icons/MaterialIcons';

const Tab = createBottomTabNavigator();

export default function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#2196f3',
        tabBarInactiveTintColor: '#888',
      }}
    >
      <Tab.Screen 
        name="Página Inicial" 
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="home" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen 
        name="Relatório" 
        component={() => null}
        listeners={{
          tabPress: (e) => {
            e.preventDefault();
            Alert.alert(
              "Funcionalidade Indisponível",
              "Essa funcionalidade está indisponível no momento.",
              [{ text: "OK" }]
            );
          }
        }}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="insert-chart" size={size} color="#ccc" />
          ),
          tabBarLabel: ({ focused }) => (
            <Text style={{ color: '#ccc', fontSize: 12 }}>Relatório</Text>
          ),
        }}
      />
      <Tab.Screen 
        name="Arquivados" 
        component={ArquivadosScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="archive" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
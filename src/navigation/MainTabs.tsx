// src/navigation/MainTabs.tsx

import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, Text, StyleSheet, Image } from 'react-native';
import HomeScreen from '../screens/HomeScreen';
import ArquivadosScreen from '../screens/ArquivadosScreen';

const Tab = createBottomTabNavigator();

const homeIcon = require('../assets/home.png');
const relatorioIcon = require('../assets/relatorio.png');
const arquivadosIcon = require('../assets/iconeArquivar.png');

export default function MainTabs({ route }: any) {
  const initialRouteName = route?.params?.screen || 'Página Inicial';
  return (
    <Tab.Navigator
      initialRouteName={initialRouteName}
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: true,
        tabBarStyle: { height: 64 },
        tabBarIcon: ({ focused, size }) => {
          let icon;
          if (route.name === 'Página Inicial') icon = homeIcon;
          else if (route.name === 'Relatório') icon = relatorioIcon;
          else if (route.name === 'Arquivados') icon = arquivadosIcon;
          return (
            <View style={[styles.iconWrapper, focused && styles.iconWrapperActive]}>
              <Image
                source={icon}
                style={[
                  styles.icon,
                  focused ? styles.iconActive : styles.iconInactive,
                ]}
                resizeMode="contain"
              />
            </View>
          );
        },
        tabBarLabel: ({ focused }) => {
          let label = route.name;
          return (
            <Text style={[styles.label, focused ? styles.labelActive : styles.labelInactive]}>{label}</Text>
          );
        },
        tabBarItemStyle: { justifyContent: 'center', alignItems: 'center' },
      })}
    >
      <Tab.Screen name="Página Inicial" component={HomeScreen} />
      <Tab.Screen name="Relatório" component={() => null} listeners={{
        tabPress: (e) => {
          e.preventDefault();
          alert('Essa funcionalidade não está disponível no momento.');
        }
      }} />
      <Tab.Screen name="Arquivados" component={ArquivadosScreen} />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  iconWrapper: {
    backgroundColor: 'transparent',
    borderRadius: 20,
    padding: 4,
    marginBottom: 2,
  },
  iconWrapperActive: {
    backgroundColor: '#1ea7fd',
  },
  icon: {
    width: 28,
    height: 28,
    tintColor: '#888',
  },
  iconActive: {
    tintColor: '#fff',
  },
  iconInactive: {
    tintColor: '#888',
  },
  label: {
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 2,
  },
  labelActive: {
    color: '#fff',
    backgroundColor: '#1ea7fd',
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 2,
    overflow: 'hidden',
  },
  labelInactive: {
    color: '#888',
  },
});
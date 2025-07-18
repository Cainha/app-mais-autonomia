import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';

interface Tab {
  label: string;
  icon?: React.ReactNode;
  active?: boolean;
  onPress: () => void;
}

interface BottomTabBarProps {
  tabs: Tab[];
}

const BottomTabBar: React.FC<BottomTabBarProps> = ({ tabs }) => (
  <View style={styles.container}>
    {tabs.map((tab, idx) => (
      <TouchableOpacity key={idx} style={styles.tab} onPress={tab.onPress}>
        {tab.icon}
        <Text style={[styles.label, tab.active && styles.activeLabel]}>{tab.label}</Text>
      </TouchableOpacity>
    ))}
  </View>
);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: 60,
    backgroundColor: '#f5f5f5',
    borderTopWidth: 1,
    borderColor: '#eee',
  },
  tab: {
    alignItems: 'center',
    flex: 1,
  },
  label: {
    fontSize: 12,
    color: '#333',
  },
  activeLabel: {
    color: '#1565c0',
    fontWeight: 'bold',
  },
});

export default BottomTabBar; 
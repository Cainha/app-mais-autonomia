import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

interface HeaderProps {
  title: string;
  showProfileIcon?: boolean;
  showCloseButton?: boolean;
  onProfilePress?: () => void;
  onClosePress?: () => void;
}

const Header: React.FC<HeaderProps> = ({
  title,
  showProfileIcon,
  showCloseButton,
  onProfilePress,
  onClosePress,
}) => {
  return (
    <View style={styles.container}>
      {showCloseButton && (
        <TouchableOpacity onPress={onClosePress}>
          {/* Ícone de fechar */}
          <Text>X</Text>
        </TouchableOpacity>
      )}
      <Text style={styles.title}>{title}</Text>
      {showProfileIcon && (
        <TouchableOpacity onPress={onProfilePress}>
          {/* Ícone de perfil */}
          <Text>👤</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default Header; 
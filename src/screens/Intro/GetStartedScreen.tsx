// screens/Intro/GetStartedScreen.tsx
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import styles from '../../styles/getStartedStyles';

type RootStackParamList = {
  Auth: { screen: 'Login' | 'Register' } | undefined;
};

type NavigationProp = StackNavigationProp<RootStackParamList, 'Auth'>;

const GetStartedScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to Franchise Management System</Text>

      <Text style={styles.subtitle}>
        Streamline operations, manage inventory, monitor sales, and grow your franchise network efficiently.
      </Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Auth', { screen: 'Login' })}
      >
        <Text style={styles.buttonText}>Get Started</Text>
      </TouchableOpacity>
    </View>
  );
};

export default GetStartedScreen;

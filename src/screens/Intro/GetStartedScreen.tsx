// screens/Intro/GetStartedScreen.tsx
import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import styles from '../../styles/getStartedStyles';

// Assuming 'Auth' is the name of the nested navigator in AppNavigator
type RootStackParamList = {
  Auth: { screen: 'Login' | 'Register' } | undefined;
};

type NavigationProp = StackNavigationProp<RootStackParamList, 'Auth'>;

const GetStartedScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();

  return (
    <View style={styles.container}>
      {/* Display the image */}
      <Image
        source={require('../../assets/fms.webp')}
        style={styles.image}
        resizeMode="contain"
      />

      <Text style={styles.title}>Welcome to Franchise Management System</Text>

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



import React, { useEffect } from 'react';
import { View, Text, StyleSheet, ImageBackground } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { useNavigation } from '@react-navigation/native';
import { colors } from '../../utils/colors'; 

const LandingScreen = () => {
  const navigation = useNavigation();

  useEffect(() => {
    const timeout = setTimeout(() => {
      navigation.navigate('GetStarted'); // or 'Login'
    }, 2500);

    return () => clearTimeout(timeout);
  }, [navigation]);

  return (
    
    <View style={styles.container}>
      <Animatable.Text
        animation="fadeInDown"
        duration={2000}
        style={styles.title}  
      >
        Franchise Management System
      </Animatable.Text>
      <Animatable.Text animation="pulse" iterationCount="infinite" style={styles.magic}>
        ✨ Empowering Franchises ✨
      </Animatable.Text>
      
    </View>
  );
};

export default LandingScreen;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 28,
    color: '#facc15', // white color for better contrast
    fontWeight: 'bold',
    textAlign: 'center',
  },
  magic: {
    marginTop: 20,
    color: '#facc15', // golden yellow
    fontSize: 16,
  },
});
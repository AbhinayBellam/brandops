// // screens/Intro/LandingScreen.tsx
// import React, { useEffect } from 'react';
// import { View, Text, StyleSheet } from 'react-native';
// import { useNavigation } from '@react-navigation/native';
// import { StackNavigationProp } from '@react-navigation/stack';
import { AuthStackParamList } from '../../navigation/AuthNavigator';

// type NavigationProp = StackNavigationProp<AuthStackParamList, 'Landing'>;

// const LandingScreen: React.FC = () => {
//   const navigation = useNavigation<NavigationProp>();

//   useEffect(() => {
//     const timer = setTimeout(() => {
//       navigation.replace('GetStarted');
//     }, 2000);

//     return () => clearTimeout(timer);
//   }, [navigation]);

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Welcome to FMS</Text>
//     </View>
//   );
// };

// export default LandingScreen;

// const styles = StyleSheet.create({
//   container: { flex: 1, justifyContent: 'center', alignItems: 'center' ,},
//   title: { fontSize: 28, fontWeight: 'bold' },
  
// });



// screens/Intro/LandingScreen.tsx
import React, { useEffect } from 'react';
import { View, Text, StyleSheet, ImageBackground } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { useNavigation } from '@react-navigation/native';

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
    backgroundColor: '#24585C', // dark magical background
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 28,
    color: '#FFFFFF', // white color for better contrast
    fontWeight: 'bold',
    textAlign: 'center',
  },
  magic: {
    marginTop: 20,
    color: '#facc15', // golden yellow
    fontSize: 16,
  },
});
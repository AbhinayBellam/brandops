// import React from 'react';
// import { TouchableOpacity, Text, StyleSheet } from 'react-native';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { useNavigation } from '@react-navigation/native';
// import { StackNavigationProp } from '@react-navigation/stack';
// import { AuthStackParamList } from '../../navigation/AuthNavigator';

// type NavigationProp = StackNavigationProp<AuthStackParamList>;

// const LogoutButton = () => {
//   const navigation = useNavigation<NavigationProp>();

//   const handleLogout = async () => {
//     await AsyncStorage.removeItem('token');
//     await AsyncStorage.removeItem('userRole');
//     navigation.reset({
//       index: 0,
//       routes: [{ name: 'Login' }], // Replace 'Login' with the correct route name from AuthStackParamList
//     });
//   };

//   return (
//     <TouchableOpacity style={styles.button} onPress={handleLogout}>
//       <Text style={styles.text}>Logout</Text>
//     </TouchableOpacity>
//   );
// };

// export default LogoutButton;

// const styles = StyleSheet.create({
//   button: {
//     backgroundColor: '#ff7043',
//     padding: 10,
//     borderRadius: 8,
//     alignSelf: 'center',
//     marginTop: 20,
//   },
//   text: {
//     color: '#fff',
//     fontWeight: 'bold',
//   },
// });


// import React from 'react';
// import { TouchableOpacity, Text, StyleSheet, Alert } from 'react-native';
// import { useNavigation } from '@react-navigation/native';
// import { useUser } from '../../context/UserContext';



// const LogoutButton = () => {
//   const navigation = useNavigation();
//   const { logout } = useUser();

//   const handleLogout = async () => {
//     Alert.alert(
//       'Logout',
//       'Are you sure you want to logout?',
//       [
//         { text: 'Cancel', style: 'cancel' },
//         {
//           text: 'Logout',
//           style: 'destructive',
//           onPress: async () => {
//             await logout();
//             navigation.reset({
//               index: 0,
//               routes: [{ name: 'Auth' }],
//             });
//           },
//         },
//       ],
//       { cancelable: true }
//     );
//   };

//   return (
    
//     <TouchableOpacity style={styles.button} onPress={handleLogout}>
//       <Text style={styles.buttonText}>Logout</Text>
//     </TouchableOpacity>
  
//   );
// };

// export default LogoutButton;

// const styles = StyleSheet.create({
//   button: {
//     paddingVertical: 10,
//     paddingHorizontal: 16,
//     backgroundColor: '#FF3B30',
//     borderRadius: 8,
//     alignSelf: 'flex-start',
//     marginTop: 10,
//   },
//   buttonText: {
//     color: '#fff',
//     fontWeight: 'bold',
//   },
// });


import React from 'react';
import { TouchableOpacity, Text, StyleSheet, Alert } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { useUser } from '../../context/UserContext';
import { AppStackParamList } from '../../navigation/AppNavigator'; // ✅ import the type


type Props = {
  navigation: NavigationProp<AppStackParamList>;
};


const LogoutButton = ({ navigation }: Props) => {
  const { logout } = useUser();

  const handleLogout = async () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Logout',
          style: 'destructive',
          onPress: async () => {
            await logout();
            navigation.reset({
              index: 0,
              routes: [{ name: 'Login' }], // 👈 match the actual route name
            });
          },
        },
      ],
      { cancelable: true }
    );
  };

  return (
    <TouchableOpacity style={styles.button} onPress={handleLogout}>
      <Text style={styles.buttonText}>Logout</Text>
    </TouchableOpacity>
  );
};

export default LogoutButton;

const styles = StyleSheet.create({
  button: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    backgroundColor: '#FF3B30',
    borderRadius: 8,
    alignSelf: 'flex-start',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

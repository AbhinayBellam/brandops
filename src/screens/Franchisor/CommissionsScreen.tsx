// import React from 'react';
// import { View, Text, StyleSheet } from 'react-native';

// const commissions = [
//   { franchise: 'Hyderabad', rate: '10%', month: 'May', total: '₹5000' },
//   { franchise: 'Mumbai', rate: '8%', month: 'May', total: '₹4200' },
// ];

// const CommissionsScreen = () => {
//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Commissions</Text>
//       {commissions.map((item, index) => (
//         <View style={styles.card} key={index}>
//           <Text>Franchise: {item.franchise}</Text>
//           <Text>Rate: {item.rate}</Text>
//           <Text>Month: {item.month}</Text>
//           <Text>Total: {item.total}</Text>
//         </View>
//       ))}
//     </View>
//   );
// };

// export default CommissionsScreen;

// const styles = StyleSheet.create({
//   container: { flex: 1, padding: 20, backgroundColor: '#e0f7fa' },
//   title: { fontSize: 24, fontWeight: 'bold', marginBottom: 16, color: '#ff7043' },
//   card: {
//     backgroundColor: '#fff8dc',
//     padding: 14,
//     borderRadius: 10,
//     marginVertical: 8,
//   },
// });

import React, { useState } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, ScrollView
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Menu, Provider } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation, DrawerActions } from '@react-navigation/native';
import LogoutButton from '../../components/Franchisor/LogoutButton';

const commissions = [
  { franchise: 'Hyderabad', rate: '10%', month: 'May', total: '₹5000' },
  { franchise: 'Mumbai', rate: '8%', month: 'May', total: '₹4200' },
];

export default function CommissionsScreen() {
  const [menuVisible, setMenuVisible] = useState(false);
  const navigation = useNavigation();
  const userName = "Abhinay";

  const openMenu = () => setMenuVisible(true);
  const closeMenu = () => setMenuVisible(false);

  return (
    <Provider>
      <SafeAreaView style={styles.safeArea}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.dispatch(DrawerActions.openDrawer())}>
            <Icon name="menu" size={28} color="#000" />
          </TouchableOpacity>
          <Text style={styles.title}>Commissions</Text>
          <Menu
            visible={menuVisible}
            onDismiss={closeMenu}
            anchor={
              <TouchableOpacity onPress={openMenu} style={styles.profileCircle}>
                <Text style={styles.profileText}>{userName[0]}</Text>
              </TouchableOpacity>
            }
          >
            <Menu.Item onPress={() => console.log('Profile')} title="Profile" />
            {/* <Menu.Item onPress={() => console.log('Logout')} title="Logout" /> */}
             <LogoutButton />
          </Menu>
        </View>

        {/* Content */}
        <ScrollView contentContainerStyle={styles.container}>
          {commissions.map((item, index) => (
            <View style={styles.card} key={index}>
              <Text>Franchise: {item.franchise}</Text>
              <Text>Rate: {item.rate}</Text>
              <Text>Month: {item.month}</Text>
              <Text>Total: {item.total}</Text>
            </View>
          ))}
        </ScrollView>
      </SafeAreaView>
    </Provider>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#e0f7fa' },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#fff',
    elevation: 4,
    zIndex: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FF7F50',
  },
  profileCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#FF7F50',
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  container: {
    padding: 20,
  },
  card: {
    backgroundColor: '#fff8dc',
    padding: 14,
    borderRadius: 10,
    marginVertical: 8,
  },
});


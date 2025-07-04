
// // screens/Franchisor/FranchisesScreen.tsx
// import React, { useState } from 'react';
// import { View, Text, FlatList, Button, StyleSheet } from 'react-native';

// const initialFranchises = [
//   { id: '1', name: 'Franchise A', region: 'North' },
//   { id: '2', name: 'Franchise B', region: 'South' },
// ];

// export default function FranchisesScreen() {
//   const [franchises, setFranchises] = useState(initialFranchises);

//   const deleteFranchise = (id: string) => {
//     setFranchises(prev => prev.filter(f => f.id !== id));
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>All Franchises</Text>
//       <FlatList
//         data={franchises}
//         keyExtractor={item => item.id}
//         renderItem={({ item }) => (
//           <View style={styles.card}>
//             <Text style={styles.name}>{item.name} - {item.region}</Text>
//             <Button title="Delete" color="#F44336" onPress={() => deleteFranchise(item.id)} />
//           </View>
//         )}
//       />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1, padding: 16, backgroundColor: '#E6F7FF' },
//   title: { fontSize: 22, fontWeight: 'bold', color: '#FF7F50', marginBottom: 12 },
//   card: { backgroundColor: '#FFF2E5', padding: 16, borderRadius: 10, marginBottom: 10 },
//   name: { fontSize: 18, fontWeight: '600' },
// });


import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  Button,
  StyleSheet,
  TouchableOpacity
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, DrawerActions } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Menu, Provider } from 'react-native-paper';
import LogoutButton from '../../components/Franchisor/LogoutButton';

const initialFranchises = [
  { id: '1', name: 'Franchise A', region: 'North' },
  { id: '2', name: 'Franchise B', region: 'South' },
];

export default function FranchisesScreen() {
  const [franchises, setFranchises] = useState(initialFranchises);
  const [menuVisible, setMenuVisible] = useState(false);
  const navigation = useNavigation();
  const userName = 'Abhinay';

  const deleteFranchise = (id: string) => {
    setFranchises(prev => prev.filter(f => f.id !== id));
  };

  return (
    <Provider>
      <SafeAreaView style={{ flex: 1, backgroundColor: '#E6F7FF' }}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.dispatch(DrawerActions.openDrawer())}>
            <Icon name="menu" size={28} color="#000" />
          </TouchableOpacity>
          <Text style={styles.title}>All Franchises</Text>
          <Menu
            visible={menuVisible}
            onDismiss={() => setMenuVisible(false)}
            anchor={
              <TouchableOpacity onPress={() => setMenuVisible(true)} style={styles.profileCircle}>
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
        <View style={styles.container}>
          <FlatList
            data={franchises}
            keyExtractor={item => item.id}
            renderItem={({ item }) => (
              <View style={styles.card}>
                <Text style={styles.name}>{item.name} - {item.region}</Text>
                <Button title="Delete" color="#F44336" onPress={() => deleteFranchise(item.id)} />
              </View>
            )}
          />
        </View>
      </SafeAreaView>
    </Provider>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
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
    flex: 1,
    padding: 16,
    backgroundColor: '#E6F7FF',
  },
  card: {
    backgroundColor: '#FFF2E5',
    padding: 16,
    borderRadius: 10,
    marginBottom: 10,
  },
  name: {
    fontSize: 18,
    fontWeight: '600',
  },
});

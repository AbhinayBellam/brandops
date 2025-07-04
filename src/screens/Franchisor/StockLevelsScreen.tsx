// // screens/Franchisor/StockLevelsScreen.tsx
// import React from 'react';
// import { View, Text, FlatList, StyleSheet } from 'react-native';

// const stockData = [
//   { id: '1', franchise: 'Franchise A', product: 'Product A', quantity: 10 },
//   { id: '2', franchise: 'Franchise A', product: 'Product B', quantity: 5 },
//   { id: '3', franchise: 'Franchise B', product: 'Product A', quantity: 15 },
// ];

// export default function StockLevelsScreen() {
//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Stock Levels</Text>
//       <FlatList
//         data={stockData}
//         keyExtractor={item => item.id}
//         renderItem={({ item }) => (
//           <View style={styles.row}>
//             <Text style={styles.cell}>{item.franchise}</Text>
//             <Text style={styles.cell}>{item.product}</Text>
//             <Text style={styles.cell}>Qty: {item.quantity}</Text>
//           </View>
//         )}
//       />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1, backgroundColor: '#E6F7FF', padding: 16 },
//   title: { fontSize: 22, fontWeight: 'bold', marginBottom: 12, color: '#FF7F50' },
//   row: { flexDirection: 'row', justifyContent: 'space-between', backgroundColor: '#FFF2E5', padding: 12, borderRadius: 8, marginVertical: 6 },
//   cell: { fontSize: 16 },
// });


import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, DrawerActions } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Menu, Provider } from 'react-native-paper';
import LogoutButton from '../../components/Franchisor/LogoutButton';

const stockData = [
  { id: '1', franchise: 'Franchise A', product: 'Product A', quantity: 10 },
  { id: '2', franchise: 'Franchise A', product: 'Product B', quantity: 5 },
  { id: '3', franchise: 'Franchise B', product: 'Product A', quantity: 15 },
];

export default function StockLevelsScreen() {
  const navigation = useNavigation();
  const [menuVisible, setMenuVisible] = useState(false);
  const userName = 'Abhinay';

  return (
    <Provider>
      <SafeAreaView style={{ flex: 1, backgroundColor: '#E6F7FF' }}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.dispatch(DrawerActions.openDrawer())}>
            <Icon name="menu" size={28} color="#000" />
          </TouchableOpacity>
          <Text style={styles.title}>Stock Levels</Text>
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
            data={stockData}
            keyExtractor={item => item.id}
            renderItem={({ item }) => (
              <View style={styles.row}>
                <Text style={styles.cell}>{item.franchise}</Text>
                <Text style={styles.cell}>{item.product}</Text>
                <Text style={styles.cell}>Qty: {item.quantity}</Text>
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
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#FFF2E5',
    padding: 12,
    borderRadius: 8,
    marginVertical: 6,
  },
  cell: {
    fontSize: 16,
  },
});

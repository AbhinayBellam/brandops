// import React from 'react';
// import { View, Text, FlatList, Button, StyleSheet } from 'react-native';

// const stockRequests = [
//   { id: '1', franchise: 'Hyderabad', product: 'Coffee Beans', quantity: 20 },
//   { id: '2', franchise: 'Mumbai', product: 'Tea Powder', quantity: 15 },
// ];

// const StockRequestsScreen = () => {
//   const handleApprove = (id: string) => {};
//   const handleReject = (id: string) => {};

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Stock Requests</Text>
//       <FlatList
//         data={stockRequests}
//         keyExtractor={item => item.id}
//         renderItem={({ item }) => (
//           <View style={styles.card}>
//             <Text>{item.franchise}: {item.product} - {item.quantity}</Text>
//             <View style={styles.actions}>
//               <Button title="Approve" onPress={() => handleApprove(item.id)} color="#28a745" />
//               <Button title="Reject" onPress={() => handleReject(item.id)} color="#dc3545" />
//             </View>
//           </View>
//         )}
//       />
//     </View>
//   );
// };

// export default StockRequestsScreen;

// const styles = StyleSheet.create({
//   container: { flex: 1, backgroundColor: '#e0f7fa', padding: 20 },
//   title: { fontSize: 22, fontWeight: 'bold', marginBottom: 16, color: '#ff7043' },
//   card: {
//     backgroundColor: '#fff8dc',
//     padding: 12,
//     borderRadius: 10,
//     marginBottom: 10,
//   },
//   actions: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginTop: 10,
//   },
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
import { Menu, Provider } from 'react-native-paper';
import { useNavigation, DrawerActions } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import LogoutButton from '../../components/Franchisor/LogoutButton';

const stockRequests = [
  { id: '1', franchise: 'Hyderabad', product: 'Coffee Beans', quantity: 20 },
  { id: '2', franchise: 'Mumbai', product: 'Tea Powder', quantity: 15 },
];

const StockRequestsScreen = () => {
  const [menuVisible, setMenuVisible] = useState(false);
  const navigation = useNavigation();
  const userName = 'Abhinay';

  const handleApprove = (id: string) => {
    console.log('Approved request ID:', id);
  };

  const handleReject = (id: string) => {
    console.log('Rejected request ID:', id);
  };

  return (
    <Provider>
      <SafeAreaView style={{ flex: 1, backgroundColor: '#e0f7fa' }}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.dispatch(DrawerActions.openDrawer())}>
            <Icon name="menu" size={28} color="#000" />
          </TouchableOpacity>
          <Text style={styles.title}>Stock Requests</Text>
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
            data={stockRequests}
            keyExtractor={item => item.id}
            renderItem={({ item }) => (
              <View style={styles.card}>
                <Text>{item.franchise}: {item.product} - {item.quantity}</Text>
                <View style={styles.actions}>
                  <Button title="Approve" onPress={() => handleApprove(item.id)} color="#28a745" />
                  <Button title="Reject" onPress={() => handleReject(item.id)} color="#dc3545" />
                </View>
              </View>
            )}
          />
        </View>
      </SafeAreaView>
    </Provider>
  );
};

export default StockRequestsScreen;

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
    color: '#ff7043',
  },
  profileCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#ff7043',
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#e0f7fa',
  },
  card: {
    backgroundColor: '#fff8dc',
    padding: 12,
    borderRadius: 10,
    marginBottom: 10,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
});

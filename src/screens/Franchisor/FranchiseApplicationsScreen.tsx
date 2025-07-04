// // screens/Franchisor/FranchiseApplicationsScreen.tsx
// import React, { useState } from 'react';
// import { View, Text, Button, FlatList, StyleSheet } from 'react-native';
// import { SafeAreaView } from 'react-native-safe-area-context';

// const applications = [
//   { id: '1', name: 'Franchise A', region: 'North', status: 'pending' },
//   { id: '2', name: 'Franchise B', region: 'South', status: 'pending' },
// ];

// export default function FranchiseApplicationsScreen() {
//   const [appList, setAppList] = useState(applications);

//   const handleAction = (id: string, action: 'approved' | 'rejected') => {
//     setAppList(prev =>
//       prev.map(app =>
//         app.id === id ? { ...app, status: action } : app
//       )
//     );
//   };

//   return (
//     <SafeAreaView style={{ flex: 1, backgroundColor: '#E6F7FF' }}>
//     <View style={styles.container}>
//       <Text style={styles.title}>Franchise Applications</Text>
//       <FlatList
//         data={appList}
//         keyExtractor={item => item.id}
//         renderItem={({ item }) => (
//           <View style={styles.card}>
//             <Text style={styles.name}>{item.name} - {item.region}</Text>
//             <Text>Status: {item.status}</Text>
//             {item.status === 'pending' && (
//               <View style={styles.actions}>
//                 <Button title="Approve" color="#4CAF50" onPress={() => handleAction(item.id, 'approved')} />
//                 <Button title="Reject" color="#F44336" onPress={() => handleAction(item.id, 'rejected')} />
//               </View>
//             )}
//           </View>
//         )}
//       />
//     </View>
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1, padding: 16, backgroundColor: '#E6F7FF' },
//   title: { fontSize: 22, fontWeight: 'bold', marginBottom: 10, color: '#FF7F50' },
//   card: { padding: 16, backgroundColor: '#FFF2E5', marginVertical: 8, borderRadius: 10 },
//   name: { fontSize: 18, fontWeight: '600' },
//   actions: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 },
// });




import React, { useState } from 'react';
import {
  View, Text, Button, FlatList, StyleSheet, TouchableOpacity
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Menu, Provider } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation, DrawerActions } from '@react-navigation/native';
import LogoutButton from '../../components/Franchisor/LogoutButton';

const applications = [
  { id: '1', name: 'Franchise A', region: 'North', status: 'pending' },
  { id: '2', name: 'Franchise B', region: 'South', status: 'pending' },
];

export default function FranchiseApplicationsScreen() {
  const [appList, setAppList] = useState(applications);
  const [menuVisible, setMenuVisible] = useState(false);
  const navigation = useNavigation();
  const userName = "Abhinay";

  const handleAction = (id: string, action: 'approved' | 'rejected') => {
    setAppList(prev =>
      prev.map(app =>
        app.id === id ? { ...app, status: action } : app
      )
    );
  };

  return (
    <Provider>
      <SafeAreaView style={{ flex: 1, backgroundColor: '#E6F7FF' }}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.dispatch(DrawerActions.openDrawer())}>
            <Icon name="menu" size={28} color="#000" />
          </TouchableOpacity>
          <Text style={styles.title}>Franchise Applications</Text>
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
            data={appList}
            keyExtractor={item => item.id}
            renderItem={({ item }) => (
              <View style={styles.card}>
                <Text style={styles.name}>{item.name} - {item.region}</Text>
                <Text>Status: {item.status}</Text>
                {item.status === 'pending' && (
                  <View style={styles.actions}>
                    <Button title="Approve" color="#4CAF50" onPress={() => handleAction(item.id, 'approved')} />
                    <Button title="Reject" color="#F44336" onPress={() => handleAction(item.id, 'rejected')} />
                  </View>
                )}
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
    flex: 1,
    padding: 16,
    backgroundColor: '#E6F7FF',
  },
  card: {
    padding: 16,
    backgroundColor: '#FFF2E5',
    marginVertical: 8,
    borderRadius: 10,
  },
  name: {
    fontSize: 18,
    fontWeight: '600',
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
});

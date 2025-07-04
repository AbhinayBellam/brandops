// import React from 'react';
// import { View, Text, FlatList, StyleSheet, Button, Image } from 'react-native';

// const products = [
//   { id: '1', name: 'Product A', price: 100, image: 'https://via.placeholder.com/60', description: 'Great product A' },
//   { id: '2', name: 'Product B', price: 150, image: 'https://via.placeholder.com/60', description: 'Nice product B' },
// ];

// const ViewProductsScreen: React.FC = () => {
//   const handleEdit = (id: string) => {
//     // Navigation or logic here
//   };

//   const handleDelete = (id: string) => {
//     // Delete logic here
//   };

//   return (
//     <FlatList
//       style={styles.container}
//       data={products}
//       keyExtractor={(item) => item.id}
//       renderItem={({ item }) => (
//         <View style={styles.card}>
//           <Image source={{ uri: item.image }} style={styles.image} />
//           <View style={styles.details}>
//             <Text style={styles.name}>{item.name}</Text>
//             <Text>₹{item.price}</Text>
//             <Text>{item.description}</Text>
//             <View style={styles.buttons}>
//               <Button title="Edit" onPress={() => handleEdit(item.id)} color="#DEB887" />
//               <Button title="Delete" onPress={() => handleDelete(item.id)} color="#FF7F50" />
//             </View>
//           </View>
//         </View>
//       )}
//     />
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     padding: 10,
//     backgroundColor: '#F8F8F8',
//   },
//   card: {
//     flexDirection: 'row',
//     backgroundColor: '#fff',
//     marginBottom: 10,
//     borderRadius: 10,
//     overflow: 'hidden',
//     elevation: 2,
//   },
//   image: {
//     width: 60,
//     height: 60,
//     margin: 10,
//   },
//   details: {
//     flex: 1,
//     padding: 10,
//   },
//   name: {
//     fontWeight: 'bold',
//     color: '#333',
//   },
//   buttons: {
//     flexDirection: 'row',
//     marginTop: 10,
//     justifyContent: 'space-between',
//     width: '70%',
//   },
// });

// export default ViewProductsScreen;



import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Button,
  Image,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, DrawerActions } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Menu, Provider } from 'react-native-paper';
import LogoutButton from '../../components/Franchisor/LogoutButton';

const products = [
  {
    id: '1',
    name: 'Product A',
    price: 100,
    image: 'https://via.placeholder.com/60',
    description: 'Great product A',
  },
  {
    id: '2',
    name: 'Product B',
    price: 150,
    image: 'https://via.placeholder.com/60',
    description: 'Nice product B',
  },
];

const ViewProductsScreen: React.FC = () => {
  const navigation = useNavigation();
  const [menuVisible, setMenuVisible] = useState(false);
  const userName = 'Abhinay';

  const handleEdit = (id: string) => {
    console.log('Edit product:', id);
  };

  const handleDelete = (id: string) => {
    console.log('Delete product:', id);
  };

  return (
    <Provider>
      <SafeAreaView style={{ flex: 1, backgroundColor: '#F8F8F8' }}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.dispatch(DrawerActions.openDrawer())}>
            <Icon name="menu" size={28} color="#000" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>View Products</Text>
          <Menu
            visible={menuVisible}
            onDismiss={() => setMenuVisible(false)}
            anchor={
              <TouchableOpacity
                onPress={() => setMenuVisible(true)}
                style={styles.profileCircle}
              >
                <Text style={styles.profileText}>{userName[0]}</Text>
              </TouchableOpacity>
            }
          >
            <Menu.Item onPress={() => console.log('Profile')} title="Profile" />
            {/* <Menu.Item onPress={() => console.log('Logout')} title="Logout" /> */}
             <LogoutButton />
          </Menu>
        </View>

        {/* Product List */}
        <FlatList
          style={styles.container}
          data={products}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Image source={{ uri: item.image }} style={styles.image} />
              <View style={styles.details}>
                <Text style={styles.name}>{item.name}</Text>
                <Text>₹{item.price}</Text>
                <Text>{item.description}</Text>
                <View style={styles.buttons}>
                  <Button
                    title="Edit"
                    onPress={() => handleEdit(item.id)}
                    color="#DEB887"
                  />
                  <Button
                    title="Delete"
                    onPress={() => handleDelete(item.id)}
                    color="#FF7F50"
                  />
                </View>
              </View>
            </View>
          )}
        />
      </SafeAreaView>
    </Provider>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingVertical: 12,
    elevation: 4,
    zIndex: 10,
  },
  headerTitle: {
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
    padding: 10,
    backgroundColor: '#F8F8F8',
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    marginBottom: 10,
    borderRadius: 10,
    overflow: 'hidden',
    elevation: 2,
  },
  image: {
    width: 60,
    height: 60,
    margin: 10,
  },
  details: {
    flex: 1,
    padding: 10,
  },
  name: {
    fontWeight: 'bold',
    color: '#333',
  },
  buttons: {
    flexDirection: 'row',
    marginTop: 10,
    justifyContent: 'space-between',
    width: '70%',
  },
});

export default ViewProductsScreen;

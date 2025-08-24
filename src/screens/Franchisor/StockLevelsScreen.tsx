

// import React, { useState } from 'react';
// import {
//   View,
//   Text,
//   FlatList,
//   StyleSheet,
//   TouchableOpacity,
// } from 'react-native';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import { useNavigation, DrawerActions } from '@react-navigation/native';
// import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
// import { Menu, Provider } from 'react-native-paper';
// import LogoutButton from '../../components/Franchisor/LogoutButton';

// const stockData = [
//   { id: '1', franchise: 'Franchise A', product: 'Product A', quantity: 10 },
//   { id: '2', franchise: 'Franchise A', product: 'Product B', quantity: 5 },
//   { id: '3', franchise: 'Franchise B', product: 'Product A', quantity: 15 },
// ];

// export default function StockLevelsScreen() {
//   const navigation = useNavigation();
//   const [menuVisible, setMenuVisible] = useState(false);
//   const userName = 'Abhinay';

//   return (
//     <Provider>
//       <SafeAreaView style={{ flex: 1, backgroundColor: '#E6F7FF' }}>
//         {/* Header */}
//         <View style={styles.header}>
//           <TouchableOpacity onPress={() => navigation.dispatch(DrawerActions.openDrawer())}>
//             <Icon name="menu" size={28} color="#000" />
//           </TouchableOpacity>
//           <Text style={styles.title}>Stock Levels</Text>
//           <Menu
//             visible={menuVisible}
//             onDismiss={() => setMenuVisible(false)}
//             anchor={
//               <TouchableOpacity onPress={() => setMenuVisible(true)} style={styles.profileCircle}>
//                 <Text style={styles.profileText}>{userName[0]}</Text>
//               </TouchableOpacity>
//             }
//           >
//             <Menu.Item onPress={() => console.log('Profile')} title="Profile" />
//             {/* <Menu.Item onPress={() => console.log('Logout')} title="Logout" /> */}
//              <LogoutButton />
//           </Menu>
//         </View>

//         {/* Content */}
//         <View style={styles.container}>
//           <FlatList
//             data={stockData}
//             keyExtractor={item => item.id}
//             renderItem={({ item }) => (
//               <View style={styles.row}>
//                 <Text style={styles.cell}>{item.franchise}</Text>
//                 <Text style={styles.cell}>{item.product}</Text>
//                 <Text style={styles.cell}>Qty: {item.quantity}</Text>
//               </View>
//             )}
//           />
//         </View>
//       </SafeAreaView>
//     </Provider>
//   );
// }

// const styles = StyleSheet.create({
//   header: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     paddingHorizontal: 16,
//     paddingVertical: 12,
//     backgroundColor: '#fff',
//     elevation: 4,
//     zIndex: 10,
//   },
//   title: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     color: '#FF7F50',
//   },
//   profileCircle: {
//     width: 36,
//     height: 36,
//     borderRadius: 18,
//     backgroundColor: '#FF7F50',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   profileText: {
//     color: '#fff',
//     fontWeight: 'bold',
//   },
//   container: {
//     flex: 1,
//     padding: 16,
//     backgroundColor: '#E6F7FF',
//   },
//   row: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     backgroundColor: '#FFF2E5',
//     padding: 12,
//     borderRadius: 8,
//     marginVertical: 6,
//   },
//   cell: {
//     fontSize: 16,
//   },
// });



import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ScrollView
} from 'react-native';
import { fetchAllInventory } from '../../services/inventoryService';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Provider, Menu } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation, DrawerActions } from '@react-navigation/native';
import FranchisorHeader from '../../components/Franchisor/FranchisorHeader';

interface InventoryItem {
  productId: string;
  productName: string;
  quantity: number;
}

interface FranchiseInventory {
  franchiseId: string;
  franchiseName: string;
  inventory: InventoryItem[];
}

const StockLevelsScreen = () => {
    const navigation = useNavigation();
    const [menuVisible, setMenuVisible] = useState(false);
  const [data, setData] = useState<FranchiseInventory[]>([]);
  const [expanded, setExpanded] = useState<string | null>(null);

  useEffect(() => {
    loadInventory();
  }, []);

  const loadInventory = async () => {
    try {
      const result = await fetchAllInventory();
      setData(result);
    } catch (error) {
      console.error('Error fetching inventory:', error);
    }
  };

  const toggleExpand = (id: string) => {
    setExpanded(prev => (prev === id ? null : id));
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#E6F7FF' }}>
      <FranchisorHeader title="Stock Levels" />
    <ScrollView contentContainerStyle={styles.container}>
      {data.map(franchise => (
        <View key={franchise.franchiseId} style={styles.card}>
          <TouchableOpacity onPress={() => toggleExpand(franchise.franchiseId)}>
            <Text style={styles.franchiseName}>{franchise.franchiseName}</Text>
          </TouchableOpacity>
          {expanded === franchise.franchiseId && (
            <View style={styles.productList}>
              {franchise.inventory.length === 0 ? (
                <Text style={styles.empty}>No products in inventory</Text>
              ) : (
                franchise.inventory.map(item => (
                  <View key={item.productId} style={styles.productItem}>
                    <Text>{item.productName}</Text>
                    <Text style={styles.quantity}>Qty: {item.quantity}</Text>
                  </View>
                ))
              )}
            </View>
          )}
        </View>
      ))}
    </ScrollView>
    </SafeAreaView>
  );
};

export default StockLevelsScreen;

const styles = StyleSheet.create({
  container: {
    padding: 10
  },
  header:{
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
    padding:12,
    backgroundColor:'#fff',
    elevation:3},
  title:{
    fontSize:20,
    fontWeight:'bold',
    color:'#FF7F50'},
  avatar:{
    width:36,
    height:36,
    borderRadius:18,
    backgroundColor:'#FF7F50',
    justifyContent:'center',
    alignItems:'center'},
  avatarText:{
    color:'#fff',
    fontWeight:'bold'},
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 12,
    marginBottom: 10,
    elevation: 3
  },
  franchiseName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333'
  },
  productList: {
    marginTop: 10
  },
  productItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 6,
    borderBottomWidth: 0.5,
    borderBottomColor: '#ccc'
  },
  quantity: {
    fontWeight: '600'
  },
  empty: {
    color: 'gray',
    fontStyle: 'italic'
  }
});

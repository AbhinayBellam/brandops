

// import React, { useEffect, useState } from 'react';
// import {
//   View, Text, FlatList, TouchableOpacity, TextInput, Alert, ActivityIndicator, StyleSheet
// } from 'react-native';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import { fetchApplications, rejectApplication, approveApplication, createFranchise } from '../../services/franchisorService';
// import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
// import { useNavigation, DrawerActions } from '@react-navigation/native';
// import { Menu } from 'react-native-paper';
// import LogoutButton from '../../components/Franchisor/LogoutButton';
// import { useUser } from '../../context/UserContext';

// const FranchiseApplicationsScreen = () => {
//   const [applications, setApplications] = useState<any[]>([]);
//   const [expandedId, setExpandedId] = useState<string | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [commissionInput, setCommissionInput] = useState<{ [key: string]: string }>({});
//   const [franchiseNameInput, setFranchiseNameInput] = useState<{ [key: string]: string }>({});
//   const [menuVisible, setMenuVisible] = useState(false);

//   const navigation = useNavigation();
//   const { user } = useUser();
//   const token = user?.token;

//   const loadApplications = async () => {
//     try {
//       const result = await fetchApplications();
//       setApplications(result);
//     } catch (err) {
//       Alert.alert('Error', 'Failed to fetch applications');
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     loadApplications();
//   }, []);

//   const handleReject = async (id: string) => {
//     try {
//       await rejectApplication(id);
//       Alert.alert('Rejected', 'Application has been rejected.');
//       loadApplications();
//     } catch {
//       Alert.alert('Error', 'Failed to reject application.');
//     }
//   };

//   const handleApprove = async (id: string) => {
//     try {
//       await approveApplication(id);
//       Alert.alert('Approved', 'Now set commission and create franchise.');
//       loadApplications();
//     } catch {
//       Alert.alert('Error', 'Failed to approve application.');
//     }
//   };

//   const handleCreateFranchise = async (id: string) => {
//     const rate = parseFloat(commissionInput[id]);
//     const name = franchiseNameInput[id];

//     if (!name || isNaN(rate)) {
//       return Alert.alert('Validation Error', 'Enter name and valid commission rate');
//     }

//     try {
//       await createFranchise(id, name, rate);
//       Alert.alert('Success', 'Franchise created successfully');
//       loadApplications();
//     } catch {
//       Alert.alert('Error', 'Failed to create franchise.');
//     }
//   };

//   const renderItem = ({ item }: any) => {
//     const isExpanded = expandedId === item._id;

//     return (
     
//       <View style={{ margin: 10, padding: 10, borderWidth: 1, borderRadius: 8 }}>
//         <TouchableOpacity onPress={() => setExpandedId(isExpanded ? null : item._id)}>
//           <Text style={{ fontWeight: 'bold' }}>{item.region} - {item.status}</Text>
//         </TouchableOpacity>

//         {isExpanded && (
//           <View style={{ marginTop: 10 }}>
//             <Text>Name: {item?.franchisee?.name}</Text>
//             <Text>Email: {item?.franchisee?.email}</Text>
//             <Text>Region: {item.region}</Text>
//             <Text>Address: {item.address?.street}, {item.address?.city}, {item.address?.state}</Text>
//             <Text>Country: {item.address?.country}</Text>
//             <Text>Pincode: {item.address?.zipCode}</Text>

//             {item.status === 'Pending' && (
//               <>
//                 <TouchableOpacity onPress={() => handleApprove(item._id)} style={{ marginTop: 10 }}>
//                   <Text style={{ color: 'green' }}>✅ Approve</Text>
//                 </TouchableOpacity>
//                 <TouchableOpacity onPress={() => handleReject(item._id)} style={{ marginTop: 5 }}>
//                   <Text style={{ color: 'red' }}>❌ Reject</Text>
//                 </TouchableOpacity>
//               </>
//             )}

//             {item.status === 'Approved' && (
//               <View style={{ marginTop: 10 }}>
//                 <TextInput
//                   placeholder="Franchise Name"
//                   value={franchiseNameInput[item._id] || ''}
//                   onChangeText={(text) =>
//                     setFranchiseNameInput((prev) => ({ ...prev, [item._id]: text }))
//                   }
//                   style={{ borderWidth: 1, marginBottom: 5, padding: 5 }}
//                 />
//                 <TextInput
//                   placeholder="Commission Rate (%)"
//                   keyboardType="numeric"
//                   value={commissionInput[item._id] || ''}
//                   onChangeText={(text) =>
//                     setCommissionInput((prev) => ({ ...prev, [item._id]: text }))
//                   }
//                   style={{ borderWidth: 1, padding: 5 }}
//                 />
//                 <TouchableOpacity
//                   onPress={() => handleCreateFranchise(item._id)}
//                   style={{ marginTop: 10 }}
//                 >
//                   <Text style={{ color: 'blue' }}>🚀 Create Franchise</Text>
//                 </TouchableOpacity>
//               </View>
//             )}
//           </View>
//         )}
//       </View>
    
//     );
//   };

//   if (loading) return <ActivityIndicator size="large" color="#007AFF" />;

//   return (
//     <SafeAreaView style={{ flex: 1, backgroundColor: '#E6F7FF' }}>
//     <View style={styles.header}>
// //           <TouchableOpacity onPress={() => navigation.dispatch(DrawerActions.openDrawer())}>
// //             <Icon name="menu" size={28} color="#000" />
// //           </TouchableOpacity>
// //           <Text style={styles.title}>Franchise Applications</Text>
// //           <Menu
//             visible={menuVisible}
//             onDismiss={() => setMenuVisible(false)}
//             anchor={
//               <TouchableOpacity onPress={() => setMenuVisible(true)} style={styles.profileCircle}>
//                 <Text style={styles.profileText}> </Text>
//               </TouchableOpacity>
//             }
//           >
//             <Menu.Item onPress={() => console.log('Profile')} title="Profile" />
//             <LogoutButton />
//           </Menu>
//         </View>
//     <FlatList
//       data={applications}
//       renderItem={renderItem}
//       keyExtractor={(item) => item._id}
//     />
//     </SafeAreaView>
//   );
// };

// export default FranchiseApplicationsScreen;

// const styles = StyleSheet.create({
//   header: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     paddingHorizontal: 16,
//     paddingVertical: 12,
//     backgroundColor: '#fff',
//     elevation: 4,
//     zIndex: 10,
//   },
//     title: {
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
//     padding: 16,
//   },
// });


// screens/FranchiseApplicationsScreen.tsx
import React, { useEffect, useState } from 'react';
import {
  View, Text, FlatList, TouchableOpacity, ActivityIndicator, StyleSheet
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import FranchiseApplicationCard from '../../components/Franchisor/FranchiseApplicationCard';
import { fetchApplications } from '../../services/franchisorService';
import { Menu } from 'react-native-paper';
import { useUser } from '../../context/UserContext';
import FranchisorHeader from '../../components/Franchisor/FranchisorHeader';

const FranchiseApplicationsScreen = () => {
  const [applications, setApplications] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [menuVisible, setMenuVisible] = useState(false);

  const { user } = useUser();
  const userInitial = user?.name?.charAt(0)?.toUpperCase() || 'U';

  const loadApplications = async () => {
    try {
      const result = await fetchApplications();
      setApplications(result);
    } catch (err) {
      console.error('Failed to fetch applications', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadApplications();
  }, []);

  if (loading) return <ActivityIndicator size="large" color="#007AFF" style={{ marginTop: 100 }} />;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#E6F7FF' }}>
      <FranchisorHeader title="Franchise Applications" />

      <FlatList
        data={applications}
        renderItem={({ item }) => (
          <FranchiseApplicationCard item={item} onRefresh={loadApplications} />
        )}
        keyExtractor={(item) => item._id}
        contentContainerStyle={{ paddingBottom: 16 }}
      />
    </SafeAreaView>
  );
};

export default FranchiseApplicationsScreen;

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
});

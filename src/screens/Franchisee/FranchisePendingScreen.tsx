// import React from 'react';
// import { View, Text, StyleSheet } from 'react-native';
// import LogoutButton from '../../components/Franchisor/LogoutButton';

// const PendingScreen = () => {
//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Application Pending</Text>
//       <Text style={styles.subtitle}>
//         Your application is currently under review. You will be notified once a decision is made.
//       </Text>
//       <LogoutButton />
//     </View>
//   );
// };

// export default PendingScreen;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     padding: 24,
//     backgroundColor: '#f9f9f9',
//   },
//   title: {
//     fontSize: 22,
//     fontWeight: 'bold',
//     marginBottom: 12,
//     color: '#333',
//   },
//   subtitle: {
//     fontSize: 16,
//     color: '#666',
//     textAlign: 'center',
//   },
// });               

import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, Alert } from 'react-native';
import { fetchMyFranchiseApplication } from '../../services/franchiseeService';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useUser } from '../../context/UserContext';
import { useNavigation } from '@react-navigation/native';
import LogoutButton from '../../components/Franchisor/LogoutButton';
const FranchiseePendingScreen = () => {
  const [application, setApplication] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const { user: authUser, isLoading: userLoading ,logout } = useUser();
  const navigation = useNavigation();
 

  useEffect(() => {
  const fetchData = async () => {
    setLoading(true);
    try {
      const app = await fetchMyFranchiseApplication();
      console.log('Application fetched:', app);
      setApplication(app);
    } catch (error: any) {
      console.error('Fetch application error:', error?.response?.data || error.message);
      Alert.alert('Error', 'Failed to fetch application details.');
    } finally {
      setLoading(false);
    }
  };

  fetchData();
}, []);

  if (!application) return <Text>Loading...</Text>;

  return (
    <SafeAreaView style={{ flex: 1 }}>
      
    <ScrollView style={{ padding: 16 }}>
      <Text style={{ fontWeight: 'bold' }}>Application Status: {application.status}</Text>

      <Text>Region: {application.region}</Text>
      <Text>Address:</Text>
      <Text>Street: {application.address?.street}</Text>
      <Text>City: {application.address?.city}</Text>
      <Text>State: {application.address?.state}</Text>
      <Text>Pincode: {application.address?.zipCode}</Text>
      <Text>Country:: {application.address?.country}</Text>
      {application.additionalDetails && (
        <Text>Additional: {application.additionalDetails}</Text>
      )}
      <LogoutButton/>
    </ScrollView>
    </SafeAreaView>
  );
};

export default FranchiseePendingScreen;

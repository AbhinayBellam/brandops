// import React from 'react';
// import { View, Text, StyleSheet } from 'react-native';

// const ReportsScreen = () => {
//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Reports and Insights</Text>
//       <Text style={styles.text}>• Overall Sales Trends</Text>
//       <Text style={styles.text}>• Highest Selling Products</Text>
//       <Text style={styles.text}>• Franchise-wise Revenue</Text>
//     </View>
//   );
// };

// export default ReportsScreen;

// const styles = StyleSheet.create({
//   container: { flex: 1, padding: 20, backgroundColor: '#e0f7fa' },
//   title: { fontSize: 24, fontWeight: 'bold', color: '#ff7043', marginBottom: 12 },
//   text: { fontSize: 16, marginVertical: 6, color: '#5d4037' },
// });


import React, { useState } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, ScrollView
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Menu, Provider } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation, DrawerActions } from '@react-navigation/native';
import FranchisorHeader from '../../components/Franchisor/FranchisorHeader'; 

export default function ReportsScreen() {
  const [menuVisible, setMenuVisible] = useState(false);
  const navigation = useNavigation();
  const userName = "Abhinay";

  const openMenu = () => setMenuVisible(true);
  const closeMenu = () => setMenuVisible(false);

  return (
    <Provider>
      <SafeAreaView style={styles.safeArea}>
        {/* Header */}
        <FranchisorHeader title="Reports" />

        {/* Content */}
        <ScrollView contentContainerStyle={styles.container}>
          <Text style={styles.sectionTitle}>Reports and Insights</Text>
          <Text style={styles.text}>• Overall Sales Trends</Text>
          <Text style={styles.text}>• Highest Selling Products</Text>
          <Text style={styles.text}>• Franchise-wise Revenue</Text>
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
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ff7043',
    marginBottom: 12,
  },
  text: {
    fontSize: 16,
    marginVertical: 6,
    color: '#5d4037',
  },
});

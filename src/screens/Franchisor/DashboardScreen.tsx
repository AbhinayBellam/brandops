// src/screens/Franchisor/DashboardScreen.tsx
import React, { useLayoutEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { DrawerActions } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { FranchisorStackParamList } from '../../navigation/FranchisorNavigator';

const franchises = [
  { id: '1', name: 'Franchise A', sales: 125000 },
  { id: '2', name: 'Franchise B', sales: 97000 },
  { id: '3', name: 'Franchise C', sales: 147000 },
];

const salesByMonth = [
  { month: 'January', total: 320000 },
  { month: 'February', total: 280000 },
  { month: 'March', total: 350000 },
];

const stockLevels = [
  { franchise: 'Franchise A', items: 120 },
  { franchise: 'Franchise B', items: 87 },
  { franchise: 'Franchise C', items: 143 },
];

const DashboardScreen: React.FC = () => {
  const navigation = useNavigation<NativeStackNavigationProp<FranchisorStackParamList>>();

 useLayoutEffect(() => {
  navigation.setOptions({
    headerLeft: () => (
      <TouchableOpacity onPress={() => navigation.getParent()?.dispatch(DrawerActions.toggleDrawer())} style={{ marginLeft: 16 }}>
        <Ionicons name="menu" size={24} color="black" />
      </TouchableOpacity>
    ),
    title: 'Franchisor Dashboard',
  });
}, [navigation]);


  const navigateToSalesDetail = (franchiseId: string) => {
    navigation.navigate('FranchiseSalesDetail', { franchiseId });
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.heading}>Sales by Franchise</Text>
      {franchises.map((f) => (
        <TouchableOpacity key={f.id} onPress={() => navigateToSalesDetail(f.id)} style={styles.cardCoral}>
          <Text style={styles.cardText}>{f.name}</Text>
          <Text style={styles.cardValue}>₹{f.sales.toLocaleString()}</Text>
        </TouchableOpacity>
      ))}

      <Text style={styles.heading}>Sales by Month</Text>
      {salesByMonth.map((s, index) => (
        <View key={index} style={styles.cardWood}>
          <Text style={styles.cardText}>{s.month}</Text>
          <Text style={styles.cardValue}>₹{s.total.toLocaleString()}</Text>
        </View>
      ))}

      <Text style={styles.heading}>Stock Levels in Each Franchise</Text>
      {stockLevels.map((s, index) => (
        <View key={index} style={styles.cardBlue}>
          <Text style={styles.cardText}>{s.franchise}</Text>
          <Text style={styles.cardValue}>{s.items} items</Text>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f8f8f8',
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 12,
    color: '#333',
  },
  cardCoral: {
    backgroundColor: '#FF7F50',
    padding: 16,
    borderRadius: 12,
    marginBottom: 10,
  },
  cardWood: {
    backgroundColor: '#DEB887',
    padding: 16,
    borderRadius: 12,
    marginBottom: 10,
  },
  cardBlue: {
    backgroundColor: '#ADD8E6',
    padding: 16,
    borderRadius: 12,
    marginBottom: 10,
  },
  cardText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
  },
  cardValue: {
    fontSize: 14,
    color: '#fff',
    marginTop: 4,
  },
});

export default DashboardScreen;
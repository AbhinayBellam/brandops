// src/screens/Franchisor/FranchiseSalesDetailScreen.tsx

import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';

// Mock sales data
const salesData = {
  daily: [
    { date: '2025-06-01', total: 12000 },
    { date: '2025-06-02', total: 9800 },
    { date: '2025-06-03', total: 11500 },
  ],
  monthly: [
    { month: 'April', total: 300000 },
    { month: 'May', total: 350000 },
    { month: 'June', total: 120000 },
  ],
  yearly: [
    { year: '2023', total: 3200000 },
    { year: '2024', total: 4050000 },
    { year: '2025', total: 1680000 },
  ],
};

type ParamList = {
  FranchiseSalesDetail: {
    franchiseId: string;
  };
};

const FranchiseSalesDetailScreen: React.FC = () => {
  const route = useRoute<RouteProp<ParamList, 'FranchiseSalesDetail'>>();
  const { franchiseId } = route.params;

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.heading}>Franchise Sales Detail</Text>
      <Text style={styles.subheading}>Franchise ID: {franchiseId}</Text>

      <Text style={styles.sectionTitle}>Daily Sales</Text>
      {salesData.daily.map((s, index) => (
        <View key={index} style={styles.cardCoral}>
          <Text style={styles.cardText}>{s.date}</Text>
          <Text style={styles.cardValue}>₹{s.total.toLocaleString()}</Text>
        </View>
      ))}

      <Text style={styles.sectionTitle}>Monthly Sales</Text>
      {salesData.monthly.map((s, index) => (
        <View key={index} style={styles.cardWood}>
          <Text style={styles.cardText}>{s.month}</Text>
          <Text style={styles.cardValue}>₹{s.total.toLocaleString()}</Text>
        </View>
      ))}

      <Text style={styles.sectionTitle}>Yearly Sales</Text>
      {salesData.yearly.map((s, index) => (
        <View key={index} style={styles.cardBlue}>
          <Text style={styles.cardText}>{s.year}</Text>
          <Text style={styles.cardValue}>₹{s.total.toLocaleString()}</Text>
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
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 4,
    color: '#333',
  },
  subheading: {
    fontSize: 16,
    color: '#666',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 16,
    marginBottom: 8,
    color: '#333',
  },
  cardCoral: {
    backgroundColor: '#FF7F50',
    padding: 14,
    borderRadius: 10,
    marginBottom: 8,
  },
  cardWood: {
    backgroundColor: '#DEB887',
    padding: 14,
    borderRadius: 10,
    marginBottom: 8,
  },
  cardBlue: {
    backgroundColor: '#ADD8E6',
    padding: 14,
    borderRadius: 10,
    marginBottom: 8,
  },
  cardText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: '600',
  },
  cardValue: {
    fontSize: 14,
    color: '#fff',
    marginTop: 4,
  },
});

export default FranchiseSalesDetailScreen;

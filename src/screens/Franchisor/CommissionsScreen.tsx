import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const commissions = [
  { franchise: 'Hyderabad', rate: '10%', month: 'May', total: '₹5000' },
  { franchise: 'Mumbai', rate: '8%', month: 'May', total: '₹4200' },
];

const CommissionsScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Commissions</Text>
      {commissions.map((item, index) => (
        <View style={styles.card} key={index}>
          <Text>Franchise: {item.franchise}</Text>
          <Text>Rate: {item.rate}</Text>
          <Text>Month: {item.month}</Text>
          <Text>Total: {item.total}</Text>
        </View>
      ))}
    </View>
  );
};

export default CommissionsScreen;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#e0f7fa' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 16, color: '#ff7043' },
  card: {
    backgroundColor: '#fff8dc',
    padding: 14,
    borderRadius: 10,
    marginVertical: 8,
  },
});

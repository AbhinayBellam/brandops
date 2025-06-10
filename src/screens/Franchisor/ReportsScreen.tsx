import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ReportsScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Reports and Insights</Text>
      <Text style={styles.text}>• Overall Sales Trends</Text>
      <Text style={styles.text}>• Highest Selling Products</Text>
      <Text style={styles.text}>• Franchise-wise Revenue</Text>
    </View>
  );
};

export default ReportsScreen;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#e0f7fa' },
  title: { fontSize: 24, fontWeight: 'bold', color: '#ff7043', marginBottom: 12 },
  text: { fontSize: 16, marginVertical: 6, color: '#5d4037' },
});

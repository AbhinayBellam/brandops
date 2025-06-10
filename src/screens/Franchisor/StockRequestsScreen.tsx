import React from 'react';
import { View, Text, FlatList, Button, StyleSheet } from 'react-native';

const stockRequests = [
  { id: '1', franchise: 'Hyderabad', product: 'Coffee Beans', quantity: 20 },
  { id: '2', franchise: 'Mumbai', product: 'Tea Powder', quantity: 15 },
];

const StockRequestsScreen = () => {
  const handleApprove = (id: string) => {};
  const handleReject = (id: string) => {};

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Stock Requests</Text>
      <FlatList
        data={stockRequests}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text>{item.franchise}: {item.product} - {item.quantity}</Text>
            <View style={styles.actions}>
              <Button title="Approve" onPress={() => handleApprove(item.id)} color="#28a745" />
              <Button title="Reject" onPress={() => handleReject(item.id)} color="#dc3545" />
            </View>
          </View>
        )}
      />
    </View>
  );
};

export default StockRequestsScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#e0f7fa', padding: 20 },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 16, color: '#ff7043' },
  card: {
    backgroundColor: '#fff8dc',
    padding: 12,
    borderRadius: 10,
    marginBottom: 10,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
});

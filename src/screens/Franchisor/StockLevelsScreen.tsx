// screens/Franchisor/StockLevelsScreen.tsx
import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';

const stockData = [
  { id: '1', franchise: 'Franchise A', product: 'Product A', quantity: 10 },
  { id: '2', franchise: 'Franchise A', product: 'Product B', quantity: 5 },
  { id: '3', franchise: 'Franchise B', product: 'Product A', quantity: 15 },
];

export default function StockLevelsScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Stock Levels</Text>
      <FlatList
        data={stockData}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.row}>
            <Text style={styles.cell}>{item.franchise}</Text>
            <Text style={styles.cell}>{item.product}</Text>
            <Text style={styles.cell}>Qty: {item.quantity}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#E6F7FF', padding: 16 },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 12, color: '#FF7F50' },
  row: { flexDirection: 'row', justifyContent: 'space-between', backgroundColor: '#FFF2E5', padding: 12, borderRadius: 8, marginVertical: 6 },
  cell: { fontSize: 16 },
});


// screens/Franchisor/FranchisesScreen.tsx
import React, { useState } from 'react';
import { View, Text, FlatList, Button, StyleSheet } from 'react-native';

const initialFranchises = [
  { id: '1', name: 'Franchise A', region: 'North' },
  { id: '2', name: 'Franchise B', region: 'South' },
];

export default function FranchisesScreen() {
  const [franchises, setFranchises] = useState(initialFranchises);

  const deleteFranchise = (id: string) => {
    setFranchises(prev => prev.filter(f => f.id !== id));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>All Franchises</Text>
      <FlatList
        data={franchises}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.name}>{item.name} - {item.region}</Text>
            <Button title="Delete" color="#F44336" onPress={() => deleteFranchise(item.id)} />
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#E6F7FF' },
  title: { fontSize: 22, fontWeight: 'bold', color: '#FF7F50', marginBottom: 12 },
  card: { backgroundColor: '#FFF2E5', padding: 16, borderRadius: 10, marginBottom: 10 },
  name: { fontSize: 18, fontWeight: '600' },
});
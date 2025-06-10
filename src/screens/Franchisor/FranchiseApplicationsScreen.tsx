// screens/Franchisor/FranchiseApplicationsScreen.tsx
import React, { useState } from 'react';
import { View, Text, Button, FlatList, StyleSheet } from 'react-native';

const applications = [
  { id: '1', name: 'Franchise A', region: 'North', status: 'pending' },
  { id: '2', name: 'Franchise B', region: 'South', status: 'pending' },
];

export default function FranchiseApplicationsScreen() {
  const [appList, setAppList] = useState(applications);

  const handleAction = (id: string, action: 'approved' | 'rejected') => {
    setAppList(prev =>
      prev.map(app =>
        app.id === id ? { ...app, status: action } : app
      )
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Franchise Applications</Text>
      <FlatList
        data={appList}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.name}>{item.name} - {item.region}</Text>
            <Text>Status: {item.status}</Text>
            {item.status === 'pending' && (
              <View style={styles.actions}>
                <Button title="Approve" color="#4CAF50" onPress={() => handleAction(item.id, 'approved')} />
                <Button title="Reject" color="#F44336" onPress={() => handleAction(item.id, 'rejected')} />
              </View>
            )}
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#E6F7FF' },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 10, color: '#FF7F50' },
  card: { padding: 16, backgroundColor: '#FFF2E5', marginVertical: 8, borderRadius: 10 },
  name: { fontSize: 18, fontWeight: '600' },
  actions: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 },
});
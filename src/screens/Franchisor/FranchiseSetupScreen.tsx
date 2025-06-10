// screens/Franchisor/FranchiseSetupScreen.tsx
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

export default function FranchiseSetupScreen() {
  const [commission, setCommission] = useState('');

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Franchise Setup</Text>

      <Text style={styles.label}>Allowed Products:</Text>
      <Text>Product A, Product B</Text>

      <Text style={styles.label}>Stock Levels:</Text>
      <Text>Product A - 20 units</Text>
      <Text>Product B - 10 units</Text>

      <Text style={styles.label}>Commission Rate (%)</Text>
      <TextInput
        value={commission}
        onChangeText={setCommission}
        placeholder="Enter commission"
        keyboardType="numeric"
        style={styles.input}
      />
      <Button title="Save Setup" onPress={() => {}} color="#FF7F50" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#E6F7FF' },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 16, color: '#FF7F50' },
  label: { marginTop: 12, fontWeight: '600' },
  input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 6, padding: 10, backgroundColor: '#FFF2E5', marginVertical: 10 },
});
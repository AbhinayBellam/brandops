import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text } from 'react-native';

const EditProductScreen = () => {
  const [name, setName] = useState('Coffee Beans');
  const [desc, setDesc] = useState('Premium Quality');
  const [price, setPrice] = useState('299');

  const handleUpdate = () => {};

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Edit Product</Text>
      <TextInput style={styles.input} value={name} onChangeText={setName} placeholder="Product Name" />
      <TextInput style={styles.input} value={desc} onChangeText={setDesc} placeholder="Description" />
      <TextInput style={styles.input} value={price} onChangeText={setPrice} placeholder="Price" keyboardType="numeric" />
      <Button title="Update" onPress={handleUpdate} color="#ff7043" />
    </View>
  );
};

export default EditProductScreen;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#e0f7fa' },
  title: { fontSize: 22, fontWeight: 'bold', color: '#ff7043', marginBottom: 16 },
  input: {
    backgroundColor: '#fff8dc',
    padding: 10,
    marginBottom: 10,
    borderRadius: 10,
  },
});

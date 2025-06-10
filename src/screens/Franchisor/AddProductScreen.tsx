import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text, ScrollView } from 'react-native';

const AddProductScreen: React.FC = () => {
  const [product, setProduct] = useState({
    name: '',
    description: '',
    price: '',
    image: '',
  });

  const handleChange = (key: keyof typeof product, value: string) => {
    setProduct({ ...product, [key]: value });
  };

  const handleSubmit = () => {
    console.log('Product submitted:', product);
    // Submit to backend logic here
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.heading}>Add New Product</Text>
      <TextInput
        style={styles.input}
        placeholder="Product Name"
        value={product.name}
        onChangeText={(text) => handleChange('name', text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Description"
        value={product.description}
        onChangeText={(text) => handleChange('description', text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Price"
        keyboardType="numeric"
        value={product.price}
        onChangeText={(text) => handleChange('price', text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Image URL"
        value={product.image}
        onChangeText={(text) => handleChange('image', text)}
      />
      <Button title="Add Product" onPress={handleSubmit} color="#ADD8E6" />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#F0F0F0',
  },
  heading: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
    borderRadius: 8,
    backgroundColor: '#fff',
  },
});

export default AddProductScreen;
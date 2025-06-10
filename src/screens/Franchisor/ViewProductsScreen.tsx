import React from 'react';
import { View, Text, FlatList, StyleSheet, Button, Image } from 'react-native';

const products = [
  { id: '1', name: 'Product A', price: 100, image: 'https://via.placeholder.com/60', description: 'Great product A' },
  { id: '2', name: 'Product B', price: 150, image: 'https://via.placeholder.com/60', description: 'Nice product B' },
];

const ViewProductsScreen: React.FC = () => {
  const handleEdit = (id: string) => {
    // Navigation or logic here
  };

  const handleDelete = (id: string) => {
    // Delete logic here
  };

  return (
    <FlatList
      style={styles.container}
      data={products}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <View style={styles.card}>
          <Image source={{ uri: item.image }} style={styles.image} />
          <View style={styles.details}>
            <Text style={styles.name}>{item.name}</Text>
            <Text>₹{item.price}</Text>
            <Text>{item.description}</Text>
            <View style={styles.buttons}>
              <Button title="Edit" onPress={() => handleEdit(item.id)} color="#DEB887" />
              <Button title="Delete" onPress={() => handleDelete(item.id)} color="#FF7F50" />
            </View>
          </View>
        </View>
      )}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: '#F8F8F8',
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    marginBottom: 10,
    borderRadius: 10,
    overflow: 'hidden',
    elevation: 2,
  },
  image: {
    width: 60,
    height: 60,
    margin: 10,
  },
  details: {
    flex: 1,
    padding: 10,
  },
  name: {
    fontWeight: 'bold',
    color: '#333',
  },
  buttons: {
    flexDirection: 'row',
    marginTop: 10,
    justifyContent: 'space-between',
    width: '70%',
  },
});

export default ViewProductsScreen;
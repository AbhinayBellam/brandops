import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import FranchisorHeader from '../../components/Franchisor/FranchisorHeader';



interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  category: string;
} 
 interface ProductDetailsScreenProps {
  product: Product;
}

const ProductDetailsScreen = () => {
const route = useRoute();
const product = (route as any)?.params?.product;

if (!product) {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>

    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Product details not available</Text>
    </View>
    </SafeAreaView>
  );
}


// Map category to local image asset
const categoryImages: Record<string, any> = {
  electronics: require('../../assets/products/electronics.jpg'),
  clothing: require('../../assets/products/clothing.jpg'),
  books: require('../../assets/products/books.jpg'),
  // Add more categories here
  default: require('../../assets/products/default.jpg'),
};

const normalizedCategory = product.category?.toLowerCase().trim();
const productImage = categoryImages[normalizedCategory] || categoryImages.default;


  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <FranchisorHeader title="Product Details" />
    <ScrollView contentContainerStyle={styles.container}>

      {/* Product Image */}
      <Image source={productImage} style={styles.image} resizeMode="cover" />

      {/* Product Info */}
      <View style={styles.infoContainer}>
        <Text style={styles.title}>{product.name}</Text>
        <Text style={styles.category}>{product.category}</Text>
        <Text style={styles.price}>₹ {product.price?.toFixed(2)}</Text>
        <Text style={styles.description}>{product.description || 'No description available.'}</Text>

        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Add to Cart</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
    </SafeAreaView>
  );
};

export default ProductDetailsScreen;

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#fff',
    flexGrow: 1,
  },
  image: {
    width: '100%',
    height: 250,
    borderRadius: 10,
    backgroundColor: '#f2f2f2',
  },
  infoContainer: {
    marginTop: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#222',
  },
  category: {
    fontSize: 14,
    color: '#888',
    marginVertical: 4,
  },
  price: {
    fontSize: 20,
    fontWeight: '600',
    color: '#009688',
    marginVertical: 8,
  },
  description: {
    fontSize: 16,
    lineHeight: 22,
    color: '#444',
    marginVertical: 12,
  },
  button: {
    backgroundColor: '#009688',
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 16,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';

interface Product {
  _id: string;
  name: string;
  price: number;
  description: string;
  category: string;
}

interface ProductCardProps {
  product: Product;
  quantity?: number;
  onPress?: () => void;
  onQuickAdd?: () => void;
  loading?: boolean;
}

const categoryImages: Record<string, any> = {
  electronics: require('../../assets/products/electronics.jpg'),
  clothing: require('../../assets/products/clothing.jpg'),
  books: require('../../assets/products/books.jpg'),
  default: require('../../assets/products/default.jpg'),
};

const ProductCard: React.FC<ProductCardProps> = ({
  product,
  quantity,
  onPress,
  onQuickAdd,
  loading = false,
}) => {
  const productImage =
    categoryImages[product.category?.toLowerCase()] || categoryImages.default;

  return (
    <View style={styles.card}>
      <TouchableOpacity onPress={onPress} activeOpacity={0.9}>
        <Image source={productImage} style={styles.image} resizeMode="cover" />
        <Text style={styles.name}>{product.name}</Text>
        <Text style={styles.price}>₹{product.price.toFixed(2)}</Text>
        <Text style={styles.description} numberOfLines={2}>
          {product.description}
        </Text>
        <Text style={styles.category}>Category: {product.category}</Text>
        {typeof quantity === 'number' && (
          <Text style={styles.quantity}>Quantity: {quantity}</Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={onQuickAdd}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#fff" size="small" />
        ) : (
          <Text style={styles.buttonText}>+ Add to Stock</Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    width: '47%',
    backgroundColor: '#fff',
    borderRadius: 12,
    marginVertical: 8,
    marginHorizontal: 6,
    padding: 10,
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
  },
  image: {
    width: '100%',
    height: 120,
    borderRadius: 8,
    marginBottom: 10,
  },
  name: { fontSize: 16, fontWeight: '700', marginBottom: 4, color: '#333' },
  price: { fontSize: 14, fontWeight: '600', color: '#4CAF50', marginBottom: 4 },
  description: { fontSize: 12, color: '#666', marginBottom: 8 },
  category: { fontSize: 12, color: '#888', marginBottom: 8 },
  quantity: { fontSize: 14, fontWeight: 'bold', color: '#d32f2f', marginBottom: 4 },
  button: {
    backgroundColor: '#4CAF50',
    paddingVertical: 8,
    borderRadius: 6,
    alignItems: 'center',
    marginTop: 8,
  },
  buttonText: { color: '#fff', fontWeight: '600' },
});

export default ProductCard;

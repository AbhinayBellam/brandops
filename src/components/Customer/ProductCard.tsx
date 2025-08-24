

import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Alert
} from 'react-native';
import { colors } from '../../utils/colors';
import { addProductToCart } from "../../services/cartService";

interface Product {
  _id: string;
  name: string;
  price: number;
  description: string;
  category: string;
}

interface ProductCardProps {
  product: Product;
  franchiseId: string;
  quantity?: number;
  onAddToCart?: () => void;
  onViewCart?: () => void;
  onPress?: () => void;
}

const categoryImages: Record<string, any> = {
  electronics: require('../../assets/products/electronics.jpg'),
  clothing: require('../../assets/products/clothing.jpg'),
  books: require('../../assets/products/books.jpg'),
  default: require('../../assets/products/default.jpg'),
};

const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onAddToCart,
  quantity = 0,
  onViewCart,
  onPress,
}) => {

  const normalizedCategory = product.category?.toLowerCase().trim() || '';
const productImage = categoryImages[normalizedCategory] || categoryImages.default;

  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.9}>
      <Image source={productImage} style={styles.image} resizeMode="cover" />
      <Text style={styles.name}>{product.name}</Text>
      <Text style={styles.price}>₹{product.price.toFixed(2)}</Text>
      <Text style={styles.description} numberOfLines={2}>
        {product.description}
      </Text>
      <Text style={styles.category}>
        Category: {product.category}
      </Text>

      {quantity > 0 ? (
        <>
          {/* View Cart Button */}
          <TouchableOpacity style={styles.viewCartButton} onPress={onViewCart}>
            <Text style={styles.viewCartText}>View Cart</Text>
          </TouchableOpacity>
        </>
      ) : (
        // Add to Cart Button (when quantity is 0)
        <TouchableOpacity style={styles.button} onPress={onAddToCart}>
          <Text style={styles.buttonText}>Add to Cart</Text>
        </TouchableOpacity>
      )}
    </TouchableOpacity>
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
  name: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 4,
    color: '#333',
  },
  price: {
    fontSize: 14,
    fontWeight: '600',
    color: '#4CAF50',
    marginBottom: 4,
  },
  description: {
    fontSize: 12,
    color: '#666',
    marginBottom: 8,
  },
  button: {
    backgroundColor: colors.primary,
    paddingVertical: 8,
    borderRadius: 6,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 6,
  },
  quantityButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#eee',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 8,
  },
  quantityText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#333',
  },
  quantityNumber: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  viewCartButton: {
    backgroundColor: colors.secondary,
    paddingVertical: 8,
    borderRadius: 6,
    alignItems: 'center',
    marginTop: 6,
  },
  viewCartText: {
    color: '#fff',
    fontWeight: '600',
  },
  category: {
    fontSize: 12,
    color: '#888',
    marginBottom: 8,
  },
});

export default ProductCard;

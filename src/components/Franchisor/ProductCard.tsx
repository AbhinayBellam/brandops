import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { colors } from '../../utils/colors';

interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  category: string;
}

interface ProductCardProps {
  product: Product;
  onPress?: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
  
}

// Map category to local image asset
const categoryImages: Record<string, any> = {
  electronics: require('../../assets/products/electronics.jpg'),
  clothing: require('../../assets/products/clothing.jpg'),
  books: require('../../assets/products/books.jpg'),
  // Add more categories here
  default: require('../../assets/products/default.jpg'),
};


const ProductCard: React.FC<ProductCardProps> = ({ product, onPress, onEdit, onDelete,  }) => {
  // Default image for all categories
  const productImage = categoryImages[product.category?.toLowerCase()] || categoryImages.default;

  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.9}>
      <Image source={productImage} style={styles.image} resizeMode="cover" />

      <View style={styles.info}>
        <Text style={styles.name}>{product.name}</Text>
        <Text style={styles.description} numberOfLines={2}>{product.description}</Text>
        <Text style={styles.price}>₹{product.price}</Text>
      </View>

      {(onEdit || onDelete) && (
        <View style={styles.actions}>
          {onEdit && (
            <TouchableOpacity onPress={onEdit} style={styles.editBtn}>
              <Text style={styles.btnText}>Edit</Text>
            </TouchableOpacity>
          )}
          {onDelete && (
            <TouchableOpacity onPress={onDelete} style={styles.deleteBtn}>
              <Text style={styles.btnText}>Delete</Text>
            </TouchableOpacity>
          )}
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 12,
    margin: 8,
    padding: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 3,
  },
  image: {
    width: '100%',
    height: 120,
    borderRadius: 8,
  },
  info: {
    marginTop: 8,
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  description: {
    fontSize: 13,
    color: '#666',
    marginVertical: 4,
  },
  price: {
    fontSize: 14,
    color: '#4CAF50',
    fontWeight: 'bold',
  },
  actions: {
    flexDirection: 'row',
    marginTop: 10,
    justifyContent: 'space-between',
  },
  editBtn: {
    backgroundColor: colors.background,
    borderColor: colors.primary,
    borderWidth: 3,
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 6,
  },
  deleteBtn: {
    backgroundColor: colors.background,
    borderColor: colors.primary1,
    borderWidth: 3,
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 6,
  },
  btnText: {
    color: colors.text,
    fontWeight: 'bold',
    fontSize: 13,
  },
});

export default ProductCard;

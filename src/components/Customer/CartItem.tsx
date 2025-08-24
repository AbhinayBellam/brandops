import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

interface CartItemProps {
  item: {
    id: string;
    name: string;
    image: string;
    price: number;
    quantity: number;
  };
  onIncrease?: () => void;
  onDecrease?: () => void;
  onRemove?: () => void;
}

const CartItem: React.FC<CartItemProps> = ({ item, onIncrease, onDecrease, onRemove }) => {
  return (
    <View style={styles.itemContainer}>
      <Image source={{ uri: item.image }} style={styles.image} />
      <View style={styles.details}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.price}>₹{item.price}</Text>
        <View style={styles.controls}>
         <TouchableOpacity onPress={onDecrease} style={styles.controlButton}>
            <Icon name="minus" size={18} />
         </TouchableOpacity>
       <Text style={styles.quantity}>{item.quantity}</Text>
       <TouchableOpacity onPress={onIncrease} style={styles.controlButton}>
         <Icon name="plus" size={18} />
       </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={onRemove}>
          <Text style={styles.removeText}>Remove</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: 'row',
    marginVertical: 10,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 8,
    elevation: 2,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 8,
  },
  details: {
    flex: 1,
    marginLeft: 12,
  },
  name: {
    fontWeight: '600',
    fontSize: 16,
  },
  price: {
    marginTop: 4,
    color: '#555',
  },
  controls: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  controlButton: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    backgroundColor: '#eee',
    borderRadius: 4,
  },
  quantity: {
    marginHorizontal: 10,
    fontSize: 16,
  },
  removeText: {
    color: '#d00',
    marginTop: 8,
  },
    controlText: {
    fontSize: 18,
    fontWeight: '600',
  },

});

export default CartItem;

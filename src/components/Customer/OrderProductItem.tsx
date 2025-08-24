
import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

interface OrderProductItemProps {
  name: string;
  quantity: number;
  price: number;
}

const OrderProductItem: React.FC<OrderProductItemProps> = ({ name, quantity, price, }) => {
  return (
    <View style={styles.container}>
      
      <View style={styles.details}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.qty}>Qty: {quantity}</Text>
        <Text style={styles.price}>₹{price * quantity}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: 10,
    marginBottom: 10,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 6,
    marginRight: 10,
  },
  details: {
    justifyContent: 'center',
  },
  name: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#555',
  },
  qty: {
    color: '#555',
    marginTop: 4,
  },
  price: {
    color: '#27ae60',
    marginTop: 4,
    fontWeight: 'bold',
  },
});

export default OrderProductItem;

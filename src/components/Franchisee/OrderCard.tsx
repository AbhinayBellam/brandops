// components/Order/OrderCard.tsx
import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import OrderProductItem from '../Customer/OrderProductItem';

interface OrderCardProps {
  order: any;
  onStatusChange: (orderId: string, newStatus: string) => void;
}

const statusOptions = ['Pending', 'Processing', 'Shipped', 'Delivered'];

const OrderCard: React.FC<OrderCardProps> = ({ order, onStatusChange }) => {
  return (
    <View style={styles.card}>
      <Text style={styles.orderId}>Order: {order._id.slice(-7)}</Text>
      <FlatList
        data={order.items}
        keyExtractor={(item) => item.productId._id}
        renderItem={({ item }) => (
          <OrderProductItem
            name={item.productId.name}
            price={item.price}
            quantity={item.quantity}
          />
        )}
      />
      <View style={styles.statusContainer}>
        <Text style={styles.label}>Status:</Text>
        <Picker
          selectedValue={order.status}
          style={styles.picker}
          onValueChange={(value) => onStatusChange(order._id, value)}
        >
          {statusOptions.map((status) => (
            <Picker.Item key={status} label={status} value={status} />
          ))}
        </Picker>
      </View>
    </View>
  );
};

export default OrderCard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#f8f8f8',
    padding: 14,
    borderRadius: 10,
    marginBottom: 16,
    elevation: 2,
  },
  orderId: {
    fontWeight: 'bold',
    marginBottom: 10,
    fontSize: 15,
  },
  statusContainer: {
    marginTop: 10,
  },
  label: {
    fontWeight: '600',
    marginBottom: 4,
  },
  picker: {
    backgroundColor: '#fff',
  },
});

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

interface OrderCardProps {
  orderId: string;
  date: string;
  status: string;
  total: number;
  onPress?: () => void;
}

const OrderCard = ({ orderId, date, status, total, onPress }: OrderCardProps) => {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <View style={styles.row}>
        <Text style={styles.label}>Order ID:</Text>
        <Text style={styles.value}>#{orderId}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Date:</Text>
        <Text style={styles.value}>{date}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Status:</Text>
        <Text style={styles.value}>{status}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Total:</Text>
        <Text style={styles.value}>₹{total}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: 16,
    marginVertical: 8,
    backgroundColor: '#fff',
    borderRadius: 10,
    elevation: 2,
    margin : 12,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  label: {
    fontWeight: 'bold',
    color: '#333',
  },
  value: {
    color: '#555',
  },
  pending: {
    color: '#e67e22',
  },
  shipped: {
    color: '#2980b9',
  },
  delivered: {
    color: '#27ae60',
  },
  cancelled: {
    color: '#c0392b',
  },
});

export default OrderCard;


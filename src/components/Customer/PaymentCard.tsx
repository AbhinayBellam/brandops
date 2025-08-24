import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface PaymentCardProps {
  orderId: string;
  amount: number;
  date: string;
  method: string;
  status: string;
}

const PaymentCard: React.FC<PaymentCardProps> = ({ orderId, amount, date, method, status }) => {
  return (
    <View style={styles.card}>
      <Text style={styles.label}>Order ID: #{orderId}</Text>
      <Text style={styles.label}>Amount: ₹{amount}</Text>
      <Text style={styles.label}>Date: {date}</Text>
      <Text style={styles.label}>Method: {method}</Text>
      <Text style={[styles.status, { color: status === 'Success' ? 'green' : 'red' }]}>Status: {status}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: 14,
    backgroundColor: '#fff',
    borderRadius: 8,
    marginVertical: 8,
    elevation: 2,
  },
  label: {
    fontSize: 14,
    marginBottom: 4,
    color: '#333',
  },
  status: {
    marginTop: 6,
    fontWeight: 'bold',
  },
});

export default PaymentCard;
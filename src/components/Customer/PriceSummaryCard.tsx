import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface PriceSummaryCardProps {
  subtotal: number;
  deliveryCharge: number;
  discount: number;
  total: number;
}

const PriceSummaryCard: React.FC<PriceSummaryCardProps> = ({ subtotal, deliveryCharge, discount, total }) => {
  return (
    <View style={styles.card}>
      <Row label="Subtotal" value={`₹${subtotal}`} />
      <Row label="Delivery" value={`₹${deliveryCharge}`} />
      <Row label="Discount" value={`-₹${discount}`} />
      <View style={styles.divider} />
      <Row label="Total" value={`₹${total}`} bold />
    </View>
  );
};

interface RowProps {
  label: string;
  value: string;
  bold?: boolean;
}

const Row: React.FC<RowProps> = ({ label, value, bold = false }) => (
  <View style={styles.row}>
    <Text style={[styles.label, bold && styles.bold]}>{label}</Text>
    <Text style={[styles.value, bold && styles.bold]}>{value}</Text>
  </View>
);

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 10,
    elevation: 2,
    marginTop: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 4,
  },
  label: {
    fontSize: 14,
    color: '#333',
  },
  value: {
    fontSize: 14,
    color: '#333',
  },
  bold: {
    fontWeight: 'bold',
  },
  divider: {
    height: 1,
    backgroundColor: '#ccc',
    marginVertical: 8,
  },
});

export default PriceSummaryCard;
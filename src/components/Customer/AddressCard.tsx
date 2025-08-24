import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

interface AddressCardProps {
  name: string;
  phone: string;
  address: string;
  onEdit?: () => void;
}

const AddressCard: React.FC<AddressCardProps> = ({ name, phone, address, onEdit }) => {
  return (
    <View style={styles.card}>
      <Text style={styles.name}>{name}</Text>
      <Text style={styles.phone}>{phone}</Text>
      <Text style={styles.address}>{address}</Text>
      {onEdit && (
        <TouchableOpacity onPress={onEdit}>
          <Text style={styles.edit}>Edit</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 10,
    elevation: 2,
    marginVertical: 10,
  },
  name: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  phone: {
    marginTop: 4,
    fontSize: 14,
  },
  address: {
    marginTop: 6,
    fontSize: 14,
    color: '#555',
  },
  edit: {
    color: '#007bff',
    marginTop: 8,
    fontWeight: 'bold',
  },
});

export default AddressCard;
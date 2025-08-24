import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Franchise } from '../../types/franchise';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

interface Props {
  franchise: Franchise;
  onDelete: (id: string) => void;
  onEdit: (id: string) => void;
}

const FranchiseCard: React.FC<Props> = ({ franchise, onDelete, onEdit }) => {
  const { _id, name,region, address, commissionRate, franchiseeId } = franchise;

  const formatAddress = (addr: any) => {
  if (!addr) return '';
  return `${addr.street}, ${addr.city}, ${addr.state}, ${addr.zipCode}, ${addr.country}`;
};


  return (
    <View style={styles.card}>
      <Text style={styles.title}>{name}</Text>
      <Text>Franchisee: {franchiseeId?.name}</Text>
      <Text>Email: {franchiseeId?.email}</Text>
      <Text>Phone: {franchiseeId?.phone}</Text>
      <Text>Address: {formatAddress(address)}</Text>
      <Text>Region: {region}</Text>
      <Text>Commission Rate: {commissionRate}%</Text>

      <View style={styles.actions}>
        <TouchableOpacity onPress={() => onEdit(_id)}>
          <Icon name="pencil" size={20} color="blue" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => onDelete(_id)}>
          <Icon name="delete" size={20} color="red" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginVertical: 8,
    elevation: 3,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 4,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 20,
    marginTop: 10,
  },
});

export default FranchiseCard;

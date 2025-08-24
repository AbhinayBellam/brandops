// components/FranchiseApplicationCard.tsx
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet, Alert } from 'react-native';
import { approveApplication, rejectApplication, createFranchise } from '../../services/franchisorService';

interface Props {
  item: any;
  onRefresh: () => void;
}

const FranchiseApplicationCard = ({ item, onRefresh }: Props) => {
  const [commission, setCommission] = useState('');
  const [franchiseName, setFranchiseName] = useState('');

  const handleApprove = async () => {
    try {
      await approveApplication(item._id);
      Alert.alert('Approved', 'Now set commission and create franchise.');
      onRefresh();
    } catch {
      Alert.alert('Error', 'Failed to approve application.');
    }
  };

  const handleReject = async () => {
    try {
      await rejectApplication(item._id);
      Alert.alert('Rejected', 'Application has been rejected.');
      onRefresh();
    } catch {
      Alert.alert('Error', 'Failed to reject application.');
    }
  };

  const handleCreateFranchise = async () => {
    const rate = parseFloat(commission);

    if (!franchiseName || isNaN(rate)) {
      return Alert.alert('Validation Error', 'Enter name and valid commission rate');
    }

    try {
      await createFranchise(item._id, franchiseName, rate);
      Alert.alert('Success', 'Franchise created successfully');
      setCommission('');
      setFranchiseName('');
      onRefresh();
    } catch {
      Alert.alert('Error', 'Failed to create franchise.');
    }
  };

  return (
    <View style={styles.card}>
      <Text style={styles.region}>{item.region} - {item.status}</Text>
      <Text>Name: {item?.franchisee?.name}</Text>
      <Text>Email: {item?.franchisee?.email}</Text>
      <Text>Phone: {item?.franchisee?.phone}</Text>
      <Text>Address: {item.address?.street}, {item.address?.city}, {item.address?.state}</Text>
      <Text>Country: {item.address?.country}</Text>
      <Text>Pincode: {item.address?.zipCode}</Text>

      {item.status === 'Pending' && (
        <View style={styles.buttonRow}>
          <TouchableOpacity onPress={handleApprove}><Text style={styles.approve}>Approve</Text></TouchableOpacity>
          <TouchableOpacity onPress={handleReject}><Text style={styles.reject}> Reject</Text></TouchableOpacity>
        </View>
      )}

      {item.status === 'Approved' && (
        <View style={{ marginTop: 10 }}>
          <TextInput
            placeholder="Franchise Name"
            value={franchiseName}
            onChangeText={setFranchiseName}
            style={styles.input}
          />
          <TextInput
            placeholder="Commission Rate (%)"
            keyboardType="numeric"
            value={commission}
            onChangeText={setCommission}
            style={styles.input}
          />
          <TouchableOpacity onPress={handleCreateFranchise}>
            <Text style={styles.create}>Create Franchise</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default FranchiseApplicationCard;

const styles = StyleSheet.create({
  card: {
    margin: 10,
    padding: 12,
    borderWidth: 1,
    borderRadius: 8,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  region: {
    fontWeight: 'bold',
    marginBottom: 8,
  },
  approve: {
    color: 'green',
    marginRight: 16,
  },
  reject: {
    color: 'red',
  },
  create: {
    marginTop: 10,
    color: 'blue',
  },
  input: {
    borderWidth: 1,
    padding: 6,
    marginBottom: 6,
    borderRadius: 4,
  },
  buttonRow: {
    flexDirection: 'row',
    marginTop: 8,
  },
});

import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

const EditProfileScreen = () => {
  const [name, setName] = useState('Abhinay Bellam');
  const [email, setEmail] = useState('abhinay@example.com');
  const [phone, setPhone] = useState('9876543210');
  const [company, setCompany] = useState('Franchise Co.');
  const [address, setAddress] = useState('Andhra Pradesh');

  const handleSave = () => {};

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Edit Profile</Text>
      <TextInput style={styles.input} value={name} onChangeText={setName} placeholder="Name" />
      <TextInput style={styles.input} value={email} onChangeText={setEmail} placeholder="Email" />
      <TextInput style={styles.input} value={phone} onChangeText={setPhone} placeholder="Phone" />
      <TextInput style={styles.input} value={company} onChangeText={setCompany} placeholder="Company Name" />
      <TextInput style={styles.input} value={address} onChangeText={setAddress} placeholder="Address" />
      <Button title="Save Changes" onPress={handleSave} color="#ff7043" />
    </View>
  );
};

export default EditProfileScreen;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#e0f7fa' },
  title: { fontSize: 22, fontWeight: 'bold', color: '#ff7043', marginBottom: 16 },
  input: {
    backgroundColor: '#fff8dc',
    padding: 10,
    marginBottom: 10,
    borderRadius: 10,
  },
});

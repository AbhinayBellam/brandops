// src/screens/Franchisor/ProfileScreen.tsx

import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Button, Image, ScrollView } from 'react-native';

const ProfileScreen: React.FC = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: 'John Doe',
    email: 'john@company.com',
    phone: '9876543210',
    companyName: 'Coral Enterprises',
    companyLogo: 'https://via.placeholder.com/100',
    address: '123 Business Lane, Bengaluru',
  });

  const handleChange = (key: keyof typeof profile, value: string) => {
    setProfile({ ...profile, [key]: value });
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.heading}>Franchisor Profile</Text>
      <Image source={{ uri: profile.companyLogo }} style={styles.logo} />
      <TextInput
        style={styles.input}
        editable={isEditing}
        value={profile.name}
        onChangeText={(text) => handleChange('name', text)}
        placeholder="Franchisor Name"
      />
      <TextInput
        style={styles.input}
        editable={isEditing}
        value={profile.email}
        onChangeText={(text) => handleChange('email', text)}
        placeholder="Email"
      />
      <TextInput
        style={styles.input}
        editable={isEditing}
        value={profile.phone}
        onChangeText={(text) => handleChange('phone', text)}
        placeholder="Phone Number"
      />
      <TextInput
        style={styles.input}
        editable={isEditing}
        value={profile.companyName}
        onChangeText={(text) => handleChange('companyName', text)}
        placeholder="Company Name"
      />
      <TextInput
        style={styles.input}
        editable={isEditing}
        value={profile.address}
        onChangeText={(text) => handleChange('address', text)}
        placeholder="Company Address"
      />
      <View style={styles.buttonContainer}>
        <Button title={isEditing ? 'Save' : 'Edit Profile'} onPress={() => setIsEditing(!isEditing)} color="#FF7F50" />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    padding: 16,
  },
  heading: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
  },
  logo: {
    width: 100,
    height: 100,
    alignSelf: 'center',
    marginBottom: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ADD8E6',
    padding: 10,
    marginVertical: 8,
    borderRadius: 8,
    backgroundColor: '#fff',
  },
  buttonContainer: {
    marginTop: 16,
  },
});

export default ProfileScreen;
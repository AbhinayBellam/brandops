

// ProfileScreen.tsx
import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet,TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import LogoutButton from '../../components/Franchisor/LogoutButton';

const mockProfile = {
  name: 'Abhinay Bellam',
  email: 'abhinay@gmail.com',
  phone: '9876543210',
  address: 'Hitech City, Hyderabad, Telangana - 500081',
};

const ProfileScreen = () => {
  const [profile, setProfile] = useState(mockProfile);
  const [isEditing, setIsEditing] = useState(false);

  const handleChange = (field: keyof typeof profile, value: string) => {
    setProfile({ ...profile, [field]: value });
  };


  

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>My Profile</Text>

        <Field
            label="Name"
            value={profile.name}
            editable={isEditing}
            onChangeText={(text: string) => handleChange('name', text)}
        />
        <Field
            label="Email"
            value={profile.email}
            editable={false}
            onChangeText={undefined}
        />
        <Field
            label="Phone"
            value={profile.phone}
            editable={isEditing}
            onChangeText={(text: string) => handleChange('phone', text)}
        />
        <Field
            label="Address"
            value={profile.address}
            editable={isEditing}
            onChangeText={(text: string) => handleChange('address', text)}
            multiline
        />

        <TouchableOpacity
          style={[styles.button, { backgroundColor: isEditing ? '#27ae60' : '#2980b9' }]}
          onPress={() => setIsEditing(!isEditing)}>
          <Text style={styles.buttonText}>{isEditing ? 'Save Changes' : 'Edit Profile'}</Text>
        </TouchableOpacity>
        <LogoutButton/>

      </ScrollView>
    </SafeAreaView>
  );
};

type FieldProps = {
  label: string;
  value: string;
  editable: boolean;
  onChangeText?: (text: string) => void;
  multiline?: boolean;
};

const Field: React.FC<FieldProps> = ({ label, value, editable, onChangeText, multiline = false }) => (
  <View style={styles.fieldBox}>
    <Text style={styles.label}>{label}</Text>
    <TextInput
      value={value}
      editable={editable}
      onChangeText={onChangeText}
      style={[styles.input, !editable && styles.disabledInput]}
      multiline={multiline}
    />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    padding: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  fieldBox: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    marginBottom: 6,
    color: '#555',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    fontSize: 14,
    backgroundColor: '#f9f9f9',
  },
  disabledInput: {
    backgroundColor: '#eee',
    color: '#888',
  },
  button: {
    padding: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 16,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default ProfileScreen;
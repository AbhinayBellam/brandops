import React, { useEffect, useState, useContext } from 'react';
import { Modal, View, Text, TextInput, Button, StyleSheet, ScrollView } from 'react-native';
import { fetchUserProfile, updateUserProfileService } from '../services/userService';
import { useUser } from '../context/UserContext';
import { useNavigation } from '@react-navigation/native';

interface Props {
  visible: boolean;
  onClose: () => void;
}

const ProfileModal : React.FC<Props>= ({ visible, onClose }) => {
  const [profile, setProfile] = useState<any>({});
  const [formData, setFormData] = useState<any>({});
  const { logout } = useUser();
  const navigation = useNavigation();

  useEffect(() => {
    if (visible) {
      fetchUserProfile().then((data) => {
        setProfile(data);
        setFormData({
          name: data.name,
          email: data.email,
          phone: data.phone,
          address: data.address || {
            street: '',
            city: '',
            state: '',
            zipCode: '',
            country: '',
          },
        });
      });
    }
  }, [visible]);

  const handleUpdate = async () => {
    try {
      await updateUserProfileService(formData);
      onClose();
    } catch (err) {
      console.error(err);
    }
  };

  const handleLogout = () => {
    logout(); // clears context + AsyncStorage
    navigation.reset({
      index: 0,
      routes: [{ name: 'Login' }],
    });
  };

  return (
    <Modal visible={visible} animationType="slide">
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Edit Profile</Text>

        <TextInput
          style={styles.input}
          placeholder="Name"
          value={formData.name}
          onChangeText={(text) => setFormData({ ...formData, name: text })}
        />
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={formData.email}
          onChangeText={(text) => setFormData({ ...formData, email: text })}
        />
        <TextInput
          style={styles.input}
          placeholder="Phone"
          value={formData.phone}
          onChangeText={(text) => setFormData({ ...formData, phone: text })}
        />

        <Text style={styles.section}>Address</Text>
        <TextInput
          style={styles.input}
          placeholder="Street"
          value={formData.address?.street}
          onChangeText={(text) =>
            setFormData({
              ...formData,
              address: { ...formData.address, street: text },
            })
          }
        />
        <TextInput
          style={styles.input}
          placeholder="City"
          value={formData.address?.city}
          onChangeText={(text) =>
            setFormData({
              ...formData,
              address: { ...formData.address, city: text },
            })
          }
        />
        <TextInput
          style={styles.input}
          placeholder="State"
          value={formData.address?.state}
          onChangeText={(text) =>
            setFormData({
              ...formData,
              address: { ...formData.address, state: text },
            })
          }
        />
        <TextInput
          style={styles.input}
          placeholder="Zip Code"
          value={formData.address?.zipCode}
          onChangeText={(text) =>
            setFormData({
              ...formData,
              address: { ...formData.address, zipCode: text },
            })
          }
        />
        <TextInput
          style={styles.input}
          placeholder="Country"
          value={formData.address?.country}
          onChangeText={(text) =>
            setFormData({
              ...formData,
              address: { ...formData.address, country: text },
            })
          }
        />

        <View style={styles.buttonRow}>
          <Button title="Update" onPress={handleUpdate} />
          <Button title="Cancel" color="gray" onPress={onClose} />
        </View>

        <View style={styles.logoutContainer}>
          <Button title="Logout" color="red" onPress={handleLogout} />
        </View>
      </ScrollView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: { padding: 20, paddingBottom: 40 },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 20 },
  input: {
    borderBottomWidth: 1,
    borderColor: '#ccc',
    padding: 8,
    marginBottom: 12,
  },
  section: {
    marginTop: 20,
    fontSize: 18,
    fontWeight: '600',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  logoutContainer: {
    marginTop: 30,
  },
});

export default ProfileModal;

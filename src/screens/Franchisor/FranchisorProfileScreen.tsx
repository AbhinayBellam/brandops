import React, { useState, useEffect, useContext } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { fetchUserProfile, updateUserProfileService } from '../../services/userService';
import styles from '../../styles/Franchisor/FranchisorProfileScreenStyles';
import { useUser } from '../../context/UserContext';

const FranchisorProfileScreen = () => {
  const { user } = useUser();

  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState({
    name: '',
    email: '',
    phone: '',
    role: '',
    address: '',
  });

  const [form, setForm] = useState({
    name: '',
    phone: '',
    address: '',
  });

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const data = await fetchUserProfile();
      setProfile(data);
      setForm({ name: data.name, phone: data.phone, address: data.address });
      setLoading(false);
    } catch (error) {
      Alert.alert('Error', 'Failed to load profile.');
      setLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      setLoading(true);
      const updated = await updateUserProfileService(form);
      setProfile(updated);
      setUser(updated); // update global user context
      setIsEditing(false);
    } catch (err) {
      Alert.alert('Error', 'Failed to update profile.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#000" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>Franchisor Profile</Text>

        <View style={styles.profileItem}>
          <Icon name="person" size={22} color="#555" style={styles.icon} />
          <Text style={styles.label}>Name:</Text>
          {isEditing ? (
            <TextInput
              style={styles.input}
              value={form.name}
              onChangeText={(text) => handleChange('name', text)}
            />
          ) : (
            <Text style={styles.value}>{profile.name}</Text>
          )}
        </View>

        <View style={styles.profileItem}>
          <Icon name="email" size={22} color="#555" style={styles.icon} />
          <Text style={styles.label}>Email:</Text>
          <Text style={styles.value}>{profile.email}</Text>
        </View>

        <View style={styles.profileItem}>
          <Icon name="phone" size={22} color="#555" style={styles.icon} />
          <Text style={styles.label}>Phone:</Text>
          {isEditing ? (
            <TextInput
              style={styles.input}
              value={form.phone}
              onChangeText={(text) => handleChange('phone', text)}
              keyboardType="phone-pad"
            />
          ) : (
            <Text style={styles.value}>{profile.phone}</Text>
          )}
        </View>

          {/* Address */}
  <View style={styles.profileItem}>
    <Icon name="map-marker" size={22} color="#555" style={styles.icon} />
    <Text style={styles.label}>Address:</Text>
    {isEditing ? (
      <TextInput
        style={styles.input}
        value={form.address}
        onChangeText={(text) => handleChange('address', text)}
        multiline
      />
    ) : (
      <Text style={styles.value}>{profile.address}</Text>
    )}
  </View>

    {/* Role */}
  <View style={styles.profileItem}>
    <Icon name="verified-user" size={22} color="#555" style={styles.icon} />
    <Text style={styles.label}>Role:</Text>
    <Text style={styles.value}>{profile.role}</Text>
  </View>


        <View style={styles.profileItem}>
          <Icon name="verified-user" size={22} color="#555" style={styles.icon} />
          <Text style={styles.label}>Role:</Text>
          <Text style={styles.value}>{profile.role}</Text>
        </View>

        <TouchableOpacity
          style={styles.button}
          onPress={isEditing ? handleSave : () => setIsEditing(true)}
        >
          <Text style={styles.buttonText}>{isEditing ? 'Save' : 'Edit Profile'}</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default FranchisorProfileScreen;

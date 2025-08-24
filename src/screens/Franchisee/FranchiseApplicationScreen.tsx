import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Alert,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { applyForFranchise } from '../../services/franchiseeService';
import axiosInstance from '../../api/axiosInstance';
import styles from '../../styles/Franchisee/FranchiseApplicationStyles';
import { useUser } from '../../context/UserContext';
import LogoutButton from '../../components/Franchisor/LogoutButton';

const FranchiseApplicationScreen = () => {
  const navigation = useNavigation();
  const [user, setUser] = useState<any>(null);

  const [region, setRegion] = useState('');
  const [street, setStreet] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [zipCode, setzipCode] = useState('');
  const [country, setCountry] = useState('');
  const [additionalDetails, setAdditionalDetails] = useState('');
  const [loading, setLoading] = useState(false);

  const { user: authUser, isLoading: isUserLoading, logout } = useUser();

  
  const fetchUser = async () => {
    setLoading(true);
    try {
      const res = await axiosInstance.get('/users/me');
      setUser(res.data);
    } catch (error: any) {
      console.error('Fetch user error:', error?.response?.data || error.message);

      if (error?.response?.status === 401) {
        Alert.alert('Session expired', 'Please login again.');
        await logout();

        navigation.reset({
          index: 0,
          routes: [{ name: 'Auth' }],
        });
      } else {
        Alert.alert('Error', 'Failed to fetch user details.');
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!isUserLoading && authUser?.token) {
      console.log('Auth user token is ready:', authUser.token);
      fetchUser();
    }
  }, [isUserLoading, authUser?.token]);

  const handleSubmit = async () => {
    if (
      !region.trim() ||
      !street.trim() ||
      !city.trim() ||
      !state.trim() ||
      !zipCode.trim() ||
      !country.trim()
    ) {
      return Alert.alert('Validation Error', 'Please fill in all address fields and region.');
    }

    setLoading(true);
    try {
      await applyForFranchise({
        region,
        address: {
          street,
          city,
          state,
          zipCode,
          country,
        },
        additionalDetails,
      });

      Alert.alert('Success', 'Franchise application submitted successfully');
      navigation.replace('FranchisePending');
    } catch (error: any) {
      const message =
        error?.response?.data?.message || 'Failed to submit application. Please try again.';
      Alert.alert('Error', message);
    } finally {
      setLoading(false);
    }
  };

  if (!user || loading) {
    return (
      <SafeAreaView style={styles.container}>
        <ActivityIndicator size="large" color="#007AFF" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <Text style={styles.title}>Franchise Application</Text>

        <Text style={styles.label}>Name</Text>
        <TextInput value={user.name} editable={false} style={styles.disabledInput} />

        <Text style={styles.label}>Email</Text>
        <TextInput value={user.email} editable={false} style={styles.disabledInput} />

        <Text style={styles.label}>Phone</Text>
        <TextInput value={user.phone} editable={false} style={styles.disabledInput} />

        <Text style={styles.label}>Region *</Text>
        <TextInput value={region} onChangeText={setRegion} placeholder="Enter region" style={styles.input} />

        <Text style={styles.label}>Street *</Text>
        <TextInput value={street} onChangeText={setStreet} placeholder="123 Main St" style={styles.input} />

        <Text style={styles.label}>City *</Text>
        <TextInput value={city} onChangeText={setCity} placeholder="Hyderabad" style={styles.input} />

        <Text style={styles.label}>State *</Text>
        <TextInput value={state} onChangeText={setState} placeholder="Telangana" style={styles.input} />

        <Text style={styles.label}>Pincode *</Text>
        <TextInput
          value={zipCode}
          onChangeText={setzipCode}
          placeholder="500032"
          keyboardType="numeric"
          style={styles.input}
        />

        <Text style={styles.label}>Country *</Text>
        <TextInput value={country} onChangeText={setCountry} placeholder="India" style={styles.input} />

        <Text style={styles.label}>Additional Details</Text>
        <TextInput
          value={additionalDetails}
          onChangeText={setAdditionalDetails}
          placeholder="Optional"
          multiline
          style={[styles.input, styles.textArea]}
        />

        <TouchableOpacity onPress={handleSubmit} style={styles.button}>
          <Text style={styles.buttonText}>Submit Application</Text>
        </TouchableOpacity>
        <LogoutButton />
      </ScrollView>
    </SafeAreaView>
  );
};

export default FranchiseApplicationScreen;

import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, ActivityIndicator} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import styles from '../../styles/Franchisee/FranchiseApplicationStyles';
import { useUser } from '../../context/UserContext';
import axios from 'axios';

const FranchiseApplicationScreen = () => {
  const [region, setRegion] = useState('');
  const [notes, setNotes] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { user, logout } = useUser();

  const token = user?.token;
  if (!token) {
    Alert.alert('Authentication Error', 'Please log in again.');
    return null;
  }

  const handleSubmit = async () => {
    if (!region.trim()) {
      setError('Region is required');
      return;
    }

    setIsSubmitting(true);
    try {
      await axios.post(
        'http://0.0.0.0:3000/api/franchise-applications',
        { region, notes },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      Alert.alert('Application Submitted', 'Your application is under review.');
    } catch (err: any) {
      Alert.alert('Submission Failed', err.response?.data?.message || 'Something went wrong');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleLogout = () => {
    Alert.alert('Logout', 'Are you sure you want to logout?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Logout', style: 'destructive', onPress: logout },
    ]);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
    <View style={styles.container}>
      <Text style={styles.title}>Franchise Application</Text>

      <TextInput
        style={[styles.input, error && styles.errorInput]}
        placeholder="Enter Region (e.g., South Zone)"
        value={region}
        onChangeText={text => {
          setRegion(text);
          setError('');
        }}
        onBlur={() => {
          if (!region.trim()) setError('Region is required');
        }}
      />
      {error ? <Text style={styles.errorText}>{error}</Text> : null}

      <TextInput
        style={[styles.input, styles.multilineInput]}
        placeholder="Additional Notes (Optional)"
        multiline
        numberOfLines={4}
        value={notes}
        onChangeText={setNotes}
      />

      <TouchableOpacity style={styles.button} onPress={handleSubmit} disabled={isSubmitting}>
        {isSubmitting ? (
          <ActivityIndicator color="#e37676" />
        ) : (
          <Text style={styles.buttonText}>Submit Application</Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity style={[styles.button, { backgroundColor: '#888', marginTop: 20 }]} onPress={handleLogout}>
        <Text style={styles.buttonText}>Logout</Text>
      </TouchableOpacity>
    </View>
    </SafeAreaView>
  );
};

export default FranchiseApplicationScreen;

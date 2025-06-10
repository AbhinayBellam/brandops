import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, Button } from 'react-native';
import { useUser } from '../../context/UserContext';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AppStackParamList } from '../../navigation/AppNavigator';

type NavigationProp = NativeStackNavigationProp<AppStackParamList>;

const FranchiseeDashboardScreen = () => {
  const { logout } = useUser();
  const navigation = useNavigation<NavigationProp>();

  const handleLogout = () => {
    Alert.alert('Logout', 'Are you sure you want to logout?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Logout',
        style: 'destructive',
        onPress: () => {
          logout();
        },
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to Franchisee Dashboard</Text>
      <Text style={styles.subtitle}>Manage orders, stock, and performance here.</Text>

      <Button onPress={() => navigation.navigate('FranchiseApplication')} title='Add product' />
 <Button onPress={() => navigation.navigate('FranchisePending')} title='Pending Applications' />

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

export default FranchiseeDashboardScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
    backgroundColor: '#f9f9f9',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginTop: 10,
    textAlign: 'center',
  },
  logoutButton: {
    marginTop: 30,
    backgroundColor: '#d9534f',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
  },
  logoutText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

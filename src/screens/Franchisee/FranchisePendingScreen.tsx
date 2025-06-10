import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const PendingScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Application Pending</Text>
      <Text style={styles.subtitle}>
        Your application is currently under review. You will be notified once a decision is made.
      </Text>
    </View>
  );
};

export default PendingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
    backgroundColor: '#f9f9f9',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#333',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
});
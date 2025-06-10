import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const RejectedScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Application Rejected</Text>
      <Text style={styles.subtitle}>
        Unfortunately, your application has been rejected. Please contact support for more info.
      </Text>
    </View>
  );
};

export default RejectedScreen;

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
    color: '#c00',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
});
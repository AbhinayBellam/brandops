import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import FranchiseeHeader from '../../components/Franchisee/FranchiseeHeader';
import { SafeAreaView } from 'react-native-safe-area-context';

const FranchiseeHomeScreen = () => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
    <View style={{ flex: 1 }}>
      <FranchiseeHeader />
      <View style={styles.container}>
        <Text>Franchisee Home Screen</Text>
      </View>
    </View>
    </SafeAreaView>
  );
};

export default FranchiseeHomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
});

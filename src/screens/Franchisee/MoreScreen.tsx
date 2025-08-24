// screens/Franchisor/MoreScreen.tsx
import React from 'react';
import { View, Button, StyleSheet, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';

const MoreScreen = () => {
  const navigation = useNavigation<any>();

  return (
    <SafeAreaView style={{ flex: 1 }}>
    <ScrollView contentContainerStyle={styles.container}>
<Button title="OrderPayments" onPress={() => navigation.navigate('FranchiseeOrderPayments')} />
<Button title="Pay Commission" onPress={() => navigation.navigate('FranchiseePayCommission')} />
<Button title="Stock Levels" onPress={() => navigation.navigate('StockLevels')} />
<Button title="Earings" onPress={() => navigation.navigate('FranchiseeEarnings')} />

    </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    gap: 16,
  },
});

export default MoreScreen;

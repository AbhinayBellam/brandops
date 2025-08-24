
import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import FranchiseeHeader from '../../components/Franchisee/FranchiseeHeader';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';

const FranchiseeDashboard = () => {
  const navigation = useNavigation();

  const stats = [
    { label: 'Revenue', value: '₹1,25,000' },
    { label: 'Orders', value: '230' },
    { label: 'Stock Requests', value: '5 Pending' },
    { label: 'Commission Due', value: '₹15,000' },
  ];

  const quickLinks = [
    { label: 'Products', screen: 'FranhciseeProducts' },
    { label: 'Orders', screen: 'FranchiseeOrders' },
    { label: 'Stock Requests', screen: 'FranchiseeStockRequest' },
    { label: 'Order Payments', screen: 'FranchiseeOrderPayments' },
    { label: 'Pay Commission', screen: 'FranchiseePayCommission' },
    { label: 'Earnings', screen: 'FranchiseeEarnings' },
  ];

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#F5F7FA' }}>
    <View style={{ flex: 1, backgroundColor: '#F5F7FA' }}>
      <FranchiseeHeader title="Franchisee Dashboard" />

      <ScrollView contentContainerStyle={styles.container}>
        {/* Stats Section */}
        <View style={styles.statsContainer}>
          {stats.map((item, index) => (
            <View key={index} style={styles.statCard}>
              <Text style={styles.statLabel}>{item.label}</Text>
              <Text style={styles.statValue}>{item.value}</Text>
            </View>
          ))}
        </View>

        {/* Quick Links */}
        <Text style={styles.sectionTitle}>Quick Actions</Text>
        <View style={styles.quickLinksContainer}>
          {quickLinks.map((link, index) => (
            <TouchableOpacity
              key={index}
              style={styles.quickLinkButton}
              onPress={() => navigation.navigate(link.screen as never)}
            >
              <Text style={styles.quickLinkText}>{link.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
    </SafeAreaView>
  );
};

export default FranchiseeDashboard;

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  statsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  statCard: {
    backgroundColor: '#fff',
    width: '48%',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 3,
  },
  statLabel: {
    fontSize: 14,
    color: '#777',
  },
  statValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2E86DE',
    marginTop: 4,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 16,
    marginBottom: 8,
  },
  quickLinksContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  quickLinkButton: {
    backgroundColor: '#2E86DE',
    width: '48%',
    paddingVertical: 14,
    borderRadius: 12,
    marginBottom: 12,
    alignItems: 'center',
  },
  quickLinkText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
});

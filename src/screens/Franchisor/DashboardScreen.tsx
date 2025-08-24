
import React from 'react';
import { View, Text,StatusBar, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';

import FranchisorHeader from '../../components/Franchisor/FranchisorHeader';

const DashboardScreen = () => {
  const navigation = useNavigation();

  // Mocked data
  const stats = {
    totalFranchises: 12,
    totalRevenue: '₹3,50,000',
    commissionEarned: '₹78,000',
    pendingApplications: 5,
  };

  const quickActions = [
    { icon: 'cube-outline', label: 'View Products', navigateTo: 'Products' },
    { icon: 'chart-bar', label: 'Reports', navigateTo: 'Reports' },
    { icon: 'truck-fast-outline', label: 'Stock Requests', navigateTo: 'Stock Requests' },
    { icon: 'clipboard-list-outline', label: 'Applications', navigateTo: 'Franchise Applications' },
  ];

  return (
    <SafeAreaView style={styles.container}>
     
      <StatusBar barStyle="dark-content" backgroundColor="#f4f6f8" />
        <FranchisorHeader title="Franchisor Dashboard" />
      <ScrollView contentContainerStyle={styles.scrollView}>

        {/* Stats Section */}
        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <Text style={styles.statLabel}>Total Franchises</Text>
            <Text style={styles.statValue}>{stats.totalFranchises}</Text>
          </View>

          <View style={styles.statCard}>
            <Text style={styles.statLabel}>Total Revenue</Text>
            <Text style={styles.statValue}>{stats.totalRevenue}</Text>
          </View>

          <View style={styles.statCard}>
            <Text style={styles.statLabel}>Commission Earned</Text>
            <Text style={styles.statValue}>{stats.commissionEarned}</Text>
          </View>

          <View style={styles.statCard}>
            <Text style={styles.statLabel}>Pending Applications</Text>
            <Text style={styles.statValue}>{stats.pendingApplications}</Text>
          </View>
        </View>

        {/* Quick Actions */}
        <Text style={styles.sectionTitle}>Quick Actions</Text>
        <View style={styles.actionsContainer}>
          {quickActions.map((action, index) => (
            <TouchableOpacity
              key={index}
              style={styles.actionButton}
              onPress={() => navigation.navigate(action.navigateTo)}
            >
              <Icon name={action.icon} size={28} color="#fff" />
              <Text style={styles.actionText}>{action.label}</Text>
            </TouchableOpacity>
          ))}
        </View>

      </ScrollView>
    </SafeAreaView>
  );
};

export default DashboardScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f7fa',
  },
  scrollView: {
    padding: 16,
  },
  heading: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 20,
    color: '#15696F',
  },
  statsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  statCard: {
    width: '48%',
    backgroundColor: '#fff',
    padding: 16,
    marginBottom: 16,
    borderRadius: 12,
    elevation: 2,
  },
  statLabel: {
    fontSize: 14,
    color: '#555',
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 8,
    color: '#000',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginVertical: 16,
  },
  actionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  actionButton: {
    width: '48%',
    backgroundColor: '#4a90e2',
    padding: 16,
    marginBottom: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  actionText: {
    color: '#fff',
    marginTop: 8,
    fontSize: 14,
  },
});

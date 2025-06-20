import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import styles from '../../styles/Franchisee/FranchiseDashboardStyles';
import { useNavigation } from '@react-navigation/native';
import { useUser } from '../../context/UserContext'; // 👈 make sure this path is correct

const FranchiseeDashboardScreen = () => {
  const navigation = useNavigation();
  const { logout } = useUser(); // 👈 assuming you have logout method in context

  const handleLogout = () => {
    Alert.alert('Confirm Logout', 'Are you sure you want to log out?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Logout',
        style: 'destructive',
        onPress: async () => {
          await logout();
          navigation.reset({
            index: 0,
            routes: [{ name: 'Login' }], // 👈 make sure 'Login' matches your AuthNavigator
          });
        },
      },
    ]);
  };

  const stats = [
    { title: 'Stock Items', value: '89', icon: 'package', change: 'Low stock: 5 items' },
    { title: 'Pending Orders', value: '7', icon: 'shopping-cart', change: 'Process today' },
    { title: 'Monthly Revenue', value: '$8,450', icon: 'dollar-sign', change: '+8% from last month' },
    { title: 'Commission Due', value: '$845', icon: 'trending-up', change: 'Pay by month end' },
  ];

  const recentOrders = [
    { id: '#ORD-001', customer: 'Alice Brown', amount: '$125', status: 'processing' },
    { id: '#ORD-002', customer: 'Bob Wilson', amount: '$89', status: 'shipped' },
    { id: '#ORD-003', customer: 'Carol Davis', amount: '$156', status: 'delivered' },
  ];

  const lowStockItems = [
    { name: 'Premium Coffee Beans', stock: 5, minStock: 20 },
    { name: 'Organic Tea Leaves', stock: 8, minStock: 15 },
    { name: 'Artisan Cookies', stock: 12, minStock: 25 },
  ];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Franchisee Dashboard</Text>

        <View style={{ flexDirection: 'row', gap: 10 }}>
          <TouchableOpacity style={styles.stockButton}>
            <Icon name="package" size={16} color="#fff" />
            <Text style={styles.stockButtonText}>Request Stock</Text>
          </TouchableOpacity>

          {/* <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <Icon name="log-out" size={16} color="#fff" />
            <Text style={styles.logoutButtonText}>Logout</Text>
          </TouchableOpacity> */}
        </View>
      </View>

      {/* Stats */}
      <View style={styles.statsGrid}>
        {stats.map((stat, index) => (
          <View key={index} style={styles.card}>
            <View style={styles.cardHeader}>
              <Text style={styles.cardTitle}>{stat.title}</Text>
              <Icon name={stat.icon} size={16} color="#666" />
            </View>
            <Text style={styles.cardValue}>{stat.value}</Text>
            <Text style={styles.cardDescription}>{stat.change}</Text>
            <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <Icon name="log-out" size={16} color="#fff" />
            <Text style={styles.logoutButtonText}>Logout</Text>
          </TouchableOpacity>
          </View>
        ))}
      </View>

      {/* Recent Orders */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Recent Orders</Text>
        <Text style={styles.sectionSubtitle}>Manage customer orders and shipments</Text>
        {recentOrders.map((order, index) => (
          <View key={index} style={styles.listItem}>
            <View>
              <Text style={styles.listTitle}>{order.id}</Text>
              <Text style={styles.listSubtitle}>{order.customer}</Text>
            </View>
            <View style={{ alignItems: 'flex-end' }}>
              <Text style={styles.amount}>{order.amount}</Text>
              <Text style={[
                styles.status,
                order.status === 'delivered' ? styles.green :
                order.status === 'shipped' ? styles.blue : styles.yellow
              ]}>
                {order.status}
              </Text>
            </View>
          </View>
        ))}
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>View All Orders</Text>
        </TouchableOpacity>
      </View>

      {/* Low Stock Alert */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Icon name="alert-circle" size={18} color="#eab308" />
          <Text style={styles.sectionTitle}>Low Stock Alert</Text>
        </View>
        <Text style={styles.sectionSubtitle}>Items that need restocking</Text>
        {lowStockItems.map((item, index) => (
          <View key={index} style={styles.listItem}>
            <View>
              <Text style={styles.listTitle}>{item.name}</Text>
              <Text style={styles.listSubtitle}>Min stock: {item.minStock}</Text>
            </View>
            <Text style={styles.redText}>{item.stock} left</Text>
          </View>
        ))}
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Request Restock</Text>
        </TouchableOpacity>
      </View>

      {/* Quick Actions */}
      <View style={styles.quickGrid}>
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Icon name="shopping-cart" size={16} color="#000" />
            <Text style={styles.cardTitle}>Order Management</Text>
          </View>
          <Text style={styles.cardDescription}>Process and track customer orders</Text>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Manage Orders</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Icon name="trending-up" size={16} color="#000" />
            <Text style={styles.cardTitle}>Sales Report</Text>
          </View>
          <Text style={styles.cardDescription}>View your sales performance</Text>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>View Reports</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Icon name="dollar-sign" size={16} color="#000" />
            <Text style={styles.cardTitle}>Commission Payment</Text>
          </View>
          <Text style={styles.cardDescription}>Pay commission to franchisor</Text>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Pay Commission</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default FranchiseeDashboardScreen;

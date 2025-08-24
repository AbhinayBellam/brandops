
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, RefreshControl, Alert, StyleSheet, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import FranchiseeHeader from '../../components/Franchisee/FranchiseeHeader';
import OrderCard from '../../components/Franchisee/OrderCard';
import { OrderService } from '../../services/orderService';

const FranchiseeOrdersScreen = () => {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const response = await OrderService.getAll();
      setOrders(response || []);
    } catch (error) {
      console.error('Failed to fetch orders', error);
      Alert.alert('Error', 'Failed to load orders.');
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (orderId: string, newStatus: string) => {
    try {
      await OrderService.updateStatus(orderId, newStatus);
      fetchOrders(); // Refresh list
    } catch (error) {
      console.error('Failed to update order status', error);
      Alert.alert('Error', 'Failed to update status.');
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <FranchiseeHeader title='Orders' />
      <FlatList
        contentContainerStyle={styles.listContainer}
        data={orders}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <OrderCard order={item} onStatusChange={handleStatusChange} />
        )}
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={fetchOrders} />
        }
        ListEmptyComponent={
          <View style={styles.empty}>
            <Text>No orders available.</Text>
          </View>
        }
      />
    </SafeAreaView>
  );
};

export default FranchiseeOrdersScreen;

const styles = StyleSheet.create({
  listContainer: {
    padding: 16,
    backgroundColor: '#fff',
  },
  empty: {
    padding: 20,
    alignItems: 'center',
  },
});

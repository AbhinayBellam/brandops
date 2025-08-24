

import React, { useEffect, useState, useCallback } from 'react';
import {
  View,
  Text,
  StatusBar,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  RefreshControl,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import OrderCard from '../../components/Customer/OrderCard';
import OrderProductItem from '../../components/Customer/OrderProductItem';
import { OrderService } from '../../services/orderService';
import { useUser } from '../../context/UserContext';

import FranchisorHeader from '../../components/Franchisor/FranchisorHeader';
import { colors } from '../../utils/colors'; 

const OrdersScreen = () => {
  const { user } = useUser();
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchOrders = useCallback(async () => {
    if (!user?._id) return;
    try {
      setLoading(true);
      const userId = user?._id;
      console.log('Fetching orders for user ID:', userId);
      const response = await OrderService.getByCustomer(user._id);
      setOrders(response || []);
    } catch (error) {
      console.error('Failed to fetch orders:', error);
      Alert.alert('Error', 'Failed to fetch orders. Please try again.');
    } finally {
      setLoading(false);
    }
  }, [user?._id]);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchOrders();
    setRefreshing(false);
  };

  const renderOrderDetails = (order) => (
    <View style={styles.detailContainer}>
      <Text style={styles.sectionTitle}>Order Items</Text>
      {order.items.map((item) => (
        <OrderProductItem key={item.productId} {...item} />
      ))}
      <Text style={styles.totalText}>Total: ₹{order.totalAmount}</Text>
      <TouchableOpacity style={styles.backButton} onPress={() => setSelectedOrder(null)}>
        <Text style={styles.backText}>← Back to Orders</Text>
      </TouchableOpacity>
    </View>
  );

  const renderOrderList = () => (
    <FlatList
      data={orders}
      keyExtractor={(item) => item._id}
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      renderItem={({ item }) => (
        <OrderCard
          orderId={item._id.slice(-7)}
          date={new Date(item.createdAt).toLocaleDateString()}
          status={item.status}
          total={item.totalAmount}
          onPress={() => setSelectedOrder(item)}
        />
      )}
      ListEmptyComponent={
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No orders yet.</Text>
        </View>
      }
    />
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#f4f6f8" />
      
      <FranchisorHeader title="Orders" />

      {loading ? (
        <ActivityIndicator size="large" color="#2980b9" />
      ) : selectedOrder ? (
        renderOrderDetails(selectedOrder)
      ) : (
        renderOrderList()
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  detailContainer: {
    padding: 12,
    backgroundColor: '#fff',
    borderRadius: 8,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: colors.primary
  },
  totalText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginVertical: 15,
    textAlign: 'right',
    color: '#34495e',
  },
  backButton: {
    marginTop: 20,
    backgroundColor: colors.secondary,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  backText: {
    color: '#fff',
    fontSize: 16,
  },
  emptyContainer: {
    alignItems: 'center',
    marginTop: 50,
  },
  emptyText: {
    fontSize: 16,
    color: colors.text,
  },
});

export default OrdersScreen;

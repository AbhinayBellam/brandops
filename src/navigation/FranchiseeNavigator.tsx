import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

// Screens
import FranchiseeHomeScreen from '../screens/Franchisee/FranchiseeHomeScreen';
import ProductsScreen from '../screens/Franchisee/FranchiseeProductsScreen';
import StockRequestScreen from '../screens/Franchisee/FranchiseeStockRequestScreen';
import OrdersScreen from '../screens/Franchisee/FranchiseeOrdersScreen';
import EarningsScreen from '../screens/Franchisee/FranchiseeEarningsScreen';
import PayCommissionScreen from '../screens/Franchisee/FranchiseePayCommissionScreen';
import OrderPaymentsScreen from '../screens/Franchisee/FranchiseeOrderPaymentsScreen';
import ProfileScreen from '../screens/Franchisee/FranchiseeProfileScreen';
import LogoutButton from '../components/Franchisor/LogoutButton';

const Drawer = createDrawerNavigator();

// Drawer items config
const drawerItems = [
  { label: 'Home', route: 'FranchiseeHome', icon: 'home', component: FranchiseeHomeScreen },
  { label: 'Products', route: 'Products', icon: 'cube', component: ProductsScreen },
  { label: 'Stock Requests', route: 'StockRequests', icon: 'truck-fast', component: StockRequestScreen },
  { label: 'Orders', route: 'Orders', icon: 'clipboard-list', component: OrdersScreen },
  { label: 'Earnings', route: 'Earnings', icon: 'cash-multiple', component: EarningsScreen },
  { label: 'Pay Commission', route: 'PayCommission', icon: 'cash-check', component: PayCommissionScreen },
  { label: 'Order Payments', route: 'OrderPayments', icon: 'credit-card-outline', component: OrderPaymentsScreen },
  { label: 'Profile', route: 'Profile', icon: 'account-circle-outline', component: ProfileScreen },
  
];

const FranchiseeNavigator = () => {
  return (
    <Drawer.Navigator screenOptions={{ headerShown: false }}>
      {drawerItems.map((item) => (
        <Drawer.Screen
          key={item.route}
          name={item.route}
          component={item.component}
          options={{
            title: item.label,
            drawerIcon: ({ color, size }) => (
              <Icon name={item.icon} size={size} color={color} />
            ),
          }}
        />
      ))}
    </Drawer.Navigator>
  );
};

export default FranchiseeNavigator;

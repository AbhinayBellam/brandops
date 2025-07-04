// navigation/FranchisorNavigator.tsx
import React from 'react';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { View, Text } from 'react-native';

import DashboardScreen from '../screens/Franchisor/DashboardScreen';
import ProfileScreen from '../screens/Franchisor/ProfileScreen';
import ViewProductsScreen from '../screens/Franchisor/ViewProductsScreen';
import FranchiseApplicationsScreen from '../screens/Franchisor/FranchiseApplicationsScreen';
import FranchisesScreen from '../screens/Franchisor/FranchisesScreen';
import StockLevelsScreen from '../screens/Franchisor/StockLevelsScreen';
import StockRequestsScreen from '../screens/Franchisor/StockRequestsScreen';
import CommissionsScreen from '../screens/Franchisor/CommissionsScreen';
import ReportsScreen from '../screens/Franchisor/ReportsScreen';

const Drawer = createDrawerNavigator();

const drawerItems = [
   { label: 'Home', route: 'Dashboard', icon: 'home' },
  { label: 'Franchises', route: 'Franchises', icon: 'store' },
  { label: 'Franchise Applications', route: 'FranchiseApplications', icon: 'clipboard-list' },
  { label: 'Stock Requests', route: 'StockRequests', icon: 'truck-fast' },
  { label: 'Stock Levels', route: 'StockLevels', icon: 'chart-bar' },
  { label: 'Products', route: 'ViewProducts', icon: 'cube' },
  { label: 'Commissions and Earnings', route: 'Commissions', icon: 'cash-multiple' },
  { label: 'Reports', route: 'Reports', icon: 'file-chart' },
  // { label: 'Profile', name: 'Profile', icon: 'account-circle' },
];

function CustomDrawerContent(props: any) {
  const { navigation } = props;

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <DrawerContentScrollView {...props}>
        {drawerItems.map((item, index) => (
          <DrawerItem
            key={index}
            label={item.label}
            onPress={() => navigation.navigate(item.route)}
            icon={({ color, size }) => <Icon name={item.icon} size={size} color={color} />}
          />
        ))}
      </DrawerContentScrollView>
    </SafeAreaView>
  );
}

const FranchisorNavigator = () => {
  return (
    <Drawer.Navigator
      initialRouteName="Dashboard"
      screenOptions={{ headerShown: false }}
      drawerContent={(props) => <CustomDrawerContent {...props} />}
    >
      <Drawer.Screen name="Dashboard" component={DashboardScreen} />
      <Drawer.Screen name="Franchises" component={FranchisesScreen} />
      <Drawer.Screen name="FranchiseApplications" component={FranchiseApplicationsScreen} />
      <Drawer.Screen name="StockRequests" component={StockRequestsScreen} />
      <Drawer.Screen name="StockLevels" component={StockLevelsScreen} />
      <Drawer.Screen name="ViewProducts" component={ViewProductsScreen} />
      <Drawer.Screen name="Commissions" component={CommissionsScreen} />
      <Drawer.Screen name="Reports" component={ReportsScreen} />
      {/* <Drawer.Screen name="Profile" component={ProfileScreen} /> */}
    </Drawer.Navigator>
  );
};

export default FranchisorNavigator;

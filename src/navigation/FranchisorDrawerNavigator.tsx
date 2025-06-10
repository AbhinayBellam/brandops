// src/navigation/FranchisorDrawerNavigator.tsx
import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import FranchisorNavigator from './FranchisorNavigator';
import ProfileScreen from '../screens/Franchisor/ProfileScreen';
import ViewProductsScreen from '../screens/Franchisor/ViewProductsScreen';
import FranchiseApplicationsScreen from '../screens/Franchisor/FranchiseApplicationsScreen';
import FranchisesScreen from '../screens/Franchisor/FranchisesScreen';
import StockLevelsScreen from '../screens/Franchisor/StockLevelsScreen';
import StockRequestsScreen from '../screens/Franchisor/StockRequestsScreen';
import CommissionsScreen from '../screens/Franchisor/CommissionsScreen';
import ReportsScreen from '../screens/Franchisor/ReportsScreen';

const Drawer = createDrawerNavigator();

const FranchisorDrawerNavigator = () => {
  return (
    <Drawer.Navigator initialRouteName="Dashboard">
      <Drawer.Screen name="Dashboard" component={FranchisorNavigator} />
      <Drawer.Screen name="Profile" component={ProfileScreen} />
      <Drawer.Screen name="Products" component={ViewProductsScreen} />
      <Drawer.Screen name="Franchise Applications" component={FranchiseApplicationsScreen} />
      <Drawer.Screen name="Franchises" component={FranchisesScreen} />
      <Drawer.Screen name="Stock Levels" component={StockLevelsScreen} />
      <Drawer.Screen name="Stock Requests" component={StockRequestsScreen} />
      <Drawer.Screen name="Commissions" component={CommissionsScreen} />
      <Drawer.Screen name="Reports" component={ReportsScreen} />
    </Drawer.Navigator>
  );
};

export default FranchisorDrawerNavigator;
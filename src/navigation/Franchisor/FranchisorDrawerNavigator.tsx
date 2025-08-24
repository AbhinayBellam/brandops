
// navigation/FranchisorDrawerNavigator.tsx
import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';

import FranchisorTabNavigator from './FranchisorTabNavigator';
import FranchiseApplicationsScreen from '../../screens/Franchisor/FranchiseApplicationsScreen';
import StockRequestsScreen from '../../screens/Franchisor/StockRequestsScreen';
import StockLevelsScreen from '../../screens/Franchisor/StockLevelsScreen';
import CommissionsScreen from '../../screens/Franchisor/CommissionsScreen';

const Drawer = createDrawerNavigator();

const FranchisorDrawerNavigator = () => {
  return (
    <Drawer.Navigator initialRouteName="Tabs">
      <Drawer.Screen name="Dashboard" component={FranchisorTabNavigator} />
      <Drawer.Screen name="Franchise Applications" component={FranchiseApplicationsScreen} />
      <Drawer.Screen name="Stock Requests" component={StockRequestsScreen} />
      <Drawer.Screen name="Stock Levels" component={StockLevelsScreen} />
      <Drawer.Screen name="Commissions & Earnings" component={CommissionsScreen} />
    </Drawer.Navigator>
  );
};

export default FranchisorDrawerNavigator;

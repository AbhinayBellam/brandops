import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import CustomDrawerContent from '../components/Franchisor/CustomDrawerContent';

import DashboardScreen from '../screens/Franchisor/DashboardScreen';
import FranchisesScreen from '../screens/Franchisor/FranchisesScreen';
import FranchiseApplicationsScreen from '../screens/Franchisor/FranchiseApplicationsScreen';
import StockRequestsScreen from '../screens/Franchisor/StockRequestsScreen';
import StockLevelsScreen from '../screens/Franchisor/StockLevelsScreen';
import ViewProductsScreen from '../screens/Franchisor/ViewProductsScreen';
import CommissionsScreen from '../screens/Franchisor/CommissionsScreen';
import ReportsScreen from '../screens/Franchisor/ReportsScreen';

const Drawer = createDrawerNavigator();

const FranchisorDrawerNavigator = () => {
  return (
    <Drawer.Navigator
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
    </Drawer.Navigator>
  );
};

export default FranchisorDrawerNavigator;

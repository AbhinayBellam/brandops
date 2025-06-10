import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import FranchiseApplicationScreen from '../screens/Franchisee/FranchiseApplicationScreen';
import PendingApprovalScreen from '../screens/Franchisee/FranchisePendingScreen';
import ApplicationRejectedScreen from '../screens/Franchisee/FranchiseRejectedScreen';
import FranchiseeDashboardScreen from '../screens/Franchisee/FranchiseDashboard';
// import FranchisorDashboardScreen from '../screens/Franchisor/FranchisorDashboardScreen';
// import CustomerDashboardScreen from '../screens/Customer/CustomerDashboardScreen';

const Stack = createNativeStackNavigator();

const MainNavigator = () => (
  <Stack.Navigator initialRouteName="CustomerDashboard">
    <Stack.Screen name="FranchiseApplication" component={FranchiseApplicationScreen} />
    <Stack.Screen name="PendingApproval" component={PendingApprovalScreen} />
    <Stack.Screen name="ApplicationRejected" component={ApplicationRejectedScreen} />
    <Stack.Screen name="FranchiseeDashboard" component={FranchiseeDashboardScreen} />
    {/* <Stack.Screen name="FranchisorDashboard" component={FranchisorDashboardScreen} /> */}
    {/* <Stack.Screen name="CustomerDashboard" component={CustomerDashboardScreen} /> */}
  </Stack.Navigator>
);

export default MainNavigator;

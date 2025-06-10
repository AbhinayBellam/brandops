// navigation/FranchisorNavigator.tsx
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DashboardScreen from '../screens/Franchisor/DashboardScreen';
import ProfileScreen from '../screens/Franchisor/ProfileScreen';
import ViewProductsScreen from '../screens/Franchisor/ViewProductsScreen';
import AddProductScreen from '../screens/Franchisor/AddProductScreen';
import EditProductScreen from '../screens/Franchisor/EditProductScreen';
import EditProfileScreen from '../screens/Franchisor/EditProfileScreen';
import FranchiseApplicationsScreen from '../screens/Franchisor/FranchiseApplicationsScreen';
import FranchiseSetupScreen from '../screens/Franchisor/FranchiseSetupScreen';
import FranchisesScreen from '../screens/Franchisor/FranchisesScreen';
import StockLevelsScreen from '../screens/Franchisor/StockLevelsScreen';
import StockRequestsScreen from '../screens/Franchisor/StockRequestsScreen';
import CommissionsScreen from '../screens/Franchisor/CommissionsScreen';
import ReportsScreen from '../screens/Franchisor/ReportsScreen';
import FranchiseSalesDetailScreen from '../screens/Franchisor/FranchiseSalesDetailScreen';

export type FranchisorStackParamList = {
  Dashboard: undefined;
  Profile: undefined;
  ViewProducts: undefined;
  AddProduct: undefined;
  EditProduct: { productId: string };
  EditProfile: undefined;
  FranchiseApplications: undefined;
  FranchiseSetup: { applicationId: string };
  Franchises: undefined;
  StockLevels: undefined;
  StockRequests: undefined;
  Commissions: undefined;
  Reports: undefined;
  FranchiseSalesDetail: { franchiseId: string };
};

const Stack = createNativeStackNavigator<FranchisorStackParamList>();

const FranchisorNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Dashboard" component={DashboardScreen} />
      <Stack.Screen name="Profile" component={ProfileScreen} />
      <Stack.Screen name="ViewProducts" component={ViewProductsScreen} />
      <Stack.Screen name="AddProduct" component={AddProductScreen} />
      <Stack.Screen name="EditProduct" component={EditProductScreen} />
      <Stack.Screen name="EditProfile" component={EditProfileScreen} />
      <Stack.Screen name="FranchiseApplications" component={FranchiseApplicationsScreen} />
      <Stack.Screen name="FranchiseSetup" component={FranchiseSetupScreen} />
      <Stack.Screen name="Franchises" component={FranchisesScreen} />
      <Stack.Screen name="StockLevels" component={StockLevelsScreen} />
      <Stack.Screen name="StockRequests" component={StockRequestsScreen} />
      <Stack.Screen name="Commissions" component={CommissionsScreen} />
      <Stack.Screen name="Reports" component={ReportsScreen} />
      <Stack.Screen name="FranchiseSalesDetail" component={FranchiseSalesDetailScreen} />
    </Stack.Navigator>
  );
};

export default FranchisorNavigator;

// navigation/FranchisorStackNavigator.tsx
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import FranchisorTabNavigator from './FranchisorTabNavigator';
import FranchiseApplicationsScreen from '../../screens/Franchisor/FranchiseApplicationsScreen';
import StockRequestsScreen from '../../screens/Franchisor/StockRequestsScreen';
import StockLevelsScreen from '../../screens/Franchisor/StockLevelsScreen';
import CommissionsScreen from '../../screens/Franchisor/CommissionsScreen';
import FranchisorProfileScreen from '../../screens/Franchisor/FranchisorProfileScreen';

export type FranchisorStackParamList = {
  FranchisorTabs: undefined;
  FranchiseApplications: undefined;
  StockRequests: undefined;
  StockLevels: undefined;
  CommissionsEarnings: undefined;
  FranchisorProfile: undefined;
};

const Stack = createNativeStackNavigator<FranchisorStackParamList>();

const FranchisorStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="FranchisorTabs" component={FranchisorTabNavigator} />
      <Stack.Screen name="FranchiseApplications" component={FranchiseApplicationsScreen} />
      <Stack.Screen name="StockRequests" component={StockRequestsScreen} />
      <Stack.Screen name="StockLevels" component={StockLevelsScreen} />
      <Stack.Screen name="CommissionsEarnings" component={CommissionsScreen} />
      <Stack.Screen name="FranchisorProfile" component={FranchisorProfileScreen} />
    </Stack.Navigator>
  );
};

export default FranchisorStackNavigator;

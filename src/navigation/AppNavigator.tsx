// AppNavigator.tsx
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import LandingScreen from '../screens/Intro/LandingScreen';
import GetStartedScreen from '../screens/Intro/GetStartedScreen';
import AuthNavigator from './AuthNavigator';
import FranchiseeDashboard from '../screens/Franchisee/FranchiseDashboard';
import FranchisePendingScreen from '../screens/Franchisee/FranchisePendingScreen';
import FranchiseRejectedScreen from '../screens/Franchisee/FranchiseRejectedScreen';
import FranchiseApplicationScreen from '../screens/Franchisee/FranchiseApplicationScreen';
// import FranchisorDashboard from '../screens/Franchisor/FranchisorDashboard';
// import CustomerDashboard from '../screens/Customer/CustomerDashboard';
import { useUser } from '../context/UserContext';


export type AppStackParamList = {
  Landing: undefined;
  GetStarted: undefined;
  Auth: undefined;
  FranchiseeDashboard: undefined;
  FranchisePending: undefined;
  FranchiseRejected: undefined;
  FranchiseApplication: undefined;
  FranchisorDashboard: undefined;
  CustomerDashboard: undefined;
};

const Stack = createNativeStackNavigator<AppStackParamList>();

const AppNavigator = () => {
  const { user, isLoading } = useUser();

  if (isLoading) return null;

  return (
      <Stack.Navigator screenOptions={{ headerShown: false }}>
  {!user?.token ? (
    <>
      <Stack.Screen name="Landing" component={LandingScreen} />
      <Stack.Screen name="GetStarted" component={GetStartedScreen} />
      <Stack.Screen name="Auth" component={AuthNavigator} />
    </>
  ) : (
    <>
    
      <Stack.Screen name="FranchiseeDashboard" component={FranchiseeDashboard} />
      <Stack.Screen name="FranchisePending" component={FranchisePendingScreen} />
      <Stack.Screen name="FranchiseRejected" component={FranchiseRejectedScreen} />
      <Stack.Screen name="FranchiseApplication" component={FranchiseApplicationScreen} />
     
    </>
  )}
</Stack.Navigator>

  );
};

export default AppNavigator;

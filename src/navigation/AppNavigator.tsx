// AppNavigator.tsx
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { useUser } from '../context/UserContext';

// Screens
import LandingScreen from '../screens/Intro/LandingScreen';
import GetStartedScreen from '../screens/Intro/GetStartedScreen';
import AuthNavigator from './AuthNavigator';
import FranchiseeDashboard from '../screens/Franchisee/FranchiseDashboardScreen';
import FranchisePendingScreen from '../screens/Franchisee/FranchisePendingScreen';
import FranchiseRejectedScreen from '../screens/Franchisee/FranchiseRejectedScreen';
import FranchiseApplicationScreen from '../screens/Franchisee/FranchiseApplicationScreen';
import FranchisorDashboard from '../screens/Franchisor/DashboardScreen';
// import CustomerDashboard from '../screens/Customer/CustomerDashboard';

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

  const getInitialRoute = () => {
    if (!user) return 'Landing';

    if (user.role === 'franchisee') {
      switch (user.franchiseStatus) {
        case 'Pending':
          return 'FranchisePending';
        case 'Rejected':
          return 'FranchiseRejected';
        case 'Approved':
          return 'FranchiseeDashboard';
        case 'Not_applied':
        default:
          return 'FranchiseApplication';
      }
    } else if (user.role === 'franchisor') {
      return 'FranchisorDashboard';
    } else if (user.role === 'customer') {
      return 'CustomerDashboard';
    }

    return 'Landing';
  };

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName={getInitialRoute()}>
        <Stack.Screen name="Landing" component={LandingScreen} />
        <Stack.Screen name="GetStarted" component={GetStartedScreen} />
        <Stack.Screen name="Auth" component={AuthNavigator} />

        {/* Authenticated screens */}
        <Stack.Screen name="FranchiseeDashboard" component={FranchiseeDashboard} />
        <Stack.Screen name="FranchisePending" component={FranchisePendingScreen} />
        <Stack.Screen name="FranchiseRejected" component={FranchiseRejectedScreen} />
        <Stack.Screen name="FranchiseApplication" component={FranchiseApplicationScreen} />
        <Stack.Screen name="FranchisorDashboard" component={FranchisorDashboard} />
        {/* <Stack.Screen name="CustomerDashboard" component={CustomerDashboard} /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;



import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { useUser } from '../context/UserContext';
import { ActivityIndicator, View } from 'react-native';

// Screens
import LandingScreen from '../screens/Intro/LandingScreen';
import GetStartedScreen from '../screens/Intro/GetStartedScreen';
import AuthNavigator from './AuthNavigator';
import FranchisePendingScreen from '../screens/Franchisee/FranchisePendingScreen';
import FranchiseRejectedScreen from '../screens/Franchisee/FranchiseRejectedScreen';
import FranchiseApplicationScreen from '../screens/Franchisee/FranchiseApplicationScreen';
import FranchisorNavigator from './Franchisor/FranchisorTabNavigator';
import FranchiseeTabNavigator from './Franchisee/FranchiseeTabNavigator';
import CustomerTabNavigator from './CustomTabNavigator';
import { useNavigation } from '@react-navigation/native';
import ProductDetailsScreen from '../screens/Customer/ProductDetailsScreen';
import CheckoutScreen from '../screens/Customer/CheckoutScreen';
import FranchisorProfileScreen from '../screens/Franchisor/FranchisorProfileScreen';

import FranchisorStackNavigator from './Franchisor/FranchisorStackNavigator';
import FranchiseeStackNavigator from './Franchisee/FranchiseeStackNavigator';

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
  ProductDetails: { product: any };
  CheckOut : undefined;
};

const Stack = createNativeStackNavigator<AppStackParamList>();

const AppNavigator = () => {
  const { user, isLoading } = useUser();

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  const role = user?.role;
  const franchiseStatus = user?.franchiseStatus;

  console.log('Role:', role);
  console.log('Franchise Status:', franchiseStatus);

  const renderFranchiseeScreens = () => {
  switch (franchiseStatus) {
    case 'Not_applied':
      return <Stack.Screen name="FranchiseApplication" component={FranchiseApplicationScreen} />;
    case 'Pending':
      return <Stack.Screen name="FranchisePending" component={FranchisePendingScreen} />;
    case 'Rejected':
      return <Stack.Screen name="FranchiseRejected" component={FranchiseRejectedScreen} />;
    case 'Approved':
      return <Stack.Screen name="FranchiseeDashboard" component={FranchiseeStackNavigator} />;
    default:
      return <Stack.Screen name="FranchiseApplication" component={FranchiseApplicationScreen} />;
  }
};


  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {/* Public screens */}
        {!user && (
          <>
            <Stack.Screen name="Landing" component={LandingScreen} />
            <Stack.Screen name="GetStarted" component={GetStartedScreen} />
            <Stack.Screen name="Auth" component={AuthNavigator} />
          </>
        )}


        {role === 'franchisee' && renderFranchiseeScreens()}


        {/* Franchisor */}
        {role === 'franchisor' && (
          
          <Stack.Screen name="FranchisorDashboard" component={FranchisorStackNavigator} />
        )}

        {/* Customer */}
        {role === 'customer' && (
          <><Stack.Screen name="CustomerDashboard" component={CustomerTabNavigator} />
          <Stack.Screen name="ProductDetails" component={ProductDetailsScreen} /></>
        )}

        {/* Final fallback — invalid role */}
        {user && !['franchisee', 'franchisor', 'customer'].includes(role as string) && (
          <Stack.Screen name="Landing" component={LandingScreen} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;

// navigation/FranchiseeTabNavigator.tsx
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import DashboardScreen from '../../screens/Franchisee/FranchiseeHomeScreen';
import ProductsScreen from '../../screens/Franchisee/FranchiseeProductsScreen';
import OrdersScreen from '../../screens/Franchisee/FranchiseeOrdersScreen';
import StockRequestScreen from '../../screens/Franchisee/FranchiseeStockRequestScreen';
import MoreScreen from '../../screens/Franchisor/MoreScreen';

const Tab = createBottomTabNavigator();

const FranchisorTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName: string = '';

          switch (route.name) {
            case 'Home':
              iconName = 'home-outline';
              break;
            case 'Products':
              iconName = 'shopping-outline';
              break;
            case 'Orders':
              iconName = 'package-variant';
              break;
            case 'StockRequest':
              iconName = 'truck-fast  ';
              break;
            case 'More':
              iconName = 'dots-horizontal';
              break;
            default:
              iconName = 'help-circle-outline';
          }

          return <Icon name={iconName} size={size} color={color} />;
        },
        headerShown: false,
      })}
    >
      <Tab.Screen name="Home" component={DashboardScreen} />
      <Tab.Screen name="Products" component={ProductsScreen} />
      <Tab.Screen name="Orders" component={OrdersScreen} />
      <Tab.Screen name="StockRequest" component={StockRequestScreen} />
      <Tab.Screen name="More" component={MoreScreen} />
    </Tab.Navigator>
  );
};

export default FranchisorTabNavigator;

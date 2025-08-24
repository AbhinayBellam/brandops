

// navigation/FranchisorTabNavigator.tsx
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import DashboardScreen from '../../screens/Franchisor/DashboardScreen';
import FranchisesScreen from '../../screens/Franchisor/FranchisesScreen';
import ViewProductsScreen from '../../screens/Franchisor/ViewProductsScreen';
import ReportsScreen from '../../screens/Franchisor/ReportsScreen';
import MoreScreen from '../../screens/Franchisor/MoreScreen';

import { colors } from '../../utils/colors';

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
            case 'Franchises':
              iconName = 'office-building-outline';
              break;
            case 'Products':
              iconName = 'shopping-outline';
              break;
            case 'Reports':
              iconName = 'chart-bar';
              break;
            case 'More':
              iconName = 'dots-horizontal';
              break;
            default:
              iconName = 'help-circle-outline';
          }

          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: colors.secondary1,
        tabBarInactiveTintColor: colors.primary1,
        tabBarStyle: {
          backgroundColor: colors.background,       // tab bar background
          borderTopWidth: 0,
          elevation: 5,
        },
        headerShown: false,
      })}
    >
      <Tab.Screen name="Home" component={DashboardScreen} />
      <Tab.Screen name="Franchises" component={FranchisesScreen} />
      <Tab.Screen name="Products" component={ViewProductsScreen} />
      <Tab.Screen name="Reports" component={ReportsScreen} />
      <Tab.Screen name="More" component={MoreScreen} />
    </Tab.Navigator>
  );
};

export default FranchisorTabNavigator;

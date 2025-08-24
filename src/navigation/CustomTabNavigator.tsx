// CustomerTabNavigator.tsx
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import CustomerDashboardScreen from '../screens/Customer/CustomerDashboardScreen';
import CartScreen from '../screens/Customer/CartScreen';
import OrdersScreen from '../screens/Customer/OrdersScreen';
import ProfileScreen from '../screens/Customer/ProfileScreen';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import CheckoutScreen from '../screens/Customer/CheckoutScreen';

const Tab = createBottomTabNavigator();

const CustomerTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ color, size }) => {
          let iconName = 'home';

          switch (route.name) {
            case 'Home':
              iconName = 'home';
              break;
            case 'Orders':
              iconName = 'package-variant';
              break;
            case 'Cart':
              iconName = 'cart';
              break;
            case 'CheckOut':
              iconName = 'cash-register';
              break;
          }

          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#2980b9',
        tabBarInactiveTintColor: '#aaa',
        tabBarLabelStyle: { fontSize: 12 },
      })}
    >
      <Tab.Screen name="Home" component={CustomerDashboardScreen} />
      <Tab.Screen name="Orders" component={OrdersScreen} />
      <Tab.Screen name="Cart" component={CartScreen} />
      <Tab.Screen name="CheckOut" component={CheckoutScreen} />
    </Tab.Navigator>
  );
};

export default CustomerTabNavigator;

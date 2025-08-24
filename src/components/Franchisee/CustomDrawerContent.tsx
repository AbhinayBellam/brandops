import React from 'react';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';

const drawerItems = [
  { label: 'Home', screen: 'Dashboard' },
  { label: 'Products', screen: 'FranhciseeProducts' },
  { label: 'Orders', screen: 'FranchiseeOrders' },
  { label: 'Stock Requests', screen: 'FranchiseeStockRequest' },
  { label: 'OrderPayments', screen: 'FranchiseeOrderPayments' },
  { label: 'Pay Commission', screen: 'FranchiseePayCommission' },
  { label: 'Earings', screen: 'FranchiseeEarnings' },
];

const CustomDrawerContent = (props: any) => {
  const navigation = useNavigation();

  return (
    <DrawerContentScrollView {...props}>
      {drawerItems.map((item, index) => (
        <DrawerItem
          key={index}
          label={item.label}
          onPress={() => navigation.navigate(item.screen as never)}
          icon={({ color, size }) => (
            <Icon name="chevron-right" size={size} color={color} />
          )}
        />
      ))}
    </DrawerContentScrollView>
  );
};

export default CustomDrawerContent;

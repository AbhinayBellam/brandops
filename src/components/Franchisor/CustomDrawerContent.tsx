import React from 'react';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';

const drawerItems = [
  { label: 'Home', screen: 'Dashboard' },
  { label: 'Franchises', screen: 'Franchises' },
  { label: 'Franchise Applications', screen: 'FranchiseApplications' },
  { label: 'Stock Requests', screen: 'StockRequests' },
  { label: 'Stock Levels', screen: 'StockLevels' },
  { label: 'Products', screen: 'ViewProducts' },
  { label: 'Commissions and Earnings', screen: 'Commissions' },
  { label: 'Reports', screen: 'Reports' },
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

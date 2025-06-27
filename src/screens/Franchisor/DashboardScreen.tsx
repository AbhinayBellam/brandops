import React, { useState } from 'react';
import {
  View, Text, TouchableOpacity, ScrollView, SafeAreaView
} from 'react-native';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import styles from '../../styles/Franchisor/franchisorDashboradStyles';
import { Menu, Provider } from 'react-native-paper';
import { useNavigation, DrawerActions } from '@react-navigation/native';

// Dummy data for overview
const stats = {
  totalFranchises: 10,
  totalProducts: 120,
  totalRevenue: '₹2,50,000',
  commissionEarned: '₹45,000',
  totalApplications: 18,
  salesPerFranchise: [
    { name: 'Franchise A', sales: 50000 },
    { name: 'Franchise B', sales: 30000 },
  ]
};

const Drawer = createDrawerNavigator();

function CustomDrawerContent(props: any) {
  return (
    <DrawerContentScrollView {...props}>
      {[
        'Home',
        'Franchises',
        'Franchise Applications',
        'Stock Requests',
        'Stock Levels',
        'Products',
        'Commissions and Earnings',
        'Reports'
      ].map((item, index) => (
        <DrawerItem
          key={index}
          label={item}
          onPress={() => console.log(`Navigate to ${item}`)}
          icon={({ color, size }) => (
            <Icon name="chevron-right" size={size} color={color} />
          )}
        />
      ))}
    </DrawerContentScrollView>
  );
}

function DashboardContent() {
  const [menuVisible, setMenuVisible] = useState(false);
  const navigation = useNavigation();
  const userName = "Abhinay"; // Replace with dynamic name from state/context

  const openMenu = () => setMenuVisible(true);
  const closeMenu = () => setMenuVisible(false);

  return (
    <Provider>
      <SafeAreaView style={styles.safeArea}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.dispatch(DrawerActions.openDrawer())}>
            <Icon name="menu" size={28} color="#000" />
          </TouchableOpacity>
          <Text style={styles.title}>Franchise Management System</Text>
          <Menu
            visible={menuVisible}
            onDismiss={closeMenu}
            anchor={
              <TouchableOpacity onPress={openMenu} style={styles.profileCircle}>
                <Text style={styles.profileText}>{userName[0]}</Text>
              </TouchableOpacity>
            }
          >
            <Menu.Item onPress={() => console.log('Profile')} title="Profile" />
            <Menu.Item onPress={() => console.log('Logout')} title="Logout" />
          </Menu>
        </View>

        {/* Overview Content */}
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <View style={styles.card}><Text>Total Franchises: {stats.totalFranchises}</Text></View>
          <View style={styles.card}><Text>Total Products: {stats.totalProducts}</Text></View>
          <View style={styles.card}><Text>Total Revenue: {stats.totalRevenue}</Text></View>
          <View style={styles.card}><Text>Commission Earned: {stats.commissionEarned}</Text></View>
          <View style={styles.card}><Text>Franchise Applications: {stats.totalApplications}</Text></View>
          <View style={styles.salesSection}>
            <Text style={styles.salesTitle}>Sales per Franchise:</Text>
            {stats.salesPerFranchise.map((franchise, index) => (
              <Text key={index}>{franchise.name}: ₹{franchise.sales}</Text>
            ))}
          </View>
        </ScrollView>
      </SafeAreaView>
    </Provider>
  );
}

export default function FranchiseDashboardScreen() {
  return (
    <Drawer.Navigator
      screenOptions={{ headerShown: false }}
      drawerContent={(props) => <CustomDrawerContent {...props} />}
    >
      <Drawer.Screen name="DashboardContent" component={DashboardContent} />
    </Drawer.Navigator>
  );
}

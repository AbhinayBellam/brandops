// import React, { useState } from 'react';
// import {
//   View, Text, TouchableOpacity, ScrollView
// } from 'react-native';
// import { SafeAreaView } from 'react-native-safe-area-context';

// import { createDrawerNavigator, DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
// import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
// import styles from '../../styles/Franchisor/franchisorDashboradStyles';
// import { Menu, Provider } from 'react-native-paper';
// import { useNavigation, DrawerActions } from '@react-navigation/native';

// import FranchisesScreen from './FranchisesScreen';
// import FranchiseApplicationsScreen from './FranchiseApplicationsScreen';
// import StockRequestsScreen from './StockRequestsScreen';
// import StockLevelsScreen from './StockLevelsScreen';
// import ViewProductsScreen from './ViewProductsScreen';
// import CommissionsScreen from './CommissionsScreen';
// import ReportsScreen from './ReportsScreen';


// // Dummy data for overview
// const stats = {
//   totalFranchises: 10,
//   totalProducts: 120,
//   totalRevenue: '₹2,50,000',
//   commissionEarned: '₹45,000',
//   totalApplications: 18,
//   salesPerFranchise: [
//     { name: 'Franchise A', sales: 50000 },
//     { name: 'Franchise B', sales: 30000 },
//   ]
// };

// const Drawer = createDrawerNavigator();

// function CustomDrawerContent(props: any) {
//   const { navigation } = props;

//   const drawerItems = [
//     { label: 'Home', route: 'Dashboard', icon: 'home' },
//   { label: 'Franchises', route: 'Franchises', icon: 'store' },
//   { label: 'Franchise Applications', route: 'FranchiseApplications', icon: 'clipboard-list' },
//   { label: 'Stock Requests', route: 'StockRequests', icon: 'truck-fast' },
//   { label: 'Stock Levels', route: 'StockLevels', icon: 'chart-bar' },
//   { label: 'Products', route: 'ViewProducts', icon: 'cube' },
//   { label: 'Commissions and Earnings', route: 'Commissions', icon: 'cash-multiple' },
//   { label: 'Reports', route: 'Reports', icon: 'file-chart' },
//   ];

//   return (
//     <SafeAreaView style={{ flex: 1 }}>
//       <DrawerContentScrollView {...props}>
//         {drawerItems.map((item, index) => (
//           <DrawerItem
//             key={index}
//             label={item.label}
//             onPress={() => navigation.navigate(item.route)}
//             icon={({ color, size }) => (
//               <Icon name={item.icon} size={size} color={color} />
//             )}
//           />
//         ))}
//       </DrawerContentScrollView>
//     </SafeAreaView>
//   );
// }


// function DashboardContent({ navigation }: any) {
//   const [menuVisible, setMenuVisible] = useState(false);
//   const userName = "Abhinay";


//   const openMenu = () => setMenuVisible(true);
//   const closeMenu = () => setMenuVisible(false);

//   return (
//     <Provider>
//       <SafeAreaView style={styles.safeArea}>
//         {/* Header */}
//         <View style={styles.header}>
//           <TouchableOpacity
//   onPress={() => {
//     console.log("Menu pressed");
//     navigation.dispatch(DrawerActions.openDrawer());
//   }}
//   style={{ backgroundColor: 'white', padding: 10 }} // Debugging
// >
//   <Icon name="menu" size={28} color="#000" />
// </TouchableOpacity>


//           <Text style={styles.title}>Franchise Management System</Text>
//           <Menu
//             visible={menuVisible}
//             onDismiss={closeMenu}
//             anchor={
//               <TouchableOpacity onPress={openMenu} style={styles.profileCircle}>
//                 <Text style={styles.profileText}>{userName[0]}</Text>
//               </TouchableOpacity>
//             }
//           >
//             <Menu.Item onPress={() => console.log('Profile')} title="Profile" />
//             <Menu.Item onPress={() => console.log('Logout')} title="Logout" />
//           </Menu>
//         </View>

//         {/* Overview Content */}
//         {/* <ScrollView contentContainerStyle={styles.scrollContainer}> */}
// <ScrollView
//   contentContainerStyle={styles.scrollContainer}
//   keyboardShouldPersistTaps="handled"
//   nestedScrollEnabled={true}
// >
//   {/* Row 1 */}
//   <View style={styles.row}>
//     <View style={styles.card}><Text>Total Franchises: {stats.totalFranchises}</Text></View>
//     <View style={styles.card}><Text>Total Revenue: {stats.totalRevenue}</Text></View>
//   </View>

//   {/* Row 2 */}
//   <View style={styles.card}><Text>Commission Earned: {stats.commissionEarned}</Text></View>

//   {/* Row 3 */}
//   <View style={styles.card}><Text>Franchise Applications: {stats.totalApplications}</Text></View>

//   {/* Sales Section */}
//   <View style={styles.salesSection}>
//     <Text style={styles.salesTitle}>Sales per Franchise:</Text>
//     {stats.salesPerFranchise.map((franchise, index) => (
//       <Text key={index}>{franchise.name}: ₹{franchise.sales}</Text>
//     ))}
//   </View>
// </ScrollView>

//       </SafeAreaView>
//     </Provider>
//   );
// }

// export default function FranchiseDashboardScreen() {
//   return (
//     <Drawer.Navigator
//       screenOptions={{ headerShown: false }}
//       drawerContent={(props) => <CustomDrawerContent {...props} />}
//     >
//       <Drawer.Screen name="DashboardContent" component={DashboardContent} />
//     </Drawer.Navigator>
//   );
// }


import React, { useState } from 'react';
import {
  View, Text, TouchableOpacity, ScrollView
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { createDrawerNavigator, DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import styles from '../../styles/Franchisor/franchisorDashboradStyles';
import { Menu, Provider } from 'react-native-paper';
import { useNavigation, DrawerActions } from '@react-navigation/native';

import FranchisesScreen from './FranchisesScreen';
import FranchiseApplicationsScreen from './FranchiseApplicationsScreen';
import StockRequestsScreen from './StockRequestsScreen';
import StockLevelsScreen from './StockLevelsScreen';
import ViewProductsScreen from './ViewProductsScreen';
import CommissionsScreen from './CommissionsScreen';
import ReportsScreen from './ReportsScreen';
import LogoutButton from '../../components/Franchisor/LogoutButton';

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
  const { navigation } = props;

  const drawerItems = [
    { label: 'Home', route: 'DashboardContent', icon: 'home' },
    { label: 'Franchises', route: 'Franchises', icon: 'store' },
    { label: 'Franchise Applications', route: 'FranchiseApplications', icon: 'clipboard-list' },
    { label: 'Stock Requests', route: 'StockRequests', icon: 'truck-fast' },
    { label: 'Stock Levels', route: 'StockLevels', icon: 'chart-bar' },
    { label: 'Products', route: 'ViewProducts', icon: 'cube' },
    { label: 'Commissions and Earnings', route: 'Commissions', icon: 'cash-multiple' },
    { label: 'Reports', route: 'Reports', icon: 'file-chart' },
  ];

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <DrawerContentScrollView {...props}>
        {drawerItems.map((item, index) => (
          <DrawerItem
            key={index}
            label={item.label}
            onPress={() => navigation.navigate(item.route)}
            icon={({ color, size }) => (
              <Icon name={item.icon} size={size} color={color} />
            )}
          />
        ))}
      </DrawerContentScrollView>
    </SafeAreaView>
  );
}

function DashboardContent({ navigation }: any) {
  const [menuVisible, setMenuVisible] = useState(false);
  const userName = "Abhinay";

  const openMenu = () => setMenuVisible(true);
  const closeMenu = () => setMenuVisible(false);

  return (
    <Provider>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
            style={{ backgroundColor: 'white', padding: 10 }}
          >
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
            {/* <Menu.Item onPress={() => console.log('Logout')} title="Logout" /> */}
            <LogoutButton />
          </Menu>
        </View>

        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          keyboardShouldPersistTaps="handled"
          nestedScrollEnabled={true}
        >
          <View style={styles.row}>
            <View style={styles.card}><Text>Total Franchises: {stats.totalFranchises}</Text></View>
            <View style={styles.card}><Text>Total Revenue: {stats.totalRevenue}</Text></View>
          </View>

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
      <Drawer.Screen name="Franchises" component={FranchisesScreen} />
      <Drawer.Screen name="FranchiseApplications" component={FranchiseApplicationsScreen} />
      <Drawer.Screen name="StockRequests" component={StockRequestsScreen} />
      <Drawer.Screen name="StockLevels" component={StockLevelsScreen} />
      <Drawer.Screen name="ViewProducts" component={ViewProductsScreen} />
      <Drawer.Screen name="Commissions" component={CommissionsScreen} />
      <Drawer.Screen name="Reports" component={ReportsScreen} />
    </Drawer.Navigator>
  );
}

// // AppNavigator.tsx
// import React, { useEffect, useState } from 'react';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import LandingScreen from '../screens/Intro/LandingScreen';
// import GetStartedScreen from '../screens/Intro/GetStartedScreen';
// import AuthNavigator from './AuthNavigator';
// import FranchiseeDashboard from '../screens/Franchisee/FranchiseDashboard';
// import FranchisePendingScreen from '../screens/Franchisee/FranchisePendingScreen';
// import FranchiseRejectedScreen from '../screens/Franchisee/FranchiseRejectedScreen';
// import FranchiseApplicationScreen from '../screens/Franchisee/FranchiseApplicationScreen';
// // import FranchisorDashboard from '../screens/Franchisor/FranchisorDashboard';
// // import CustomerDashboard from '../screens/Customer/CustomerDashboard';
// import { useUser } from '../context/UserContext';
// import AsyncStorage from '@react-native-async-storage/async-storage';

// export type AppStackParamList = {
//   Landing: undefined;
//   GetStarted: undefined;
//   Auth: undefined;
//   FranchiseeDashboard: undefined;
//   FranchisePending: undefined;
//   FranchiseRejected: undefined;
//   FranchiseApplication: undefined;
//   FranchisorDashboard: undefined;
//   CustomerDashboard: undefined;
// };

// const Stack = createNativeStackNavigator<AppStackParamList>();

// const AppNavigator = () => {
//   const { user, isLoading } = useUser();
//   const [isFirstLaunch, setIsFirstLaunch] = useState<boolean | null>(null);

//   useEffect(() => {
//     const checkFirstLaunch = async () => {
//       const hasLaunched = await AsyncStorage.getItem('hasLaunched');
//       if (hasLaunched === null) {
//         await AsyncStorage.setItem('hasLaunched', 'true');
//         setIsFirstLaunch(true);
//       } else {
//         setIsFirstLaunch(false);
//       }
//     };
//     checkFirstLaunch();
//   }, []);

//   if (isLoading || isFirstLaunch === null) return null;

//   return (
//     <Stack.Navigator
//       screenOptions={{ headerShown: false }}
//       initialRouteName={
//         !user?.token
//           ? isFirstLaunch
//             ? 'Landing'
//             : 'GetStarted'
//           : 'FranchiseeDashboard' // Can be adjusted based on role later
//       }
//     >
//       {!user?.token ? (
//         <>
//           <Stack.Screen name="Landing" component={LandingScreen} />
//           <Stack.Screen name="GetStarted" component={GetStartedScreen} />
//           <Stack.Screen name="Auth" component={AuthNavigator} />
//         </>
//       ) : (
//         <>
//           <Stack.Screen name="FranchiseeDashboard" component={FranchiseeDashboard} />
//           <Stack.Screen name="FranchisePending" component={FranchisePendingScreen} />
//           <Stack.Screen name="FranchiseRejected" component={FranchiseRejectedScreen} />
//           <Stack.Screen name="FranchiseApplication" component={FranchiseApplicationScreen} />
//           {/* <Stack.Screen name="FranchisorDashboard" component={FranchisorDashboard} /> */}
//           {/* <Stack.Screen name="CustomerDashboard" component={CustomerDashboard} /> */}
//         </>
//       )}
//     </Stack.Navigator>
//   );
// };

// export default AppNavigator;

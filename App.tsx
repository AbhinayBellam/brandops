import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './src/navigation/AppNavigator';
import { UserProvider } from './src/context/UserContext';


export default function App() {
  return (
    <UserProvider>
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    </UserProvider>
  );
}


// import React from 'react';
// import { NavigationContainer } from '@react-navigation/native';
// import FranchisorDrawerNavigator from './src/navigation/FranchisorDrawerNavigator'; 
// import DashboardScreen from './src/screens/Franchisor/DashboardScreen';

// const App = () => {
//   return (
//     <NavigationContainer>
//       <FranchisorDrawerNavigator />
//     </NavigationContainer>
//   );
// };

// export default App;



// App.tsx

// import React from 'react';
// import { NavigationContainer } from '@react-navigation/native';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import DashboardScreen from './src/screens/Franchisor/DashboardScreen';

// const Stack = createNativeStackNavigator();

// const App = () => {
//   return (
//     <NavigationContainer>
//       <Stack.Navigator>
//         <Stack.Screen name="Dashboard" component={DashboardScreen} />
//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// };

// export default App;

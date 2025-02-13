// import React from 'react';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import HomeScreen from '../screens/HomeScreen';
// import ListScreen from '../screens/ListScreen';
// import DetailScreen from '../screens/DetailScreen';
// import AddEditScreen from '../screens/AddEditScreen';
// import BottomNavBar from '../components/BottomNavBar';

// const Stack = createNativeStackNavigator();

// export default function StackNavigator() {
//   return (
//     <Stack.Navigator initialRouteName="Home">
//       <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Home' }} />
//       <Stack.Screen name="List" component={ListScreen} options={{ title: 'Task List' }} />
//       <Stack.Screen name="Detail" component={DetailScreen} options={{ title: 'Task Details' }} />
//       <Stack.Screen name="AddEdit" component={AddEditScreen} options={{ title: 'Add/Edit Task' }} />
//     </Stack.Navigator>
//   );
// }





// navigation/StackNavigator.js
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BottomNavBar from '../components/BottomNavBar';
import DetailScreen from '../screens/DetailScreen';
import AddEditScreen from '../screens/AddEditScreen';

const Stack = createNativeStackNavigator();

export default function StackNavigator() {
  return (
    <Stack.Navigator initialRouteName="Main">
      <Stack.Screen name="Main" component={BottomNavBar} options={{ headerShown: false }} />
      <Stack.Screen name="Detail" component={DetailScreen} options={{ title: 'Task Details' }} />
      <Stack.Screen name="AddEdit" component={AddEditScreen} options={{ title: 'Add/Edit Task' }} />
    </Stack.Navigator>
  );
}
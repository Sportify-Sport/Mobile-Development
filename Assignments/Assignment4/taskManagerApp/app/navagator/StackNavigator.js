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
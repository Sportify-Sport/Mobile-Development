import React from 'react';
// import { NavigationContainer } from '@react-navigation/native';
import StackNavigator from './navagator/StackNavigator';
import { TaskProvider } from './components/TaskContext';

export default function App() {
  return (
    <TaskProvider>
      <StackNavigator />
  </TaskProvider>
  );
}
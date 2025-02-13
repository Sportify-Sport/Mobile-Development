// storage.js
import AsyncStorage from '@react-native-async-storage/async-storage';

// Save tasks to AsyncStorage
export const saveTasks = async (tasks) => {
  try {
    await AsyncStorage.setItem('tasks', JSON.stringify(tasks));
  } catch (error) {
    console.error('Failed to save tasks:', error);
  }
};

// Load tasks from AsyncStorage
export const loadTasks = async () => {
  try {
    const savedTasks = await AsyncStorage.getItem('tasks');
    if (savedTasks !== null) {
      return JSON.parse(savedTasks);
    }
    return []; // Return an empty array if no tasks are saved
  } catch (error) {
    console.error('Failed to load tasks:', error);
    return []; // Return an empty array in case of error
  }
};
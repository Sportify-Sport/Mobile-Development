// AddEditScreen.js
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { saveTasks } from '../components/storage'; // Import the saveTasks function

export default function AddEditScreen({ route, navigation }) {
  // Extract parameters from route
  const { tasks, setTasks, task: existingTask, updateTask } = route.params;

  // State for title and description
  const [title, setTitle] = useState(existingTask ? existingTask.name : '');
  const [description, setDescription] = useState(existingTask ? existingTask.description : '');

  // Function to handle saving the task
  const handleSaveTask = () => {
    if (title.trim() === '') {
      Alert.alert('Error', 'Please enter a title for the task.');
      return;
    }

    let updatedTask;

    if (existingTask) {
      // Edit existing task
      updatedTask = { ...existingTask, name: title, description: description };
      const updatedTasks = tasks.map((t) => (t.id === existingTask.id ? updatedTask : t));
      setTasks(updatedTasks); // Update tasks in the parent (ListScreen)
      saveTasks(updatedTasks); // Save tasks to AsyncStorage
      if (updateTask) {
        updateTask(updatedTask); // Update task in DetailScreen
      }
    } else {
      // Add new task
      updatedTask = {
        id: Date.now().toString(), // Generate a unique ID
        name: title,
        description: description,
        completed: false,
      };
      const updatedTasks = [...tasks, updatedTask];
      setTasks(updatedTasks); // Update tasks in the parent (ListScreen)
      saveTasks(updatedTasks); // Save tasks to AsyncStorage
    }

    navigation.goBack(); // Navigate back to the previous screen
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{existingTask ? 'Edit Task' : 'Add New Task'}</Text>

      {/* Input for task title */}
      <TextInput
        style={styles.input}
        placeholder="Title"
        value={title}
        onChangeText={setTitle}
      />

      {/* Input for task description */}
      <TextInput
        style={[styles.input, styles.descriptionInput]}
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
        multiline
      />

      {/* Save button */}
      <Button title="Save" onPress={handleSaveTask} />
    </View>
  );
};

// Styles for the component
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
    backgroundColor: '#fff',
  },
  descriptionInput: {
    height: 100,
  },
});
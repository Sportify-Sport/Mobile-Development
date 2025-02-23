import React, { useState } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

const DetailScreen = ({ route, navigation }) => {
  const { task: initialTask } = route.params; // Get the task from navigation params
  const [task, setTask] = useState(initialTask); // Local state for the task

  // Function to update the task in DetailScreen
  const updateTask = (updatedTask) => {
    setTask(updatedTask); // Update local state
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Task Details</Text>
      <View style={styles.detailsContainer}>
        <Text style={styles.label}>Title:</Text>
        <Text style={styles.value}>{task.name}</Text>
      </View>
      <View style={styles.detailsContainer}>
        <Text style={styles.label}>Description:</Text>
        <Text style={styles.value}>{task.description}</Text>
      </View>
      <View style={styles.detailsContainer}>
        <Text style={styles.label}>Status:</Text>
        <Text style={styles.value}>{task.completed ? 'Completed' : 'Not Completed'}</Text>
      </View>

      {/* Edit Button */}
      <Button
        title="Edit Task"
        onPress={() =>
          navigation.navigate('AddEdit', { mode: 'edit', task, updateTask }) // Pass updateTask
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  detailsContainer: {
    marginBottom: 15,
  },
  label: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  value: {
    fontSize: 16,
    color: '#555',
    marginTop: 5,
  },
});

export default DetailScreen;
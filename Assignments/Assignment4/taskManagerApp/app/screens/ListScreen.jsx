// screens/ListScreen.js
import React, { useState, useEffect } from 'react';
import { View, FlatList, Text, StyleSheet } from 'react-native';
import TaskItem from '../components/TaskItem';

export default function ListScreen({ navigation }) {
  // Static sample tasks—for now.
  const [tasks, setTasks] = useState([
    { id: '1', title: 'Sample Task 1', description: 'Details for task 1', completed: false },
    { id: '2', title: 'Sample Task 2', description: 'Details for task 2', completed: false },
  ]);

  // Function to delete a task by filtering it out.
  const deleteTask = (id) => {
    setTasks((currentTasks) => currentTasks.filter(task => task.id !== id));
  };

  // Render each task item using the TaskItem component.
  const renderItem = ({ item }) => (
    <TaskItem
      task={item}
      onPress={() => navigation.navigate('Detail', { task: item })}
      onDelete={() => deleteTask(item.id)}
    />
  );

  return (
    <View style={styles.container}>
      <FlatList 
        data={tasks}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        ListEmptyComponent={<Text style={styles.emptyText}>No tasks available.</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  emptyText: {
    textAlign: 'center',
    fontSize: 18,
    marginTop: 20,
  },
});
import React, { useState, useEffect } from 'react';
import { View, FlatList, Text, StyleSheet, TouchableOpacity } from 'react-native';
import TaskItem from '../components/TaskItem';
import { saveTasks, loadTasks } from '../components/storage'; // Import the storage functions

export default function ListScreen({ route, navigation }) {
  const { tasks: initialTasks, setTasks } = route.params;
  const [tasks, setLocalTasks] = useState(initialTasks);

  // Load tasks from AsyncStorage when the component mounts
  useEffect(() => {
    const fetchTasks = async () => {
      const loadedTasks = await loadTasks();
      setLocalTasks(loadedTasks);
    };
    fetchTasks();
  }, []);

  // Save tasks to AsyncStorage whenever the tasks array changes
  useEffect(() => {
    saveTasks(tasks);
    setTasks(tasks); // Update tasks in the parent (HomeScreen)
  }, [tasks]);

  const deleteTask = (id) => {
    const updatedTasks = tasks.filter((task) => task.id !== id);
    setLocalTasks(updatedTasks);
  };

  const handleTaskCheck = (updatedTask) => {
    const updatedTasks = tasks.map((task) =>
      task.id === updatedTask.id ? updatedTask : task
    );
    setLocalTasks(updatedTasks);
  };

  const handleTaskPress = (task) => {
    navigation.navigate('Detail', { task, tasks, setTasks: setLocalTasks });
  };

  const renderItem = ({ item }) => (
    <TaskItem
      task={item}
      onPress={() => handleTaskPress(item)}
      onDelete={() => deleteTask(item.id)}
      onCheck={handleTaskCheck}
    />
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Task List</Text>
      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        ListEmptyComponent={<Text style={styles.emptyText}>No tasks available.</Text>}
      />
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate('AddEdit', { tasks, setTasks: setLocalTasks })}
      >
        <Text style={styles.addButtonText}>+</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 10, textAlign: 'center' },
  emptyText: { textAlign: 'center', fontSize: 18, marginTop: 20 },
  addButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#007bff',
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButtonText: {
    fontSize: 30,
    color: '#fff',
  },
});

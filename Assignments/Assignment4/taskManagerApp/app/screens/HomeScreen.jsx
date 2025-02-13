import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { loadTasks } from '../components/storage'; // Import the loadTasks function

export default function HomeScreen({ navigation }) {
  const [tasks, setTasks] = useState([]);

  // Load tasks from AsyncStorage when the component mounts
  useEffect(() => {
    const fetchTasks = async () => {
      const loadedTasks = await loadTasks();
      setTasks(loadedTasks);
    };
    fetchTasks();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Task Manager</Text>
      <Text>You have {tasks.length} tasks.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  title: { fontSize: 28, marginBottom: 20 },
});
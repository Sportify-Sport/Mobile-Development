// import React, { useState } from 'react';
// import { View, FlatList, Text, StyleSheet, Alert } from 'react-native';
// import TaskItem from '../components/TaskItem';

// export default function ListScreen({ route, navigation }) {
//   const { tasks: initialTasks, updateTasks } = route.params; // Get tasks and updateTasks function from HomeScreen
//   const [tasks, setTasks] = useState(initialTasks); // Local state for tasks array

// const deleteTask = (id) => {
//   console.log(`Delete task triggered for ID: ${id}`);
//   confirmDelete(id);
//     // Alert.alert(
//     //   'Confirm Delete',
//     //   'Are you sure you want to delete this task?',
//     //   [
//     //     { text: 'Cancel', style: 'cancel' },
//     //     { text: 'OK', onPress: () => confirmDelete(id) },
//     //   ],
//     //   { cancelable: true }
//     // );
// };

//   const confirmDelete = (id) => {
//     const updatedTasks = tasks.filter((task) => task.id !== id); // Remove task by id
//     setTasks(updatedTasks); // Update local state
//     updateTasks(updatedTasks); // Update tasks in the parent (HomeScreen)
//   };

//   // Function to handle task completion toggle
//   const handleTaskCheck = (updatedTask) => {
//     const updatedTasks = tasks.map((task) =>
//       task.id === updatedTask.id ? updatedTask : task
//     );
//     setTasks(updatedTasks); // Update local state with updated task status
//     updateTasks(updatedTasks); // Notify parent to update task list
//   };

//   // Render each task item using the TaskItem component.
//   const renderItem = ({ item }) => (
//     <TaskItem
//       task={item}
//       onPress={() => console.log(`Task clicked: ${item.name}`)} // Placeholder for navigation
//       onDelete={() => deleteTask(item.id)} // Pass delete function to TaskItem
//       onCheck={handleTaskCheck} // Pass onCheck handler to TaskItem
//     />
//   );

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Task List</Text>
//       <FlatList
//         data={tasks}
//         keyExtractor={(item) => item.id.toString()}
//         renderItem={renderItem}
//         ListEmptyComponent={<Text style={styles.emptyText}>No tasks available.</Text>}
//       />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1, padding: 20 },
//   title: { fontSize: 22, fontWeight: 'bold', marginBottom: 10, textAlign: 'center' },
//   emptyText: { textAlign: 'center', fontSize: 18, marginTop: 20 },
// });

import React, { useState } from 'react';
import { View, FlatList, Text, StyleSheet, Alert } from 'react-native';
import TaskItem from '../components/TaskItem';
import { useNavigation } from '@react-navigation/native'; // Import useNavigation hook

export default function ListScreen({ route, navigation }) {
  const { tasks: initialTasks, updateTasks } = route.params; // Get tasks and updateTasks function from HomeScreen
  const [tasks, setTasks] = useState(initialTasks); // Local state for tasks array
  const nav = useNavigation(); // Initialize navigation object using useNavigation hook

  const deleteTask = (id) => {
    console.log(`Delete task triggered for ID: ${id}`);
    confirmDelete(id);
  };

  const confirmDelete = (id) => {
    const updatedTasks = tasks.filter((task) => task.id !== id); // Remove task by id
    setTasks(updatedTasks); // Update local state
    updateTasks(updatedTasks); // Update tasks in the parent (HomeScreen)
  };

  // Function to handle task completion toggle
  const handleTaskCheck = (updatedTask) => {
    const updatedTasks = tasks.map((task) =>
      task.id === updatedTask.id ? updatedTask : task
    );
    setTasks(updatedTasks); // Update local state with updated task status
    updateTasks(updatedTasks); // Notify parent to update task list
  };

  // Navigate to DetailScreen when task is clicked
  const handleTaskPress = (task) => {
    nav.navigate('Detail', { task }); // Navigate to DetailScreen and pass task data as parameter
  };

  // Render each task item using the TaskItem component.
  const renderItem = ({ item }) => (
    <TaskItem
      task={item}
      onPress={() => handleTaskPress(item)} // Use handleTaskPress to navigate to DetailScreen
      onDelete={() => deleteTask(item.id)} // Pass delete function to TaskItem
      onCheck={handleTaskCheck} // Pass onCheck handler to TaskItem
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 10, textAlign: 'center' },
  emptyText: { textAlign: 'center', fontSize: 18, marginTop: 20 },
});

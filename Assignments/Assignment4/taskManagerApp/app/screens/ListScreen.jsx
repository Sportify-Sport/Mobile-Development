// import React, { useState, useEffect } from 'react';
// import { View, FlatList, Text, StyleSheet, TouchableOpacity } from 'react-native';
// import TaskItem from '../components/TaskItem';
// import { saveTasks, loadTasks } from '../components/storage'; // Import the storage functions

// export default function ListScreen({ route, navigation }) {
//   const { tasks: initialTasks, setTasks } = route.params;
//   const [tasks, setLocalTasks] = useState(initialTasks);

//   // Load tasks from AsyncStorage when the component mounts
//   useEffect(() => {
//     const fetchTasks = async () => {
//       const loadedTasks = await loadTasks();
//       setLocalTasks(loadedTasks);
//     };
//     fetchTasks();
//   }, []);

//   // Save tasks to AsyncStorage whenever the tasks array changes
//   useEffect(() => {
//     saveTasks(tasks);
//     setTasks(tasks); // Update tasks in the parent (HomeScreen)
//   }, [tasks]);

//   const deleteTask = (id) => {
//     const updatedTasks = tasks.filter((task) => task.id !== id);
//     setLocalTasks(updatedTasks);
//   };

//   const handleTaskCheck = (updatedTask) => {
//     const updatedTasks = tasks.map((task) =>
//       task.id === updatedTask.id ? updatedTask : task
//     );
//     setLocalTasks(updatedTasks);
//   };

//   const handleTaskPress = (task) => {
//     navigation.navigate('Detail', { task, tasks, setTasks: setLocalTasks });
//   };

//   const renderItem = ({ item }) => (
//     <TaskItem
//       task={item}
//       onPress={() => handleTaskPress(item)}
//       onDelete={() => deleteTask(item.id)}
//       onCheck={handleTaskCheck}
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
//       <TouchableOpacity
//         style={styles.addButton}
//         onPress={() => navigation.navigate('AddEdit', { tasks, setTasks: setLocalTasks })}
//       >
//         <Text style={styles.addButtonText}>+</Text>
//       </TouchableOpacity>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1, padding: 20 },
//   title: { fontSize: 22, fontWeight: 'bold', marginBottom: 10, textAlign: 'center' },
//   emptyText: { textAlign: 'center', fontSize: 18, marginTop: 20 },
//   addButton: {
//     position: 'absolute',
//     bottom: 20,
//     right: 20,
//     backgroundColor: '#007bff',
//     width: 50,
//     height: 50,
//     borderRadius: 25,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   addButtonText: {
//     fontSize: 30,
//     color: '#fff',
//   },
// });



// // screens/ListScreen.js
// import React, { useContext } from 'react';
// import { View, FlatList, Text, StyleSheet, TouchableOpacity } from 'react-native';
// import TaskItem from '../components/TaskItem';
// import { TaskContext } from '../components/TaskContext';

// export default function ListScreen({ navigation }) {
//   const { tasks, setTasks } = useContext(TaskContext);

//   const deleteTask = (id) => {
//     const updatedTasks = tasks.filter((task) => task.id !== id);
//     setTasks(updatedTasks);
//   };

//   const handleTaskCheck = (updatedTask) => {
//     const updatedTasks = tasks.map((task) =>
//       task.id === updatedTask.id ? updatedTask : task
//     );
//     setTasks(updatedTasks);
//   };

//   const handleTaskPress = (task) => {
//     navigation.navigate('Detail', { task });
//   };

//   const renderItem = ({ item }) => (
//     <TaskItem
//       task={item}
//       onPress={() => handleTaskPress(item)}
//       onDelete={() => deleteTask(item.id)}
//       onCheck={handleTaskCheck}
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
//       <TouchableOpacity
//         style={styles.addButton}
//         onPress={() => navigation.navigate('AddEdit')}
//       >
//         <Text style={styles.addButtonText}>+</Text>
//       </TouchableOpacity>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1, padding: 20 },
//   title: { fontSize: 22, fontWeight: 'bold', marginBottom: 10, textAlign: 'center' },
//   emptyText: { textAlign: 'center', fontSize: 18, marginTop: 20 },
//   addButton: {
//     position: 'absolute',
//     bottom: 20,
//     right: 20,
//     backgroundColor: '#007bff',
//     width: 50,
//     height: 50,
//     borderRadius: 25,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   addButtonText: {
//     fontSize: 30,
//     color: '#fff',
//   },
// });


// // screens/ListScreen.js
// import React, { useContext, useEffect } from 'react';
// import { View, FlatList, Text, StyleSheet, TouchableOpacity } from 'react-native';
// import TaskItem from '../components/TaskItem';
// import { TaskContext } from '../components/TaskContext';
// import { saveTasks, loadTasks } from '../components/storage'; // Import the storage functions

// export default function ListScreen({ navigation }) {
//   const { tasks, setTasks } = useContext(TaskContext);

//   // Load tasks from AsyncStorage when the component mounts
//   useEffect(() => {
//     const fetchTasks = async () => {
//       const loadedTasks = await loadTasks();
//       setTasks(loadedTasks);
//     };
//     fetchTasks();
//   }, []);

//   // Save tasks to AsyncStorage whenever the tasks array changes
//   useEffect(() => {
//     saveTasks(tasks);
//   }, [tasks]);

//   const deleteTask = (id) => {
//     const updatedTasks = tasks.filter((task) => task.id !== id);
//     setTasks(updatedTasks);
//   };

//   const handleTaskCheck = (updatedTask) => {
//     const updatedTasks = tasks.map((task) =>
//       task.id === updatedTask.id ? updatedTask : task
//     );
//     setTasks(updatedTasks);
//   };

//   const handleTaskPress = (task) => {
//     navigation.navigate('Detail', { task });
//   };

//   const renderItem = ({ item }) => (
//     <TaskItem
//       task={item}
//       onPress={() => handleTaskPress(item)}
//       onDelete={() => deleteTask(item.id)}
//       onCheck={handleTaskCheck}
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
//       <TouchableOpacity
//         style={styles.addButton}
//         onPress={() => navigation.navigate('AddEdit')}
//       >
//         <Text style={styles.addButtonText}>+</Text>
//       </TouchableOpacity>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1, padding: 20 },
//   title: { fontSize: 22, fontWeight: 'bold', marginBottom: 10, textAlign: 'center' },
//   emptyText: { textAlign: 'center', fontSize: 18, marginTop: 20 },
//   addButton: {
//     position: 'absolute',
//     bottom: 20,
//     right: 20,
//     backgroundColor: '#007bff',
//     width: 50,
//     height: 50,
//     borderRadius: 25,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   addButtonText: {
//     fontSize: 30,
//     color: '#fff',
//   },
// });



// screens/ListScreen.js
import React, { useContext, useEffect } from 'react';
import { View, FlatList, Text, StyleSheet, TouchableOpacity } from 'react-native';
import TaskItem from '../components/TaskItem';
import { TaskContext } from '../components/TaskContext';
import { saveTasks, loadTasks } from '../components/storage';

export default function ListScreen({ navigation }) {
  const { tasks, setTasks } = useContext(TaskContext);

  // Load tasks from AsyncStorage when the component mounts
  useEffect(() => {
    const fetchTasks = async () => {
      const loadedTasks = await loadTasks();
      setTasks(loadedTasks);
    };
    fetchTasks();
  }, []);

  // Save tasks to AsyncStorage whenever the tasks array changes
  useEffect(() => {
    saveTasks(tasks);
  }, [tasks]);

  // Function to handle deleting a task
  const deleteTask = (id) => {
    const updatedTasks = tasks.filter((task) => task.id !== id);
    setTasks(updatedTasks);
  };

  // Function to handle checking/unchecking a task
  const handleTaskCheck = (updatedTask) => {
    const updatedTasks = tasks.map((task) =>
      task.id === updatedTask.id ? updatedTask : task
    );
    setTasks(updatedTasks);
  };

  // Function to navigate to AddEditScreen for adding a new task
  const handleAddTask = () => {
    navigation.navigate('AddEdit', { mode: 'add' });
  };

  // Function to navigate to AddEditScreen for editing an existing task
  const handleEditTask = (task) => {
    navigation.navigate('AddEdit', { mode: 'edit', task });
  };

  // Render each task item
  const renderItem = ({ item }) => (
    <TaskItem
      task={item}
      onPress={() => handleEditTask(item)}
      onDelete={() => deleteTask(item.id)}
      onCheck={handleTaskCheck}
    />
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Task List</Text>

      {/* List of tasks */}
      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        ListEmptyComponent={<Text style={styles.emptyText}>No tasks available.</Text>}
      />

      {/* Add Task Button */}
      <TouchableOpacity style={styles.addButton} onPress={handleAddTask}>
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
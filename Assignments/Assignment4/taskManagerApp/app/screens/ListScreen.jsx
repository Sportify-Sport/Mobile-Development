// import React, { useState, useEffect } from 'react';
// import { View, FlatList, Text, StyleSheet, Alert, TouchableOpacity } from 'react-native';
// import TaskItem from '../components/TaskItem';
// import { useNavigation } from '@react-navigation/native';

// export default function ListScreen({ route, navigation }) {
//   const { tasks: initialTasks, updateTasks } = route.params; // Get tasks and updateTasks function from HomeScreen
//   const [tasks, setTasks] = useState(initialTasks); // Local state for tasks array

//   // Update local tasks when initialTasks changes
//   useEffect(() => {
//     setTasks(initialTasks);
//   }, [initialTasks]);

//   const deleteTask = (id) => {
//     console.log(`Delete task triggered for ID: ${id}`);
//     confirmDelete(id);
//   };

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


//   // Navigate to DetailScreen when task is clicked
//   const handleTaskPress = (task) => {
//     navigation.navigate('Detail', { task }); // Navigate to DetailScreen and pass task data as parameter
//   };

//   // Render each task item using the TaskItem component.
//   const renderItem = ({ item }) => (
//     <TaskItem
//       task={item}
//       onPress={() => handleTaskPress(item)} // Use handleTaskPress to navigate to DetailScreen
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

//       {/* Add Floating Action Button (FAB) */}
//       <TouchableOpacity
//         style={styles.addButton}
//         onPress={() => navigation.navigate('AddEdit', { tasks, updateTasks, setTasks})}
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



// import React, { useState, useEffect } from 'react';
// import { View, FlatList, Text, StyleSheet, Alert, TouchableOpacity } from 'react-native';
// import TaskItem from '../components/TaskItem';
// import { useNavigation } from '@react-navigation/native';

// export default function ListScreen({ route, navigation }) {
//   const { tasks: initialTasks } = route.params; // Get tasks from HomeScreen
//   const [tasks, setTasks] = useState(initialTasks); // Local state for tasks array

//   // Function to update tasks in the ListScreen
//   const updateTasks = (updatedTasks) => {
//     setTasks(updatedTasks); // Update local state
//   };

//   // Update local tasks when initialTasks changes
//   useEffect(() => {
//     setTasks(initialTasks);
//   }, [initialTasks]);

//   const deleteTask = (id) => {
//     console.log(`Delete task triggered for ID: ${id}`);
//     confirmDelete(id);
//   };

//   const confirmDelete = (id) => {
//     const updatedTasks = tasks.filter((task) => task.id !== id); // Remove task by id
//     setTasks(updatedTasks); // Update local state
//   };

//   // Function to handle task completion toggle
//   const handleTaskCheck = (updatedTask) => {
//     const updatedTasks = tasks.map((task) =>
//       task.id === updatedTask.id ? updatedTask : task
//     );
//     setTasks(updatedTasks); // Update local state with updated task status
//   };

//   // Navigate to DetailScreen when task is clicked
//   const handleTaskPress = (task) => {
//     navigation.navigate('Detail', { task }); // Navigate to DetailScreen and pass task data as parameter
//   };

//   // Render each task item using the TaskItem component.
//   const renderItem = ({ item }) => (
//     <TaskItem
//       task={item}
//       onPress={() => handleTaskPress(item)} // Use handleTaskPress to navigate to DetailScreen
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

//       {/* Add Floating Action Button (FAB) */}
//       <TouchableOpacity
//         style={styles.addButton}
//         onPress={() => navigation.navigate('AddEdit', { tasks, updateTasks })}
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





// import React, { useState, useEffect } from 'react';
// import { View, FlatList, Text, StyleSheet, Alert, TouchableOpacity } from 'react-native';
// import TaskItem from '../components/TaskItem';
// import { useNavigation, useRoute } from '@react-navigation/native';

// export default function ListScreen() {
//   const route = useRoute(); // Get the route object
//   const navigation = useNavigation(); // Get the navigation object
//   const { tasks: initialTasks, updateTasks } = route.params; // Get tasks and updateTasks function from route params
//   const [tasks, setTasks] = useState(initialTasks); // Local state for tasks array

//   // Update local tasks when route.params changes
//   useEffect(() => {
//     if (route.params?.tasks) {
//       setTasks(route.params.tasks); // Update local state with the latest tasks
//     }
//   }, [route.params?.tasks]);

//   const deleteTask = (id) => {
//     console.log(`Delete task triggered for ID: ${id}`);
//     confirmDelete(id);
//   };

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

//   // Navigate to DetailScreen when task is clicked
//   const handleTaskPress = (task) => {
//     navigation.navigate('Detail', { task }); // Navigate to DetailScreen and pass task data as parameter
//   };

//   // Render each task item using the TaskItem component.
//   const renderItem = ({ item }) => (
//     <TaskItem
//       task={item}
//       onPress={() => handleTaskPress(item)} // Use handleTaskPress to navigate to DetailScreen
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

//       {/* Add Floating Action Button (FAB) */}
//       <TouchableOpacity
//         style={styles.addButton}
//         onPress={() => navigation.navigate('AddEdit', { tasks, updateTasks })}
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



import React, { useState, useEffect } from 'react';
import { View, FlatList, Text, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import TaskItem from '../components/TaskItem';
import { useNavigation, useRoute } from '@react-navigation/native';

export default function ListScreen() {
  const route = useRoute(); // Get the route object
  const navigation = useNavigation(); // Get the navigation object
  const { tasks: initialTasks, updateTasks } = route.params; // Get tasks and updateTasks function from route params
  const [tasks, setTasks] = useState(initialTasks); // Local state for tasks array

  // Update local tasks when route.params changes
  useEffect(() => {
    if (route.params?.tasks) {
      setTasks(route.params.tasks); // Update local state with the latest tasks
    }
  }, [route.params?.tasks]);

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
    navigation.navigate('Detail', { task, tasks, updateTasks }); // Pass task, tasks, and updateTasks to DetailScreen
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

      {/* Add Floating Action Button (FAB) */}
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate('AddEdit', { tasks, updateTasks })}
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
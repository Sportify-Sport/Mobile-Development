// // AddEditScreen.js
// import React, { useState } from 'react';
// import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
// import { saveTasks } from '../components/storage'; // Import the saveTasks function

// export default function AddEditScreen({ route, navigation }) {
//   // Extract parameters from route
//   const { tasks, setTasks, task: existingTask, updateTask } = route.params;

//   // State for title and description
//   const [title, setTitle] = useState(existingTask ? existingTask.name : '');
//   const [description, setDescription] = useState(existingTask ? existingTask.description : '');

//   // Function to handle saving the task
//   const handleSaveTask = () => {
//     if (title.trim() === '') {
//       Alert.alert('Error', 'Please enter a title for the task.');
//       return;
//     }

//     let updatedTask;

//     if (existingTask) {
//       // Edit existing task
//       updatedTask = { ...existingTask, name: title, description: description };
//       const updatedTasks = tasks.map((t) => (t.id === existingTask.id ? updatedTask : t));
//       setTasks(updatedTasks); // Update tasks in the parent (ListScreen)
//       saveTasks(updatedTasks); // Save tasks to AsyncStorage
//       if (updateTask) {
//         updateTask(updatedTask); // Update task in DetailScreen
//       }
//     } else {
//       // Add new task
//       updatedTask = {
//         id: Date.now().toString(), // Generate a unique ID
//         name: title,
//         description: description,
//         completed: false,
//       };
//       const updatedTasks = [...tasks, updatedTask];
//       setTasks(updatedTasks); // Update tasks in the parent (ListScreen)
//       saveTasks(updatedTasks); // Save tasks to AsyncStorage
//     }

//     navigation.goBack(); // Navigate back to the previous screen
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>{existingTask ? 'Edit Task' : 'Add New Task'}</Text>

//       {/* Input for task title */}
//       <TextInput
//         style={styles.input}
//         placeholder="Title"
//         value={title}
//         onChangeText={setTitle}
//       />

//       {/* Input for task description */}
//       <TextInput
//         style={[styles.input, styles.descriptionInput]}
//         placeholder="Description"
//         value={description}
//         onChangeText={setDescription}
//         multiline
//       />

//       {/* Save button */}
//       <Button title="Save" onPress={handleSaveTask} />
//     </View>
//   );
// };

// // Styles for the component
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 20,
//     backgroundColor: '#f5f5f5',
//   },
//   title: {
//     fontSize: 22,
//     fontWeight: 'bold',
//     marginBottom: 20,
//     textAlign: 'center',
//   },
//   input: {
//     borderWidth: 1,
//     borderColor: '#ccc',
//     borderRadius: 5,
//     padding: 10,
//     marginBottom: 15,
//     backgroundColor: '#fff',
//   },
//   descriptionInput: {
//     height: 100,
//   },
// });




// screens/ListScreen.js
import React, { useContext, useEffect, useState } from 'react';
import {
  View,
  FlatList,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Button,
  Alert,
  Modal,
} from 'react-native';
import TaskItem from '../components/TaskItem';
import { TaskContext } from '../components/TaskContext';
import { saveTasks, loadTasks } from '../components/storage';

export default function ListScreen({ navigation }) {
  const { tasks, setTasks } = useContext(TaskContext);
  const [isModalVisible, setIsModalVisible] = useState(false); // Controls the visibility of the add/edit modal
  const [currentTask, setCurrentTask] = useState(null); // Stores the task being edited (null for new tasks)
  const [title, setTitle] = useState(''); // Task title
  const [description, setDescription] = useState(''); // Task description

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

  // Function to handle adding/editing a task
  const handleSaveTask = () => {
    if (title.trim() === '') {
      Alert.alert('Error', 'Please enter a title for the task.');
      return;
    }

    let updatedTask;

    if (currentTask) {
      // Edit existing task
      updatedTask = { ...currentTask, name: title, description: description };
      const updatedTasks = tasks.map((t) => (t.id === currentTask.id ? updatedTask : t));
      setTasks(updatedTasks);
    } else {
      // Add new task
      updatedTask = {
        id: Date.now().toString(), // Generate a unique ID
        name: title,
        description: description,
        completed: false,
      };
      const updatedTasks = [...tasks, updatedTask];
      setTasks(updatedTasks);
    }

    // Reset the form and close the modal
    setTitle('');
    setDescription('');
    setCurrentTask(null);
    setIsModalVisible(false);
  };

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

  // Function to open the modal for editing a task
  const handleEditTask = (task) => {
    setCurrentTask(task);
    setTitle(task.name);
    setDescription(task.description);
    setIsModalVisible(true);
  };

  // Function to open the modal for adding a new task
  const handleAddTask = () => {
    setCurrentTask(null);
    setTitle('');
    setDescription('');
    setIsModalVisible(true);
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

      {/* Add/Edit Task Modal */}
      <Modal visible={isModalVisible} animationType="slide" transparent={true}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>
              {currentTask ? 'Edit Task' : 'Add New Task'}
            </Text>

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

            {/* Save and Cancel buttons */}
            <View style={styles.buttonContainer}>
              <Button title="Cancel" onPress={() => setIsModalVisible(false)} />
              <Button title="Save" onPress={handleSaveTask} />
            </View>
          </View>
        </View>
      </Modal>
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
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
  },
  modalTitle: {
    fontSize: 20,
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
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
});
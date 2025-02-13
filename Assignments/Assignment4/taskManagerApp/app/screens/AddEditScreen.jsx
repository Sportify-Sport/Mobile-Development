// // screens/AddEditScreen.js
// import React, { useState, useContext, useEffect } from 'react';
// import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
// import { TaskContext } from '../components/TaskContext';
// import { saveTasks } from '../components/storage';

// export default function AddEditScreen({ route, navigation }) {
//   const { tasks, setTasks } = useContext(TaskContext);
//   const { mode, task: existingTask } = route.params; // 'mode' can be 'add' or 'edit'

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

//     if (mode === 'edit' && existingTask) {
//       // Edit existing task
//       updatedTask = { ...existingTask, name: title, description: description };
//       const updatedTasks = tasks.map((t) => (t.id === existingTask.id ? updatedTask : t));
//       setTasks(updatedTasks);
//     } else {
//       // Add new task
//       updatedTask = {
//         id: Date.now().toString(), // Generate a unique ID
//         name: title,
//         description: description,
//         completed: false,
//       };
//       const updatedTasks = [...tasks, updatedTask];
//       setTasks(updatedTasks);
//     }

//     // Save tasks to AsyncStorage
//     saveTasks(tasks);

//     // Navigate back to the ListScreen
//     navigation.goBack();
//   };

//   // Set the screen title based on the mode
//   useEffect(() => {
//     navigation.setOptions({
//       title: mode === 'add' ? 'Add New Task' : 'Edit Task',
//     });
//   }, [mode]);

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>{mode === 'add' ? 'Add New Task' : 'Edit Task'}</Text>

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
// }

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



// screens/AddEditScreen.js
import React, { useState, useContext } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { TaskContext } from '../components/TaskContext';
import { saveTasks } from '../components/storage';

export default function AddEditScreen({ route, navigation }) {
  const { tasks, setTasks } = useContext(TaskContext);
  const { mode, task: existingTask, updateTask } = route.params; // 'mode' can be 'add' or 'edit'

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

    if (mode === 'edit' && existingTask) {
      // Edit existing task
      updatedTask = { ...existingTask, name: title, description: description };
      const updatedTasks = tasks.map((t) => (t.id === existingTask.id ? updatedTask : t));
      setTasks(updatedTasks);

      // Call the updateTask callback to update the task in DetailScreen
      if (updateTask) {
        updateTask(updatedTask);
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
      setTasks(updatedTasks);
    }

    // Save tasks to AsyncStorage
    saveTasks(tasks);

    // Navigate back to the previous screen
    navigation.goBack();
  };

  // Set the screen title based on the mode
  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: mode === 'add' ? 'Add New Task' : 'Edit Task',
    });
  }, [navigation, mode]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{mode === 'add' ? 'Add New Task' : 'Edit Task'}</Text>

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
}

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
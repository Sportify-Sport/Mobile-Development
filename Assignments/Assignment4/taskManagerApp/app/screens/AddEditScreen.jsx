// import React, { useState } from 'react';
// import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';

// export default function AddEditScreen({ route, navigation }) {
//   const { tasks, updateTasks, setTasks } = route.params; // Get tasks and updateTasks function from ListScreen
//   const [title, setTitle] = useState('');
//   const [description, setDescription] = useState('');

//   const handleAddTask = () => {
//     if (title.trim() === '') {
//       Alert.alert('Error', 'Please enter a title for the task.');
//       return;
//     }

//     const newTask = {
//       id: Date.now().toString(), // Generate a unique ID
//       name: title,
//       description: description,
//       completed: false,
//     };

//     const updatedTasks = [...tasks, newTask]; // Add the new task to the list
//     updateTasks(updatedTasks); // Update the tasks in the parent (HomeScreen)
//     navigation.goBack(); // Go back to the ListScreen
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Add New Task</Text>

//       <TextInput
//         style={styles.input}
//         placeholder="Title"
//         value={title}
//         onChangeText={setTitle}
//       />

//       <TextInput
//         style={[styles.input, styles.descriptionInput]}
//         placeholder="Description"
//         value={description}
//         onChangeText={setDescription}
//         multiline
//       />

//       <Button title="Save" onPress={handleAddTask} />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1, padding: 20 },
//   title: { fontSize: 22, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
//   input: {
//     borderWidth: 1,
//     borderColor: '#ccc',
//     borderRadius: 5,
//     padding: 10,
//     marginBottom: 15,
//   },
//   descriptionInput: {
//     height: 100,
//   },
// });




// import React, { useState } from 'react';
// import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';

// export default function AddEditScreen({ route, navigation }) {
//   const { tasks, updateTasks, initialTasks } = route.params; // Get tasks and updateTasks function from ListScreen
//   const [title, setTitle] = useState('');
//   const [description, setDescription] = useState('');

//   const handleAddTask = () => {
//     if (title.trim() === '') {
//       Alert.alert('Error', 'Please enter a title for the task.');
//       return;
//     }

//     const newTask = {
//       id: Date.now().toString(), // Generate a unique ID
//       name: title,
//       description: description,
//       completed: false,
//     };

//     const updatedTasks = [...tasks, newTask]; // Add the new task to the list
//     updateTasks(updatedTasks); // Update the tasks in the parent (ListScreen)
//      navigation.goBack('List', { tasks: updatedTasks, updateTasks }); // Go back to the ListScreen
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Add New Task</Text>

//       <TextInput
//         style={styles.input}
//         placeholder="Title"
//         value={title}
//         onChangeText={setTitle}
//       />

//       <TextInput
//         style={[styles.input, styles.descriptionInput]}
//         placeholder="Description"
//         value={description}
//         onChangeText={setDescription}
//         multiline
//       />

//       <Button title="Save" onPress={handleAddTask} />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1, padding: 20 },
//   title: { fontSize: 22, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
//   input: {
//     borderWidth: 1,
//     borderColor: '#ccc',
//     borderRadius: 5,
//     padding: 10,
//     marginBottom: 15,
//   },
//   descriptionInput: {
//     height: 100,
//   },
// });



import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';

export default function AddEditScreen({ route, navigation }) {
  const { task: existingTask, tasks, updateTasks } = route.params; // Get task, tasks, and updateTasks function
  const [title, setTitle] = useState(existingTask ? existingTask.name : '');
  const [description, setDescription] = useState(existingTask ? existingTask.description : '');

  const handleSaveTask = () => {
    if (title.trim() === '') {
      Alert.alert('Error', 'Please enter a title for the task.');
      return;
    }

    const newTask = {
      id: existingTask ? existingTask.id : Date.now().toString(), // Use existing ID if editing
      name: title,
      description: description,
      completed: existingTask ? existingTask.completed : false, // Preserve completion status if editing
    };

    let updatedTasks;
    if (existingTask) {
      // Edit existing task
      updatedTasks = tasks.map((task) => (task.id === existingTask.id ? newTask : task));
    } else {
      // Add new task
      updatedTasks = [...tasks, newTask];
    }

    updateTasks(updatedTasks); // Update the tasks in the parent (HomeScreen)

    // Navigate back to the previous screen
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{existingTask ? 'Edit Task' : 'Add New Task'}</Text>

      <TextInput
        style={styles.input}
        placeholder="Title"
        value={title}
        onChangeText={setTitle}
      />

      <TextInput
        style={[styles.input, styles.descriptionInput]}
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
        multiline
      />

      <Button title={existingTask ? 'Save Changes' : 'Save'} onPress={handleSaveTask} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
  },
  descriptionInput: {
    height: 100,
  },
});



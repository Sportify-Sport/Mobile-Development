// import React from 'react';
// import { View, Text, Button, FlatList } from 'react-native';

// const HomeScreen = ({ navigation }) => {
//   const tasks = [
//     { id: '1', name: 'לקנות חלב', description: 'לקנות חלב מהסופר' },
//     { id: '2', name: 'להכין שיעורי בית', description: 'לסיים את המשימות בקורס תכנות' },
//   ];

//   const renderItem = ({ item }) => (
//     <View style={{ padding: 10, borderBottomWidth: 1, borderBottomColor: '#ccc' }}>
//       <Text style={{ fontSize: 18 }}>{item.name}</Text>
//       <Button
//         title="לפרטים"
//         onPress={() => navigation.navigate('Details', { task: item })}
//       />
//     </View>
//   );

//   return (
//     <View style={{ flex: 1, padding: 16 }}>
//       <FlatList
//         data={tasks}
//         renderItem={renderItem}
//         keyExtractor={(item) => item.id}
//       />
//     </View>
//   );
// };
// export default HomeScreen;




// import React from 'react';
// import { View, Text, Button, StyleSheet } from 'react-native';

// export default function HomeScreen({ navigation }) {
//   const tasks = [
//     { id: '1', name: 'Buy Milk', description: 'Buy milk from the supermarket', completed: false },
//     { id: '2', name: 'Do Homework', description: 'Finish programming course assignments', completed: false },
//     { id: '3', name: 'Grocery Shopping', description: 'Buy vegetables, fruits, and groceries', completed: false },
//     { id: '4', name: 'Clean the House', description: 'Tidy up the house and vacuum the floors', completed: false },
//     { id: '5', name: 'Walk the Dog', description: 'Take the dog for a walk in the park', completed: false },
//     { id: '6', name: 'Prepare Dinner', description: 'Cook a healthy meal for the family', completed: false },
//     { id: '7', name: 'Read a Book', description: 'Finish reading the book I started last week', completed: false },
//   ];  

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Task Manager</Text>
//       <Text>You have {tasks.length} tasks.</Text>

//       <Button
//         title="View Tasks"
//         onPress={() => navigation.navigate('List', { tasks })} // Pass tasks to ListScreen
//       />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
//   title: { fontSize: 28, marginBottom: 20 },
// });






// import React, { useState } from 'react';
// import { View, Text, Button, StyleSheet } from 'react-native';

// export default function HomeScreen({ navigation }) {
//   const [tasks, setTasks] = useState([
//     { id: '1', name: 'Buy Milk', description: 'Buy milk from the supermarket', completed: false },
//     { id: '2', name: 'Do Homework', description: 'Finish programming course assignments', completed: false },
//     { id: '3', name: 'Grocery Shopping', description: 'Buy vegetables, fruits, and groceries', completed: false },
//     { id: '4', name: 'Clean the House', description: 'Tidy up the house and vacuum the floors', completed: false },
//     { id: '5', name: 'Walk the Dog', description: 'Take the dog for a walk in the park', completed: false },
//     { id: '6', name: 'Prepare Dinner', description: 'Cook a healthy meal for the family', completed: false },
//     { id: '7', name: 'Read a Book', description: 'Finish reading the book I started last week', completed: false },
//   ]);

//   // Function to update the tasks array
//   const updateTasks = (updatedTasks) => {
//     setTasks(updatedTasks); // Update the state with the modified tasks
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Task Manager</Text>
//       <Text>You have {tasks.length} tasks.</Text>

//       <Button
//         title="View Tasks"
//         onPress={() =>
//           navigation.navigate('List', { tasks, updateTasks }) // Pass tasks and the update function to ListScreen
//         }
//       />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
//   title: { fontSize: 28, marginBottom: 20 },
// });



import React, { useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

export default function HomeScreen({ navigation }) {
  const [tasks, setTasks] = useState([
    { id: '1', name: 'Buy Milk', description: 'Buy milk from the supermarket', completed: false },
    { id: '2', name: 'Do Homework', description: 'Finish programming course assignments', completed: false },
    { id: '3', name: 'Grocery Shopping', description: 'Buy vegetables, fruits, and groceries', completed: false },
    { id: '4', name: 'Clean the House', description: 'Tidy up the house and vacuum the floors', completed: false },
    { id: '5', name: 'Walk the Dog', description: 'Take the dog for a walk in the park', completed: false },
    { id: '6', name: 'Prepare Dinner', description: 'Cook a healthy meal for the family', completed: false },
    { id: '7', name: 'Read a Book', description: 'Finish reading the book I started last week', completed: false },
  ]);

  // Function to update the tasks array
  const updateTasks = (updatedTasks) => {
    setTasks(updatedTasks); // Update the state with the modified tasks
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Task Manager</Text>
      <Text>You have {tasks.length} tasks.</Text>

      <Button
        title="View Tasks"
        onPress={() =>
          navigation.navigate('List', { tasks, updateTasks }) // Pass tasks and the update function to ListScreen
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  title: { fontSize: 28, marginBottom: 20 },
});

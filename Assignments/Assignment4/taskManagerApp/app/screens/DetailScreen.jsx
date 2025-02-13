// import React from 'react';
// import { View, Text, StyleSheet } from 'react-native';

// const DetailScreen = ({ route }) => {
//   const { task } = route.params; // Receive task data passed from ListScreen

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Task Details</Text>
//       <View style={styles.detailsContainer}>
//         <Text style={styles.label}>Title:</Text>
//         <Text style={styles.value}>{task.name}</Text>
//       </View>
//       <View style={styles.detailsContainer}>
//         <Text style={styles.label}>Description:</Text>
//         <Text style={styles.value}>{task.description}</Text>
//       </View>
//       <View style={styles.detailsContainer}>
//         <Text style={styles.label}>Status:</Text>
//         <Text style={styles.value}>{task.completed ? 'Completed' : 'Not Completed'}</Text>
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 20,
//     backgroundColor: '#f5f5f5',
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginBottom: 20,
//     textAlign: 'center',
//   },
//   detailsContainer: {
//     marginBottom: 15,
//   },
//   label: {
//     fontSize: 18,
//     fontWeight: '600',
//     color: '#333',
//   },
//   value: {
//     fontSize: 16,
//     color: '#555',
//     marginTop: 5,
//   },
// });

// export default DetailScreen;


// import React from 'react';
// import { View, Text, StyleSheet, Button } from 'react-native';

// const DetailScreen = ({ route, navigation }) => {
//   const { task } = route.params; // Receive task data passed from ListScreen

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Task Details</Text>
//       <View style={styles.detailsContainer}>
//         <Text style={styles.label}>Title:</Text>
//         <Text style={styles.value}>{task.name}</Text>
//       </View>
//       <View style={styles.detailsContainer}>
//         <Text style={styles.label}>Description:</Text>
//         <Text style={styles.value}>{task.description}</Text>
//       </View>
//       <View style={styles.detailsContainer}>
//         <Text style={styles.label}>Status:</Text>
//         <Text style={styles.value}>{task.completed ? 'Completed' : 'Not Completed'}</Text>
//       </View>

//       {/* Add Edit Button */}
//       <Button
//         title="Edit Task"
//         onPress={() => navigation.navigate('AddEdit', { task, tasks: route.params.tasks, updateTasks: route.params.updateTasks })}
//       />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 20,
//     backgroundColor: '#f5f5f5',
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginBottom: 20,
//     textAlign: 'center',
//   },
//   detailsContainer: {
//     marginBottom: 15,
//   },
//   label: {
//     fontSize: 18,
//     fontWeight: '600',
//     color: '#333',
//   },
//   value: {
//     fontSize: 16,
//     color: '#555',
//     marginTop: 5,
//   },
// });

// export default DetailScreen;



// import React from 'react';
// import { View, Text, StyleSheet, Button } from 'react-native';

// const DetailScreen = ({ route, navigation }) => {
//   const { task, tasks, updateTasks } = route.params; // Receive task, tasks, and updateTasks function

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Task Details</Text>
//       <View style={styles.detailsContainer}>
//         <Text style={styles.label}>Title:</Text>
//         <Text style={styles.value}>{task.name}</Text>
//       </View>
//       <View style={styles.detailsContainer}>
//         <Text style={styles.label}>Description:</Text>
//         <Text style={styles.value}>{task.description}</Text>
//       </View>
//       <View style={styles.detailsContainer}>
//         <Text style={styles.label}>Status:</Text>
//         <Text style={styles.value}>{task.completed ? 'Completed' : 'Not Completed'}</Text>
//       </View>

//       {/* Add Edit Button */}
//       <Button
//         title="Edit Task"
//         onPress={() => navigation.navigate('AddEdit', { task, tasks, updateTasks })}
//       />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 20,
//     backgroundColor: '#f5f5f5',
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginBottom: 20,
//     textAlign: 'center',
//   },
//   detailsContainer: {
//     marginBottom: 15,
//   },
//   label: {
//     fontSize: 18,
//     fontWeight: '600',
//     color: '#333',
//   },
//   value: {
//     fontSize: 16,
//     color: '#555',
//     marginTop: 5,
//   },
// });

// export default DetailScreen;


import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

const DetailScreen = ({ route, navigation }) => {
  const { task, tasks, updateTasks } = route.params; // Receive task, tasks, and updateTasks function

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Task Details</Text>
      <View style={styles.detailsContainer}>
        <Text style={styles.label}>Title:</Text>
        <Text style={styles.value}>{task.name}</Text>
      </View>
      <View style={styles.detailsContainer}>
        <Text style={styles.label}>Description:</Text>
        <Text style={styles.value}>{task.description}</Text>
      </View>
      <View style={styles.detailsContainer}>
        <Text style={styles.label}>Status:</Text>
        <Text style={styles.value}>{task.completed ? 'Completed' : 'Not Completed'}</Text>
      </View>

      {/* Add Edit Button */}
      <Button
        title="Edit Task"
        onPress={() => navigation.navigate('AddEdit', { task, tasks, updateTasks })}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  detailsContainer: {
    marginBottom: 15,
  },
  label: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  value: {
    fontSize: 16,
    color: '#555',
    marginTop: 5,
  },
});

export default DetailScreen;
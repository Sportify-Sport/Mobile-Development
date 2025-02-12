// // components/TaskItem.jsx
// import React from 'react';
// import { View, Text, TouchableOpacity, Button, StyleSheet } from 'react-native';

// const TaskItem = ({ task, onPress, onDelete }) => {
//   return (
//     <View style={styles.itemContainer}>
//       <TouchableOpacity onPress={onPress} style={styles.item}>
//         <Text style={[styles.title, task.completed && styles.completed]}>
//           {task.title}
//         </Text>
//       </TouchableOpacity>
//       <Button title="Delete" onPress={onDelete} color="#ff5c5c" />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   itemContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     padding: 15,
//     backgroundColor: '#f2f2f2',
//     marginBottom: 10,
//     borderRadius: 5,
//   },
//   item: {
//     flex: 1,
//   },
//   title: {
//     fontSize: 18,
//   },
//   completed: {
//     textDecorationLine: 'line-through',
//     color: 'green',
//   },
// });

// export default TaskItem;



// components/TaskItem.jsx
// import React from 'react';
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Button, StyleSheet } from 'react-native';
import Checkbox from 'react-native-community-checkbox';
const TaskItem = ({ task, onPress, onDelete }) => {
  const [isChecked, setChecked] = React.useState(false);
  return (
    <View style={styles.itemContainer}>
      <TouchableOpacity onPress={onPress} style={styles.item}>
        <Text style={[styles.title, task.completed && styles.completed]}>
          {task.title}
        </Text>
      </TouchableOpacity>
      <Text> Check {isChecked ? '👍' : '👎'}</Text>
         <Checkbox isChecked={isChecked} setChecked={setChecked} />
      <Button title="Delete" onPress={onDelete} color="#ff5c5c" />
    </View>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#f2f2f2',
    marginBottom: 10,
    borderRadius: 5,
  },
  item: {
    flex: 1,
  },
  title: {
    fontSize: 18,
  },
  completed: {
    textDecorationLine: 'line-through',
    color: 'green',
  },
});

export default TaskItem;

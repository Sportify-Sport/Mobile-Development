import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';

const TaskItem = ({ task, onPress, onDelete, onCheck }) => {
  const [isChecked, setIsChecked] = useState(task.completed); // Initial state based on task.completed

  const handleCheck = () => {
    const updatedStatus = !isChecked; // Toggle status
    setIsChecked(updatedStatus); // Update local state
    const updatedTask = { ...task, completed: updatedStatus }; // Create updated task object
    onCheck(updatedTask); // Notify parent component to update the task list
  };

  return (
    <View style={styles.itemContainer}>
      <TouchableOpacity onPress={onPress} style={styles.item}>
        <Text style={[styles.title, task.completed && styles.completed]}>
          {task.name}
        </Text>
      </TouchableOpacity>

      {/* Use a button to toggle task completion */}
      <TouchableOpacity onPress={handleCheck} style={styles.statusButton}>
        <Text style={styles.statusText}>{isChecked ? '✅' : '❎'}</Text>
      </TouchableOpacity>

      {/* Delete button with confirmation */}
      <TouchableOpacity onPress={onDelete} style={styles.deleteButton}>
        <Text style={styles.deleteText}>❌</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
    marginVertical: 5,
    backgroundColor: '#f9f9f9',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  item: {
    flex: 1,
  },
  title: {
    fontSize: 18,
  },
  completed: {
    textDecorationLine: 'line-through',
    color: 'gray',
  },
  statusButton: {
    paddingHorizontal: 10,
  },
  statusText: {
    fontSize: 18,
  },
  deleteButton: {
    paddingHorizontal: 10,
  },
  deleteText: {
    fontSize: 18,
    color: 'red',
  },
});

export default TaskItem;

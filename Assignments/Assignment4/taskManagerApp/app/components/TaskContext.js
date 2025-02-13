// // context/TaskContext.js
// import React, { createContext, useState } from 'react';

// export const TaskContext = createContext();

// export const TaskProvider = ({ children }) => {
//   const [tasks, setTasks] = useState([]);

//   return (
//     <TaskContext.Provider value={{ tasks, setTasks }}>
//       {children}
//     </TaskContext.Provider>
//   );
// };


// context/TaskContext.js
import React, { createContext, useState, useEffect } from 'react';
import { loadTasks, saveTasks } from '../components/storage';

export const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);

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

  return (
    <TaskContext.Provider value={{ tasks, setTasks }}>
      {children}
    </TaskContext.Provider>
  );
};
// src/App.js
import React, { useState } from 'react';
import Microkernel from './core/Microkernel';
import TaskComponent from './components/TaskComponent';

const App = () => {
    const [task, setTask] = useState('');
    const [tasks, setTasks] = useState([]);

    const kernel = new Microkernel();
    const taskComponent = new TaskComponent(kernel);

    // Register task component
    kernel.registerComponent("taskComponent", taskComponent);

    const handleAddTask = () => {
        if (task) {
            const newTask = { title: task, dueDate: new Date().toLocaleDateString() };
            kernel.publish("addTask", newTask);
            setTasks([...tasks, newTask]);  
            setTask('');  
        }
    };

    return (
        <div id="app" style={styles.app}>
            <h1>TODO Application</h1>
            <input
                type="text"
                id="inputTask"
                placeholder="New Task"
                value={task}
                onChange={(e) => setTask(e.target.value)}
                style={styles.input}
            />
            <button id="addTaskBtn" onClick={handleAddTask} style={styles.button}>
                Add Task
            </button>

            <div id="taskList" style={styles.taskList}>
                {tasks.map((task, index) => (
                    <div key={index} style={styles.taskItem}>
                        {task.title} - Due: {task.dueDate}
                    </div>
                ))}
            </div>
        </div>
    );
};

// Styling
const styles = {
  app: {
      backgroundColor: '#f4f6f9', 
      padding: '40px',
      borderRadius: '12px',
      boxShadow: '0 6px 12px rgba(0, 0, 0, 0.15)',  
      width: '450px',
      margin: '100px auto',
      textAlign: 'center',
      fontFamily: "'Roboto', sans-serif",  
  },
  input: {
      padding: '12px 16px',
      marginRight: '12px',
      border: '1px solid #ddd',
      borderRadius: '6px',
      width: 'calc(100% - 130px)',
      boxSizing: 'border-box',
      fontSize: '16px',  
      transition: 'border-color 0.2s ease-in-out',
  },
  inputFocus: {
      borderColor: '#007BFF',
  },
  button: {
      padding: '12px 18px',
      backgroundColor: '#28a745', 
      color: '#ffffff',
      border: 'none',
      borderRadius: '6px',
      fontSize: '16px',  
      cursor: 'pointer',
      transition: 'background-color 0.3s ease-in-out', 
  },
  buttonHover: {
      backgroundColor: '#218838', 
  },
  taskList: {
      marginTop: '25px',
      backgroundColor: '#fff',  
      padding: '20px',
      borderRadius: '8px',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.05)',
  },
  taskItem: {
      padding: '12px 0',
      borderBottom: '1px solid #eee',
      color: '#333',
      fontSize: '16px',
      fontWeight: '500',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
  },
  taskItemText: {
      marginRight: '10px',
  },
  taskDeleteButton: {
      backgroundColor: '#dc3545', 
      color: '#fff',
      border: 'none',
      padding: '6px 12px',
      borderRadius: '4px',
      cursor: 'pointer',
      transition: 'background-color 0.3s ease-in-out',
  },
  taskDeleteButtonHover: {
      backgroundColor: '#c82333', 
  }
};


export default App;

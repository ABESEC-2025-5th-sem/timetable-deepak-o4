import React, { useState } from 'react';

let nextId = 0;

function TodoList() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editingText, setEditingText] = useState('');

  const handleAddTask = () => {
    if (newTask.trim() === '') return;

    setTasks([
      ...tasks,
      { id: nextId++, text: newTask.trim(), isComplete: false },
    ]);
    setNewTask('');
  };

  const handleDeleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const handleStartEdit = (task) => {
    setEditingId(task.id);
    setEditingText(task.text);
  };

  const handleUpdateTask = () => {
    if (editingText.trim() === '') return;

    setTasks(tasks.map(task => 
      task.id === editingId ? { ...task, text: editingText.trim() } : task
    ));
    setEditingId(null);
    setEditingText('');
  };

  const handleToggleComplete = (id) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, isComplete: !task.isComplete } : task
    ));
  };

  return (
    <div className="todo-container">
      <h1>Simple To-Do List</h1>
      
      <div className="add-task">
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Add a new task..."
        />
        <button onClick={handleAddTask}>Add</button>
      </div>

      <ul className="task-list">
        {tasks.map(task => (
          <li key={task.id} className="task-item">
            {editingId === task.id ? (
              <>
                <input
                  type="text"
                  value={editingText}
                  onChange={(e) => setEditingText(e.target.value)}
                  className="edit-input"
                />
                <button onClick={handleUpdateTask}>Update</button>
              </>
            ) : (
              <>
                <span 
                  style={{ textDecoration: task.isComplete ? 'line-through' : 'none' }}
                  onClick={() => handleToggleComplete(task.id)}
                >
                  {task.text}
                </span>
                <div className="actions">
                  <button onClick={() => handleStartEdit(task)} className="edit-btn">Edit</button>
                  <button onClick={() => handleDeleteTask(task.id)} className="delete-btn">Delete</button>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
      
      {tasks.length === 0 && <p className="empty-message">No tasks yet. Start adding!</p>}
    </div>
  );
}
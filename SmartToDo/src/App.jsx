import { useState, useEffect } from 'react';
import './App.css';
import Auth from './components/Auth';
import TaskList from './components/taskList';

function App() {
  const [user, setUser] = useState(null);
  const [task, setTask] = useState('');
  const [priority, setPriority] = useState('Medium');
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const storedUser = localStorage.getItem('currentUser');
    const storedTasks = JSON.parse(localStorage.getItem(storedUser)) || [];
    if (storedUser) {
      setUser(storedUser);
      setTasks(storedTasks);
    }
  }, []);

  useEffect(() => {
    if (user) {
      localStorage.setItem(user, JSON.stringify(tasks));
      localStorage.setItem('currentUser', user);
    }
  }, [tasks, user]);

  const addTask = () => {
    if (task.trim()) {
      setTasks([...tasks, { text: task, priority }]);
      setTask('');
      setPriority('Medium');
    }
  };

  const deleteTask = (index) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('currentUser');
  };

  if (!user) return <Auth onLogin={setUser} />;

  return (
    <div className="container">
      <h1 className="heading">📝 {user}'s To-Do List</h1>
      <button onClick={handleLogout} className="delete-button" style={{ float: 'right' }}>
        Logout
      </button>
      <div className="input-container">
        <input
          type="text"
          value={task}
          placeholder="Enter a task"
          onChange={(e) => setTask(e.target.value)}
          className="input"
        />
        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          className="input"
        >
          <option value="High">🔴 High</option>
          <option value="Medium">🟡 Medium</option>
          <option value="Low">🟢 Low</option>
        </select>
        <button onClick={addTask} className="add-button">Add</button>
      </div>
      <TaskList tasks={tasks} deleteTask={deleteTask} />
    </div>
  );
}

export default App;

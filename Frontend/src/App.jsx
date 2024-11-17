import { useState } from 'react'
import './App.css'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import DeleteIcon from '@mui/icons-material/Delete';
import CloseIcon from '@mui/icons-material/Close';

function App() {
  
  const SERVER_URL = 'localhost:5000'

  const [taskData, setTaskData] = useState({
    title: "",
    description: "",
    creation_date: "",
    status: "",
    created_by: "",
    priority: "",
    date_modified: "",
  });

  const [task_id, set_task_id] = useState("");

  const [tasks, setTasks] = useState([]);
  const [isModelOpen, setIsModelOpen] = useState(false);


  const fetchTasks = async () => {
    try {
      const request = await fetch(`http://localhost:5000/tasks`, {
        method: "GET",
        headers: {
          "Accept":"application/json",
          "Content-Type": "application/json"
        }
      });
      const data = await request.json();
      console.log(data)
      setTasks(data)
    } catch (error) {
      console.log('Error: ' + error)
    }
  };

  const handleOpenTasks = async () => {
    await fetchTasks();
    setIsModelOpen(true);
  }
  const handleCloseTasks = async () => {
    setIsModelOpen(false);
  }

  const sendTask = async () => {
    try {
      const request = await fetch(`http://localhost:5000/tasks`, {
        method: "POST",
        body: JSON.stringify(taskData),
        headers: {
          "Accept":"application/json",
          "Content-Type": "application/json"
        }
      });
      console.log("Task successfully created");
    } catch (error) {
      console.error('Error: ' + error)
    }
  }

  const deleteTask = async () => {
    try {
      const request = await fetch(`http://localhost:5000/tasks/${task_id}` ,{
        method: "DELETE",
      });
    } catch (error){
      console.log('Error: ' + error)
    }
  }


  const deleteTaskById = async (id) => {
    try {
      const request = await fetch(`http://localhost:5000/tasks/${id}` ,{
        method: "DELETE",
      });
      fetchTasks();
    } catch (error){
      console.log('Error: ' + error)
    }
  }








  const handleSubmit = (e) =>{
    e.preventDefault();
    sendTask();
  }

  const handleDeleteChange = (e) =>{
    set_task_id(e.target.value)
  }

  const handleDelete = (e) =>{
    e.preventDefault();
    deleteTask();
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTaskData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };




  return (
    <div className="App">
      <header className="App-header">
        <h1>3B Task Manager</h1>
        <nav>
          <ul className="nav-links">
            <li className ="Tasks_Nav">
                <button className='current-tasks-button' onClick={handleOpenTasks}>Current Tasks</button>
            </li>
          </ul>
        </nav>
      </header>

      <main className="App-main">
        <section className="intro">
          <h2>Discover Amazing Features</h2>
          <p>Experience simplicity and functionality with our app. Let's get started!</p>
          
          {isModelOpen && (
            <div className='model'>
              <div className='model-content'>
                <CloseIcon className='close-button' onClick={handleCloseTasks}>Close</CloseIcon>
                <h2>Current Tasks</h2>
                <ul>
                  {tasks.map((task) => (
                    <li key={task.task_id}>
                      <p>ID: {task.task_id}</p>
                      <h3>{task.title}</h3>
                      <p>{task.description}</p>
                      <p>Priority: {task.priority}</p>
                      <p>Status: {task.status}</p>
                      <DeleteIcon className='delete-button' onClick={() => deleteTaskById(task.task_id)}></DeleteIcon>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}


          <div className='new-form-container'>
            <form className='task-form' onSubmit={handleSubmit}>
              <label id='title'>Title</label>
              <input 
              type='text' 
              id='title' 
              name='title' 
              value={taskData.title}
              onChange={handleChange}
              required
              />

              <label id='description'>Description</label>
              <input 
              type='text' 
              id='description' 
              name='description'
              value={taskData.description}
              onChange={handleChange}
              />

              <label id='priority'>Priority</label>
              <select 
              id='priority' 
              name='priority' 
              value={taskData.priority}
              onChange={handleChange}
              required>
                <option value="">Select</option>
                <option value="1">High (1)</option>
                <option value="2">Medium (2)</option>
                <option value="3">Low (3)</option>
              </select>
              

              <label id='status'>Status</label>
              <select
              id='status'
              name='status'
              value={taskData.status}
              onChange={handleChange}
              required>
                <option value="">Select</option>
                <option value="To Do">To Do</option>
                <option value="Started">Started</option>
                <option value="Review">Review</option>
                <option value="Done">Done</option>
              </select>
            <button type='submit'>Create Task</button>
            </form>
          </div>

          </section>
      </main>

      <footer className="App-footer">
        <p>&copy;3B All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App

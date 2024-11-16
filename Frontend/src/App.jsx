import { useState } from 'react'
import './App.css'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'



function App() {

  const [taskData, setTaskData] = useState({
    title: "",
    description: "",
    creation_date: "",
    status: "",
    created_by: "",
    priority: "",
    date_modified: "",
  });

  const sendTask = async () => {
    try {
      const request = await fetch("http://localhost:5000/tasks", {
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

  const handleSubmit = (e) =>{
    e.preventDefault();
    sendTask();
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
                <a href="#tasks" onClick={() => alert('This button will eventually navigate either to a page or bring up a side panel that shows all current active tasks')}>Current Tasks</a>
            </li>
          </ul>
        </nav>
      </header>

      <main className="App-main">
        <section className="intro">
          <h2>Discover Amazing Features</h2>
          <p>Experience simplicity and functionality with our app. Let's get started!</p>
          
          <div className='form-container'>
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
                <option value="3">Low (1)</option>
                <option value="2">Medium (2)</option>
                <option value="1">High (3)</option>
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

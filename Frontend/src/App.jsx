import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
function App() {

  const sendTask = async () => {
    try {
      const request = await fetch("http://localhost:5000/tasks", {
        method: "POST",
        body: JSON.stringify({
          title: "This is a title",
          description: "This is a description",
          creation_date: "",
          status: "",
          created_by: "",
          priority: "1",
          date_modified: ""
        }),
        headers: {
          "Accept":"application/json",
          "Content-Type": "application/json"
        }

      });
    } catch (error) {
      console.error('Error: ' + error)
    }
  }



  return (
    <div className="App">
      <header className="App-header">
        <h1>3B Task Manager</h1>
        <nav>
          <ul className="nav-links">
            <li className ="Tasks_Nav">
                <a href="#tasks" onClick={() => alert('This button will eventually navigate either to a page or bring up a side panel that shows all current active tasks')}>Current Tasks</a>
                <a id='send-task' onClick={sendTask}>Create Task</a> {/* When clicking this button send a new task to api */}
            </li>
          </ul>
        </nav>
      </header>

      <main className="App-main">
        <section className="intro">
          <h2>Discover Amazing Features</h2>
          <p>Experience simplicity and functionality with our app. Let's get started!</p>
          <button onClick={() => alert('More features coming soon!')}>Explore More</button>
        </section>
      </main>

      <footer className="App-footer">
        <p>&copy;3B All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App

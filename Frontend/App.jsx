import React from 'react';
import './style.css'

export function App(props) {
  return (
    <div className="App">
      <header className="App-header">
        <h1>3B Task Manager</h1>
        <nav>
          <ul className="nav-links">
            <li className ="Tasks_Nav">
                <a href="#tasks" onClick={() => alert("Test")}>Tasks</a>
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
        <p>&copy;3B. All rights reserved.</p>
      </footer>
    </div>
  );
}

// Log to console
console.log('Hello console')
import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}


function App1() {
  const [data, setData] = useState([{}])

  useEffect( () => {
    fetch("/projects").then(
      res => res.json()
    ).then(
      data => {
          setData(data)
          console.log(data)
      }
    )
  }, [] )
  return (
    <div>
      {(typeof data.projects === 'undefined') ?  (
        <p>Loading projects...</p>
      ) : (
        data.projects.map((member, i) => (
          <p key={i}>{member}</p>
        ))
    )}
    </div>
  );
}
export default App1;



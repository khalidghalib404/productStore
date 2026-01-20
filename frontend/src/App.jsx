import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)



  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
          
        </a>

        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <h1> this is a test</h1>

      <div>
        <p>
          This is a sample React application integrated with a backend server that uses Arcjet for security features like rate limiting and bot detection.
        </p>
        <button>
          click
        </button>
        <span>
          
          <button>
            click
          </button>
        </span>
      </div>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          <button>
            Edit <code>src/App.jsx</code> and save to test HMR
          </button>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
      <p>
        This is a sample React application integrated with a backend server that uses Arcjet for security features like rate limiting and bot detection.
      </p>
      <p>
        The backend server is running on port 3000 and the frontend is running on port 5173.
      </p>

        
        <p>
          The backend server is running on port 3000 and the frontend is running on port 5173.
        </p>

         


    </>
  )
}

export default App

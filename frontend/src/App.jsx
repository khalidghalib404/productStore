import { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import { Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage'
import ProductPage from './pages/ProductPage'
import { useThemeStore } from './stores/themeStore'

function App() {
  // Initialize theme store on app startup

  const { currentTheme } = useThemeStore();

  // Update debug display
  useEffect(() => {
    const debugElement = document.getElementById('theme-debug');
    if (debugElement) {
      debugElement.textContent = document.documentElement.getAttribute('data-theme') || 'none';
    }
  }, [currentTheme]);

  return (

    <div className='min-h-screen bg-base-200 transition-colors duration-300'>
      <Navbar/>
      <Routes>
        <Route path='/' element={<HomePage/>}/>
        <Route path='/product/:id' element={<ProductPage/>}/>
      </Routes>
      <div className="p-4">
        <p className="text-sm text-base-content/70">
          Current theme: <span className="font-mono bg-base-300 px-2 py-1 rounded">{currentTheme}</span>
        </p>
        <p className="text-sm text-base-content/70">
          data-theme attribute: <span className="font-mono bg-base-300 px-2 py-1 rounded" id="theme-debug"></span>
        </p>
      </div>
      Hello World!
      <button>
        click
      </button>
    </div>

  )
}

export default App

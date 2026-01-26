import { useState } from 'react'
import Navbar from './components/navbar'
import { Route, Routes } from 'react-router-dom'
import Homepage from './pages/Homepage'
import ProductPage from './pages/ProductPage'
 
function App() {
  const [count, setCount] = useState(0)
  return (
    
    <div className='min-h-screen bg-base-200 transition-colors duration-300 ' data-theme='forest'>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Homepage/>}/>
        <Route path='/product/:id' element={<ProductPage/>}/>
      </Routes>
      Hello World!
    </div>
     
  )
}

export default App

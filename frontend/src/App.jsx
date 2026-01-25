import { useState } from 'react'
import Navbar from './components/navbar'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Homepage from './pages/Homepage'
import ProductPage from './pages/ProductPage'
 
function App() {
  const [count, setCount] = useState(0)
  return (
    <BrowserRouter>
    
    <div className='min-h-screen bg-base-200 transition-colors duration-300'>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Homepage/>}/>
        <Route path='/product/:id' element={<ProductPage/>}/>
      </Routes>
      Hello World!
    </div>
    </BrowserRouter> 
  )
}

export default App

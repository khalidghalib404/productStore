import Navbar from './components/Navbar'
import { Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage'
import ProductPage from './pages/ProductPage'
import CartPage from './pages/CartPage'
import CheckoutPage from './pages/CheckoutPage'

function App() {
  return (
    <div className='min-h-screen bg-base-200 transition-colors duration-300'>
      <Navbar/>
      <Routes>
        <Route path='/' element={<HomePage/>}/>
        <Route path='/product/:id' element={<ProductPage/>}/>
        <Route path='/cart' element={<CartPage/>}/>
        <Route path='/checkout' element={<CheckoutPage/>}/>
      </Routes>
      
      {/* Footer */}
      <footer className="footer-gradient text-base-content py-12 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            {/* Brand Section */}
            <div>
              <h3 className="text-3xl font-bold mb-3">
                <span className="text-accent">be</span>khar
              </h3>
              <p className="text-base-content/70 leading-relaxed">
                Your trusted online store for premium quality products at unbeatable prices.
              </p>
            </div>
            
            {/* Quick Links */}
            <div>
              <h4 className="font-bold text-lg mb-3">Quick Links</h4>
              <ul className="space-y-2">
                <li><a href="/" className="text-base-content/70 hover:text-primary transition-colors">Home</a></li>
                <li><a href="#" className="text-base-content/70 hover:text-primary transition-colors">About Us</a></li>
                <li><a href="#" className="text-base-content/70 hover:text-primary transition-colors">Contact</a></li>
                <li><a href="#" className="text-base-content/70 hover:text-primary transition-colors">FAQ</a></li>
              </ul>
            </div>
            
            {/* Contact Info */}
            <div>
              <h4 className="font-bold text-lg mb-3">Contact Us</h4>
              <ul className="space-y-2 text-base-content/70">
                <li>Email: support@bekhar.com</li>
                <li>Phone: +1 (555) 123-4567</li>
                <li>Hours: Mon-Fri 9AM-6PM</li>
              </ul>
            </div>
          </div>
          
          <div className="divider"></div>
          
          <div className="text-center">
            <p className="text-base-content/60 text-sm">
              © {new Date().getFullYear()} bekhar. All rights reserved. Made with ❤️
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App

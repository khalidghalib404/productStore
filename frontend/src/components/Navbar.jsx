import React from 'react';
import { ShoppingCart, Sparkles } from 'lucide-react';
import ThemeSelectior from './ThemeSelectior';
import { useCartStore } from '../stores/useCartStore';
import { useNavigate } from 'react-router-dom';

export default function Navbar() {
  const { getCartItemsCount } = useCartStore();
  const cartCount = getCartItemsCount();
  const navigate = useNavigate();

  return (
    <nav className="bg-base-100 shadow-lg sticky top-0 z-50 border-b border-base-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex justify-between items-center h-16">
          {/* Store Name */}
          <div 
            className="flex-shrink-0 cursor-pointer group"
            onClick={() => navigate('/')}
          >
            <div className="flex items-center gap-2">
              <Sparkles className="w-8 h-8 text-primary animate-pulse" />
              <h1 className="text-base-content text-3xl font-bold tracking-tight">
                <span className="text-primary">be</span>
                <span className="group-hover:text-primary transition-colors duration-300">khar</span>
              </h1>
            </div>
            <p className="text-base-content/70 text-xs ml-10 -mt-1">Your Premium Store</p>
          </div>

          {/* Right side icons */}
          <div className="flex items-center space-x-4">
            {/* Shopping Cart */}
            <button
              onClick={() => navigate('/cart')}
              className="btn btn-ghost btn-circle hover:bg-primary hover:text-primary-content transition-all duration-300 relative group"
            >
              <ShoppingCart size={24} className="group-hover:scale-110 transition-transform duration-300" />
              {/* Cart badge - dynamic count */}
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary text-primary-content text-xs rounded-full h-6 w-6 flex items-center justify-center font-bold cart-badge shadow-lg">
                  {cartCount > 99 ? '99+' : cartCount}
                </span>
              )}
            </button>

            {/* Theme Selector */}
            <ThemeSelectior />
          </div>
        </div>
      </div>
    </nav>
  );
}

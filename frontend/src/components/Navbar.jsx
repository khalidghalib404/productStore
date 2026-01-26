import React from 'react';
import { ShoppingCart } from 'lucide-react';
import ThemeSelectior from './ThemeSelectior';

export default function Navbar() {
  return (
    <nav className="bg-gradient-to-r from-blue-600 to-purple-600 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Store Name */}
          <div className="flex-shrink-0">
            <h1 className="text-white text-2xl font-bold">
              <span className="text-yellow-300">be</span>khar
            </h1>
          </div>

          {/* Right side icons */}
          <div className="flex items-center space-x-4">
            {/* Shopping Cart */}
            <button className="text-white hover:bg-white hover:text-blue-600 p-2 rounded-md transition duration-300 relative">
              <ShoppingCart size={24} />
              {/* Cart badge - you can make this dynamic */}
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                0
              </span>
            </button>

            {/* Theme Selector */}
            <ThemeSelectior />
          </div>
        </div>
      </div>
    </nav>
  );
}

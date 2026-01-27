import React from 'react';

const LoadingAnimation = () => {
  return (
    <div className='flex flex-col justify-center items-center h-96 gap-4'>
      {/* Animated Shopping Cart Loader */}
      <div className="relative">
        <svg 
          className="animate-bounce" 
          width="100" 
          height="100" 
          viewBox="0 0 24 24" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
        >
          <path 
            d="M9 2L7.17 4H4C2.9 4 2 4.9 2 6V18C2 19.1 2.9 20 4 20H20C21.1 20 22 19.1 22 18V6C22 4.9 21.1 4 20 4H16.83L15 2H9Z" 
            className="fill-primary"
          />
          <circle cx="12" cy="12" r="3" className="fill-base-100 animate-pulse" />
        </svg>
        
        {/* Spinning Circle */}
        <div className="absolute -top-2 -right-2">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
        </div>
      </div>
      
      {/* Loading Text */}
      <div className="flex gap-1">
        <span className="text-2xl font-bold text-primary animate-pulse">Loading</span>
        <span className="text-2xl font-bold text-primary animate-pulse delay-100">.</span>
        <span className="text-2xl font-bold text-primary animate-pulse delay-200">.</span>
        <span className="text-2xl font-bold text-primary animate-pulse delay-300">.</span>
      </div>
      
      {/* Progress Bar */}
      <div className="w-64 h-2 bg-base-200 rounded-full overflow-hidden">
        <div className="h-full bg-gradient-to-r from-primary via-secondary to-accent animate-[loading_1.5s_ease-in-out_infinite]"></div>
      </div>
    </div>
  );
};

export default LoadingAnimation;

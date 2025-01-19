import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="min-h-screen bg-secondary flex flex-col items-center justify-center text-white relative overflow-hidden">
      {/* Stars */}
      {Array.from({ length: 12 }).map((_, i) => (
        <div
          key={i}
          className="absolute w-2 h-2 bg-white rounded-full animate-twinkle"
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 2}s`,
          }}
        />
      ))}

      {/* Floating Objects */}
      <div className="absolute w-16 h-16 bg-secondary-800 rounded-full -rotate-45 top-1/4 left-1/4" />
      <div className="absolute w-20 h-20 bg-secondary-800 rounded-full rotate-45 bottom-1/4 right-1/4" />
      <div className="absolute w-12 h-12 bg-secondary-800 rounded-full top-1/3 right-1/3" />

      {/* Content */}
      <div className="text-center z-10 space-y-6">
        <h1 className="text-[200px] font-bold leading-none">404</h1>
        <h2 className="text-3xl font-bold mb-8">ERROR PAGE !</h2>
        <h3 className="text-4xl font-bold mb-4">Hey Wanderer, Lost Again!</h3>
        <p className="text-xl">
          Let's me show you out of this space,{' '}
          <Link to="/" className="text-white underline hover:text-primary">
            Safe Home!
          </Link>
        </p>
      </div>

      {/* Floating Characters */}
      <div className="absolute left-1/4 transform -translate-x-1/2">
        <div className="relative w-32 h-32 animate-float">
          <div className="absolute w-32 h-32 bg-primary rounded-full transform -rotate-12">
            <div className="w-full h-full relative">
              {/* Simplified person illustration */}
              <div className="absolute top-1/4 left-1/4 w-1/2 h-1/2 bg-white rounded-full" />
              <div className="absolute bottom-1/4 left-1/4 w-1/2 h-1/3 bg-primary-600 rounded-t-full" />
            </div>
          </div>
        </div>
      </div>

      <div className="absolute right-1/4 transform translate-x-1/2">
        <div className="relative w-32 h-32 animate-float-reverse">
          <div className="absolute w-32 h-32 bg-secondary-900 rounded-full transform rotate-45">
            <div className="w-full h-full relative">
              {/* Simplified legs illustration */}
              <div className="absolute bottom-0 left-1/4 w-1/2 h-2/3 bg-primary rounded-t-lg" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
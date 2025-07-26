import React from 'react';
import { Link } from 'react-router-dom';

const Unauthorized = () => {
  return (
    <div className="min-h-screen bg-primary flex flex-col items-center justify-center text-white relative overflow-hidden">
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
      <div className="absolute w-16 h-16 bg-primary-700 rounded-full -rotate-12 top-1/4 left-1/4" />
      <div className="absolute w-20 h-20 bg-primary-800 rounded-full rotate-12 bottom-1/4 right-1/4" />
      <div className="absolute w-12 h-12 bg-primary-900 rounded-full top-1/3 right-1/3" />

      {/* Content */}
      <div className="text-center z-10 space-y-6">
        <h1 className="text-[200px] font-bold leading-none">401</h1>
        <h2 className="text-3xl font-bold mb-8">UNAUTHORIZED ACCESS</h2>
        <h3 className="text-4xl font-bold mb-4">You don't have permission!</h3>
        <p className="text-xl">
          Please{' '}
          <Link to="/login" className="text-white underline hover:text-yellow-300">
            login
          </Link>{' '}
          to continue, or go{' '}
          <Link to="/" className="text-white underline hover:text-yellow-300">
            home
          </Link>
          .
        </p>
      </div>

      {/* Left Floating Icon (Lock) */}
      <div className="absolute left-1/4 transform -translate-x-1/2">
        <div className="relative w-32 h-32 animate-float">
          <div className="absolute w-32 h-32 bg-white rounded-full flex items-center justify-center shadow-md">
            <span className="text-5xl text-primary">🔒</span>
          </div>
        </div>
      </div>

      {/* Right Floating Icon (Stop) */}
      <div className="absolute right-1/4 transform translate-x-1/2">
        <div className="relative w-32 h-32 animate-float-reverse">
          <div className="absolute w-32 h-32 bg-white rounded-full flex items-center justify-center shadow-md">
            <span className="text-4xl text-primary">⛔</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Unauthorized;

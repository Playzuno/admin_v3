import React from 'react';

const Home = () => {
  return (
    <div className="text-center">
      <h1 className="text-4xl font-bold text-gray-900 mb-4">
        Welcome to MyApp
      </h1>
      <p className="text-lg text-gray-600 mb-8">
        This is a modern React application built with best practices in mind.
      </p>
      <div className="flex justify-center space-x-4">
        <button className="btn btn-primary">Get Started</button>
        <button className="btn btn-secondary">Learn More</button>
      </div>
    </div>
  );
};

export default Home;
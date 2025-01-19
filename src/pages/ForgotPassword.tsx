import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, User } from 'lucide-react';

interface CarouselSlide {
  title: string;
  description: string;
  image: string;
}

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [currentSlide, setCurrentSlide] = useState(0);

  const carouselSlides: CarouselSlide[] = [
    {
      title: "Forgot Your Password? No Worries!",
      description: "We've got you covered! Resetting your password is quick and secure",
      image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&q=80&w=1000",
    },
    {
      title: "Simple Recovery Process",
      description: "Follow the easy steps to regain access to your account",
      image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&q=80&w=1000",
    },
    {
      title: "Secure & Fast",
      description: "Your security is our priority. Reset your password with confidence",
      image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&q=80&w=1000",
    },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle password reset logic here
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Section */}
      <div className="w-1/2 p-12 flex flex-col">
        <div className="mb-16">
          <h1 className="text-4xl font-bold text-secondary">ZUNO</h1>
        </div>

        <div className="max-w-md">
          <h2 className="text-3xl font-bold text-secondary mb-2">Forgot your password?</h2>
          <p className="text-gray-500 mb-8">
            Enter your E-mail address and we'll send you a link to reset your password
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="relative">
              <input
                type="text"
                placeholder="Email or Phone Number"
                className="w-full px-4 py-3 border rounded-lg pl-10 focus:outline-none focus:ring-2 focus:ring-secondary/20"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <div className="absolute left-3 top-1/2 -translate-y-1/2">
                <User className="w-5 h-5 text-gray-400" />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-primary text-white rounded-lg hover:bg-primary-600 transition-colors"
            >
              Reset password
            </button>
          </form>

          <Link 
            to="/login" 
            className="inline-flex items-center text-gray-600 mt-6 hover:text-secondary transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to log in
          </Link>
        </div>
      </div>

      {/* Right Section - Carousel */}
      <div className="w-1/2 bg-secondary p-12 flex flex-col justify-between text-white relative overflow-hidden">
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center max-w-lg transition-all duration-500 transform">
            <img
              src={carouselSlides[currentSlide].image}
              alt="Forgot Password"
              className="max-w-md mx-auto mb-8"
            />
            <h2 className="text-3xl font-bold mb-4">
              {carouselSlides[currentSlide].title}
            </h2>
            <p className="text-lg text-white/80">
              {carouselSlides[currentSlide].description}
            </p>
          </div>
        </div>

        {/* Carousel Indicators */}
        <div className="flex justify-center space-x-2">
          {carouselSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                currentSlide === index ? 'bg-white' : 'bg-white/50'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
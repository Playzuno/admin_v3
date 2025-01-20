import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, User } from 'lucide-react';
import Carousel from '../components/ui/Carousel';

interface CarouselSlide {
  title: string;
  description: string;
  image: string;
}

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const slides = [
    {
      title: 'Forgot Your Password? No Worries!',
      description:
        'We’ve got you covered! Resetting your password is quick and secure.',
      image: '/assets/images/forgot_carousel.png',
    },
    {
      title: 'Connect with Zuno.',
      description: 'Everything you need in an easy customizable dashboard.',
      image: '/assets/images/login-carousel-1.png',
    },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle password reset logic here
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Section */}
      <div className="w-1/2 p-12 flex flex-col justify-center items-center">
        <Link to="/" className="flex items-center mb-12">
          <img
            src="/assets/images/logo.svg"
            alt="Zuno Logo"
            style={{ height: '35px' }}
          />
        </Link>

        <div className="max-w-lg">
          <h2 className="text-2xl font-medium text-brand">
            Forgot your password?
          </h2>
          <p className="subtitle-2 mb-8">
            Enter your E-mail address and we'll send you a link to reset your
            password
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="relative">
              <input
                type="text"
                placeholder="Email or Phone Number"
                className="w-full px-4 py-3 border rounded-lg pl-10 focus:outline-none focus:ring-2 focus:ring-secondary/20"
                value={email}
                onChange={e => setEmail(e.target.value)}
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
            className="subtitle-2 inline-flex items-center text-gray-600 mt-6 hover:text-secondary transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to log in
          </Link>
        </div>
      </div>

      {/* Right Section - Carousel */}
      <Carousel slides={slides} />
    </div>
  );
};

export default ForgotPassword;

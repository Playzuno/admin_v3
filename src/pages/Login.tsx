import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Eye, EyeOff } from 'lucide-react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || '/';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(email, password);
      navigate(from, { replace: true });
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Section */}
      <div className="w-1/2 p-12 flex flex-col">
        <div className="mb-16">
          <h1 className="text-4xl font-bold text-secondary">ZUNO</h1>
        </div>

        <div className="max-w-md">
          <h2 className="text-3xl font-bold text-secondary mb-2">Log in to your Account</h2>
          <p className="text-gray-500 mb-8">Welcome back! Please enter your details</p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Email or Phone Number"
                  className="w-full px-4 py-3 border rounded-lg pl-10 focus:outline-none focus:ring-2 focus:ring-secondary/20"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <div className="absolute left-3 top-1/2 -translate-y-1/2">
                  <svg className="w-5 h-5 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                    <circle cx="12" cy="7" r="4" />
                  </svg>
                </div>
              </div>
            </div>

            <div>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Password"
                  className="w-full px-4 py-3 border rounded-lg pl-10 focus:outline-none focus:ring-2 focus:ring-secondary/20"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <div className="absolute left-3 top-1/2 -translate-y-1/2">
                  <svg className="w-5 h-5 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                  </svg>
                </div>
                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5 text-gray-400" />
                  ) : (
                    <Eye className="w-5 h-5 text-gray-400" />
                  )}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 rounded border-gray-300 text-secondary focus:ring-secondary"
                />
                <span className="text-gray-600">Remember me</span>
              </label>
              <button type="button" className="text-secondary hover:underline">
                Forgot Password?
              </button>
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-primary text-white rounded-lg hover:bg-primary-600 transition-colors"
            >
              Log in
            </button>
          </form>
        </div>
      </div>

      {/* Right Section */}
      <div className="w-1/2 bg-secondary p-12 flex flex-col justify-between text-white">
        <div className="flex-1 flex items-center justify-center">
          <img
            src="https://raw.githubusercontent.com/your-username/your-repo/main/public/dashboard-preview.png"
            alt="Dashboard Preview"
            className="max-w-2xl"
          />
        </div>
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4">Connect with Zuno.</h2>
          <p className="text-lg text-white/80">
            Everything you need in an easy customizable dashboard.
          </p>
          <div className="flex justify-center space-x-2 mt-8">
            <div className="w-2 h-2 rounded-full bg-white"></div>
            <div className="w-2 h-2 rounded-full bg-white/50"></div>
            <div className="w-2 h-2 rounded-full bg-white/50"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Home,
  Package,
  Users,
  Receipt,
  CreditCard,
  ScrollText,
  Settings,
} from 'lucide-react';

const Header = () => {
  const location = useLocation();

  const navItems = [
    { path: '/', icon: Home, label: 'Dashboard' },
    { path: '/products', icon: Package, label: 'Products' },
    { path: '/roles', icon: ScrollText, label: 'Roles' },
    { path: '/team', icon: Users, label: 'Team' },
    { path: '/transactions', icon: Receipt, label: 'Transactions' },
    { path: '/plans', icon: CreditCard, label: 'Plans' },
    { path: '/settings', icon: Settings, label: 'Settings' },
  ];

  return (
    <header className="bg-white border-b w-full">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            {/* <span className="text-2xl font-bold text-primary">ZUNO</span> */}
            <img
              src="/assets/images/logo.svg"
              alt="Zuno Logo"
              style={{ height: '35px' }}
            />
          </Link>

          {/* Navigation Icons */}
          <nav className="flex items-center space-x-6">
            {navItems.map(({ path, icon: Icon, label }) => (
              <Link
                key={path}
                to={path}
                className={`relative group p-3 rounded-full transition-colors nav-item-tooltip ${
                  location.pathname === path
                    ? 'bg-secondary text-white'
                    : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                }`}
                // title={label}
              >
                <Icon className="w-5 h-5" />
                <span className="tooltip">{label}</span>
              </Link>
            ))}
          </nav>

          {/* User Profile */}
          <div className="flex items-center">
            <div className="mr-3 text-right">
              <div className="text-sm">Welcome,</div>
              <div className="font-medium text-secondary">Abhijith Sharma</div>
            </div>
            <Link to="/profile">
              <div className="h-10 w-10 rounded-full overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                  alt="Profile"
                  className="h-full w-full object-cover"
                />
              </div>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

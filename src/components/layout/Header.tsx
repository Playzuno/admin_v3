import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Home,
  Package,
  Users,
  Receipt,
  CreditCard,
  Settings,
  Gift,
  QrCode,
  Briefcase,
  PaintBucket,
} from 'lucide-react';

const Header = () => {
  const location = useLocation();
  const [navItems] = useState([
    { path: '/', icon: Home, label: 'Dashboard' },
    { path: '/products', icon: Package, label: 'Products' },
    { path: '/roles', icon: Briefcase, label: 'Roles' },
    { path: '/team', icon: Users, label: 'Team' },
    { path: '/transactions', icon: Receipt, label: 'Transactions' },
    { path: '/plans', icon: CreditCard, label: 'Plans' },
    { path: '/brand', icon: PaintBucket, label: 'Brand' },
    { path: '/settings', icon: Settings, label: 'Settings' },
    { path: '/rewards', icon: Gift, label: 'Rewards' },
    { path: '/qr-code', icon: QrCode, label: 'QR Code' },
  ]);

  // Find the active index
  const activeIndex = navItems.findIndex(
    item => item.path === location.pathname
  );

  // Calculate positions based on active index
  const getItemStyle = (index: number) => {
    const totalItems = navItems.length;
    const centerOffset = Math.floor(totalItems / 2);
    let relativePosition = index - activeIndex;

    // Normalize the position to be within [-centerOffset, centerOffset]
    if (relativePosition > centerOffset) {
      relativePosition -= totalItems;
    } else if (relativePosition < -centerOffset) {
      relativePosition += totalItems;
    }

    // Calculate the transform and opacity based on position
    const translateX = relativePosition * 60; // Base spacing
    // change 1 to 0 for applying reduced opacity from center to end
    const opacity = Math.max(1, 1 - Math.abs(relativePosition) * 0.3);
    const scale = index === activeIndex ? 1.3 : 1.1;

    return {
      transform: `translateX(${translateX}px) scale(${scale})`,
      opacity,
      transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
      zIndex: 10 - Math.abs(relativePosition),
    };
  };

  return (
    <header className="w-full">
      <div className="container mx-auto px-4">
        <div className="flex h-[4.5rem] items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <img
              src="/assets/images/logo.svg"
              alt="Zuno Logo"
              style={{ height: '35px' }}
            />
          </Link>

          {/* Navigation Icons
            removed overflow-hidden for now
          */}

          <div className="flex-1 flex justify-center relative">
            <div
              className="flex items-center relative"
              style={{ minHeight: '48px' }}
            >
              {navItems.map(({ path, icon: Icon, label }, index) => (
                <Link
                  key={path}
                  to={path}
                  style={getItemStyle(index)}
                  className={`absolute left-1/2 p-3 rounded-full transition-all cursor-pointer ${
                    location.pathname === path
                      ? 'bg-brand text-white scale-110'
                      : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                  }`}
                  title={label}
                >
                  <Icon className="w-5 h-5" />
                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                    {label}
                  </div>
                </Link>
              ))}
            </div>
          </div>

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

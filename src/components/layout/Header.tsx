import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Home,
  Package,
  Users,
  Receipt,
  CreditCard,
  Gift,
  QrCode,
  Briefcase,
  PaintBucket,
  ListMinus,
  Store,
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

const Header = () => {
  const location = useLocation();
  const [navItems] = useState([
    { path: '/', icon: Home, label: 'Dashboard' },
    { path: '/products', icon: Package, label: 'Products' },
    { path: '/roles', icon: Briefcase, label: 'Roles' },
    { path: '/team', icon: Users, label: 'Team' },
    { path: '/end-users', icon: ListMinus, label: 'End users' },
    { path: '/transactions', icon: Receipt, label: 'Transactions' },
    { path: '/plans', icon: CreditCard, label: 'Plans' },
    { path: '/brand', icon: PaintBucket, label: 'Brand' },
    { path: '/brands', icon: Store, label: 'Brand List' },
    // { path: '/settings', icon: Settings, label: 'Settings' },
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
    const display = Math.abs(relativePosition) <= 3 ? 'block' : 'none';

    return {
      transform: `translateX(${translateX}px) scale(${scale})`,
      opacity,
      transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
      zIndex: 10 - Math.abs(relativePosition),
      display,
      border: '0.5px solid #E4E4E4',
    };
  };

  const { user, imageVersion } = useAuth();

  return (
    <header className="w-full">
      <div className="container mx-auto px-4 py-3 mt-[1%]">
        <div className="flex h-[4.2rem] items-center justify-between px-[3%]">
          {/* Logo */}
          <Link to="/" className="flex items-center ml=[2%]">
            <img
              src="/assets/images/logo.svg"
              alt="Zuno Logo"
              style={{ height: '32px' }}
            />
          </Link>

          {/* Navigation Icons */}
          <div className="flex-1 flex justify-center relative">
            <div className="flex justify-center">
              <div
                className="flex items-center relative"
                style={{
                  minHeight: '48px',
                }}
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
          </div>

          {/* User Profile */}
          <div className="flex items-center">
            <div className="mr-3 text-right">
              <div className="text-sm">Welcome,</div>
              <div className="font-medium text-secondary">
                {user?.user?.fullName}
              </div>
            </div>
            <Link to="/profile">
              <div className="h-10 w-10 rounded-full overflow-hidden">
                {user?.user?.metadata?.profilePictureURL ? (
                  <img
                    key={1 + imageVersion}
                    src={user?.user?.metadata?.profilePictureURL}
                    alt="Profile"
                    className="h-full w-full object-cover"
                  />
                ) : (
                  // use avatar with initials
                  <div className="h-full w-full bg-brand flex items-center justify-center text-white text-sm">
                    {user?.user?.fullName?.charAt(0)}
                  </div>
                )}
              </div>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

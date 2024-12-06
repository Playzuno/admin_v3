import React, { useState } from 'react';
import { Edit } from 'lucide-react';

interface PersonalInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  bio: string;
}

const AccountSettings: React.FC = () => {
  const [personalInfo, setPersonalInfo] = useState<PersonalInfo>({
    firstName: 'John',
    lastName: 'Abraham',
    email: 'john.abraham1902@gmail.com',
    phone: '+91 98743 12345',
    bio: 'General Manager',
  });

  return (
    <div className="flex">
      {/* Sidebar */}
      <div className="w-48 space-y-4">
        <div className="px-6 py-3 bg-orange-100 rounded-2xl text-primary font-medium">
          My Profile
        </div>
        <button className="w-full text-left px-6 py-3 text-gray-500 hover:bg-gray-50 rounded-lg">
          Team Member
        </button>
        <button className="w-full text-left px-6 py-3 text-gray-500 hover:bg-gray-50 rounded-lg">
          Security
        </button>
        <button className="w-full text-left px-6 py-3 text-gray-500 hover:bg-gray-50 rounded-lg">
          Notifications
        </button>
        <button className="w-full text-left px-6 py-3 text-gray-500 hover:bg-gray-50 rounded-lg">
          Data Export
        </button>
        <button className="w-full text-left px-6 py-3 text-red-500 hover:bg-red-50 rounded-lg mt-auto">
          Delete Account
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 ml-12">
        <div className="mb-8">
          <h3 className="text-2xl font-bold mb-6">My Profile</h3>
          
          <div className="bg-white rounded-xl p-6">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 rounded-full overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h4 className="text-xl font-bold">John Abraham</h4>
                  <p className="text-gray-500">General Manager</p>
                  <p className="text-gray-500">Chennai, India</p>
                </div>
              </div>
              <button className="px-4 py-2 bg-orange-100 rounded-lg text-primary hover:bg-orange-200 transition-colors flex items-center space-x-2">
                <Edit className="w-4 h-4" />
                <span>edit</span>
              </button>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6">
          <div className="flex justify-between items-center mb-6">
            <h4 className="text-xl font-bold">Personal Information</h4>
            <button className="px-4 py-2 bg-orange-100 rounded-lg text-primary hover:bg-orange-200 transition-colors flex items-center space-x-2">
              <Edit className="w-4 h-4" />
              <span>edit</span>
            </button>
          </div>

          <div className="grid grid-cols-2 gap-x-8 gap-y-6">
            <div>
              <label className="block text-gray-500 mb-2">First name</label>
              <div className="text-gray-900">{personalInfo.firstName}</div>
            </div>
            <div>
              <label className="block text-gray-500 mb-2">Last name</label>
              <div className="text-gray-900">{personalInfo.lastName}</div>
            </div>
            <div>
              <label className="block text-gray-500 mb-2">Email address</label>
              <div className="text-gray-900">{personalInfo.email}</div>
            </div>
            <div>
              <label className="block text-gray-500 mb-2">Phone</label>
              <div className="text-gray-900">{personalInfo.phone}</div>
            </div>
            <div className="col-span-2">
              <label className="block text-gray-500 mb-2">Bio</label>
              <div className="text-gray-900">{personalInfo.bio}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountSettings;
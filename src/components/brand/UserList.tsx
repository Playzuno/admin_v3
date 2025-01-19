import React, { useState } from 'react';
import InviteForm from './InviteForm';

interface User {
  id: string;
  initial: string;
  name: string;
  role: string;
  avatar?: string;
}

interface UserListProps {
  onInvite: () => void;
}

const UserList: React.FC<UserListProps> = ({ onInvite, showInviteForm, cancelAction }) => {
  // const [showInviteForm, setShowInviteForm] = useState(true);

  const users: User[] = [
    {
      id: '1',
      initial: 'A',
      name: 'Abhijith Sharma',
      role: 'General Manager',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
    {
      id: '2',
      initial: 'A',
      name: 'Ashok Kumar',
      role: 'General Manager',
    },
    {
      id: '3',
      initial: 'K',
      name: 'Kumara velu',
      role: 'Waitron',
    },
    {
      id: '4',
      initial: 'S',
      name: 'Selva Kumar',
      role: 'Manager',
    },
  ];

  const handleInviteComplete = () => {
    setShowInviteForm(false);
    onInvite();
  };

  return (
    <div className="bg-white rounded-[32px] border border-gray-200 overflow-hidden">
      {showInviteForm ? (
        <InviteForm 
          onClose={() => cancelAction(false)}
          onInvite={handleInviteComplete}
        />
      ) : (
        <>
          <div className="grid grid-cols-2 px-4 py-3 bg-gray-50 border-b">
            <div className="text-xs font-medium text-gray-500">Name</div>
            <div className="text-xs font-medium text-gray-500">Role</div>
          </div>

          <div className="divide-y">
            {users.map(user => (
              <div key={user.id} className="flex items-center justify-between px-4 py-3">
                <div className="flex items-center space-x-3">
                  {user.avatar ? (
                    <img 
                      src={user.avatar} 
                      alt={user.name}
                      className="w-8 h-8 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center">
                      <span className="text-sm font-medium text-purple-700">{user.initial}</span>
                    </div>
                  )}
                  <span className="text-sm font-medium">{user.name}</span>
                </div>
                <span className="text-sm text-left text-gray-600">{user.role}</span>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default UserList;
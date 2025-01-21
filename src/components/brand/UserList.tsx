import React, { useState } from 'react';
import InviteForm from './InviteForm';
import { HeaderContainer } from '../containers';

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

const UserList: React.FC<UserListProps> = ({
  onInvite,
  showInviteForm,
  cancelAction,
}) => {
  // const [showInviteForm, setShowInviteForm] = useState(true);

  const users: User[] = [
    {
      id: '1',
      initial: 'A',
      name: 'Abhijith Sharma',
      role: 'General Manager',
      avatar:
        'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
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

  return showInviteForm ? (
    <InviteForm
      onClose={() => cancelAction(false)}
      onInvite={handleInviteComplete}
    />
  ) : (
    <HeaderContainer
      title={
        <div className="grid grid-cols-3">
          <div className="col-span-2 text-xs font-medium pl-4">Name</div>
          <div className="text-xs font-medium">Role</div>
        </div>
      }
    >
      <>
        <div className="divide-y">
          {users.map(user => (
            <div
              key={user.id}
              className="flex items-center justify-between px-4 py-3"
            >
              <div className="flex items-center space-x-3 px-4 space-y-2">
                {user.avatar ? (
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-8 h-8 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-8 h-8 rounded-full bg-brand/10 flex items-center justify-center">
                    <span className="text-sm font-medium text-brand">
                      {user.initial}
                    </span>
                  </div>
                )}
                <span className="text-xs pb-1">{user.name}</span>
              </div>
              <span className="text-xs w-40 text-left">{user.role}</span>
            </div>
          ))}
        </div>
      </>
    </HeaderContainer>
  );
};

export default UserList;

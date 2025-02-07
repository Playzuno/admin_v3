import React, { useEffect, useState } from 'react';
import InviteForm from './InviteForm';
import { HeaderContainer } from '../containers';
import { useLocation } from 'react-router-dom';
import { BranchDashboardStats, InviteFormData } from '@/types';
import { branchApi, memberApi } from '@/api';
import { useOrg } from '@/context/OrgContext';

interface User {
  id: string;
  initial: string;
  name: string;
  role: string;
  avatar?: string;
}

interface UserListProps {
  onInvite: (formData: InviteFormData) => void;
  showInviteForm: boolean;
  setShowInviteForm: (show: boolean) => void;
  cancelAction: (cancel: boolean) => void;
  branch: BranchDashboardStats | undefined;
}

const UserList: React.FC<UserListProps> = ({
  onInvite,
  showInviteForm,
  setShowInviteForm,
  cancelAction,
  branch,
}) => {

  const [members, setMembers] = useState<User[]>([]);
  const {orgId} = useOrg();
  useEffect(() => {
    if (!branch) return;
    memberApi.getAll(orgId, branch.branchId).then(res => {
      if (!res.data || res.data.length === 0) {
        setMembers([]);
        return;
      }
      setMembers(res.data.map(member => ({
        id: member.id,
        initial: member.user.fullName.charAt(0),
        name: member.user.fullName,
        role: member.role.name,
        avatar: member.user.metadata.profilePictureURL,
      })));
    });
  }, [branch]);

  // const handleInviteComplete = () => {
  //   setShowInviteForm(false);
  //   onInvite();
  // };

  const {state: locationState} = useLocation();
  useEffect(() => {
    if (locationState?.openMemberForm) {
      setShowInviteForm(true);
    }
  }, [locationState]);

  return showInviteForm ? (
    <InviteForm
      onClose={() => cancelAction(false)}
      onInvite={(props) => {
        setShowInviteForm(false);
        onInvite(props);
      }}
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
          {members.map(member => (
            <div
              key={member.id}
              className="flex items-center justify-between px-4 py-3"
            >
              <div className="flex items-center space-x-3 px-4 space-y-2">
                {member.avatar ? (
                  <img
                    src={member.avatar}
                    alt={member.name}
                    className="w-8 h-8 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-8 h-8 rounded-full bg-brand/10 flex items-center justify-center">
                    <span className="text-sm font-medium text-brand">
                      {member.initial}
                    </span>
                  </div>
                )}
                <span className="text-xs pb-1">{member.name}</span>
              </div>
              <span className="text-xs w-40 text-left">{member.role}</span>
            </div>
          ))}
        </div>
      </>
    </HeaderContainer>
  );
};

export default UserList;

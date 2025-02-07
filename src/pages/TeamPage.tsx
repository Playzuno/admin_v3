import React, { useEffect, useState } from 'react';
import { Search, ChevronDown, Infinity, Filter } from 'lucide-react';
import { TeamMember } from '../types/team';
import { teamMembers as seedTeamMembers } from '../seeds';
import RoleDropdown from '../components/team/RoleDropdown';
import ExpirationDate from '../components/team/ExpirationDate';
import ConfirmDialog from '../components/ui/ConfirmDialog';
import Button from '../components/ui/Button';
import { TabContainer } from '../components/containers';
import Checkbox from '../components/ui/Checkbox';
import { useOrg } from '@/context/OrgContext';
import { memberApi, roleApi } from '@/api';
import { BranchMember, BranchMemberResponse, ExpireMode, Role } from '@/types';
import { useNavigate } from 'react-router-dom';
import { ErrorToast, SuccessToast } from '@/components/ui/toast';

const TeamPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>(seedTeamMembers);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMembers, setSelectedMembers] = useState<string[]>([]);
  const [editingMember, setEditingMember] = useState<string | null>(null);
  const [memberToDelete, setMemberToDelete] = useState<string | null>(null);
  const [roleFilter, setRoleFilter] = useState<string | null>(null);
  const [roles, setRoles] = useState<Role[]>([]);
  const [originalTeamMembers, setOriginalTeamMembers] = useState<TeamMember[]>([]);

  const { branch} = useOrg();
  useEffect(() => {
    if (branch) {
      memberApi.getAll(branch.orgId, branch.id).then(response => {
        // console.log(response.data);
        const members: TeamMember[] = response.data.map((member: BranchMemberResponse) => ({
          id: member.id,
          name: member.user.fullName,
          initial: member.user.fullName.charAt(0),
          role: member.role,
          position: member.user.metadata.designation,
          expiration: member.roleExpiresAt,
          daysToExpire: countExpirationDays(member.roleExpiresAt),
          accessExpires: new Date(member.roleExpiresAt).toLocaleDateString('en-GB', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
          }),
          accessExpiresAt: new Date(member.roleExpiresAt),
          roles: [member.role.name],
          roleId: member.roleId,
          expireMode: member.expireMode,
        }));
        setTeamMembers(members);
        setOriginalTeamMembers(members);
      });

      roleApi.getAll(branch.id).then(response => {
        setRoles(response.data);
      });
    }
  }, [branch]);

  const handleSelectMember = (memberId: string) => {
    setSelectedMembers(prev =>
      prev.includes(memberId)
        ? prev.filter(id => id !== memberId)
        : [...prev, memberId]
    );
  };

  const handleSelectAll = () => {
    if (selectedMembers.length === teamMembers.length) {
      setSelectedMembers([]);
    } else {
      setSelectedMembers(teamMembers.map(member => member.id));
    }
  };

  const handleRoleChange = (memberId: string, newRole: string) => {
    if (editingMember !== memberId) {
      setEditingMember(memberId);
    }
    setTeamMembers(prev =>
      prev.map(member =>
        member.id === memberId ? { ...member, roleId: newRole } : member
      )
    );
   setOriginalTeamMembers(prev =>
    prev.map(member =>
      member.id === memberId ? { ...member, roleId: newRole } : member
    )
  );
  };

  const handleDelete = (memberId: string) => {
    setMemberToDelete(memberId);
  };

  const confirmDelete = () => {
    if (!branch?.id) return;
    if (memberToDelete) {
    memberApi.removeFromBranch(branch.id, memberToDelete).then(response => {
      // console.log(response);
      SuccessToast('Member removed from branch');
      setTeamMembers(prev =>
        prev.filter(member => member.id !== memberToDelete)
      );
      setMemberToDelete(null);
    }).catch(error => {
      console.log(error);
      ErrorToast('Failed to remove member from branch');
    });
  }
  };

  const handleDateChange = (memberId: string, date: Date | null) => {
    if (editingMember !== memberId) {
      setEditingMember(memberId);
    }
    if (!date) {
      setTeamMembers(prev =>
        prev.map(member =>
          member.id === memberId
            ? { ...member, accessExpiresAt: new Date("0001-01-01T00:00:00Z"), daysToExpire: -1, accessExpires: 'No expiration', expireMode: ExpireMode.INFINITE }
            : member
        )
      );
      return
    }
    setTeamMembers(prev =>
      prev.map(member => {
        // console.log(member.id, memberId, date, countExpirationDays(date.toISOString()))
        return member.id === memberId
          ? {
              ...member,
              accessExpiresAt: date,
              daysToExpire: countExpirationDays(date.toISOString()),
              accessExpires: date.toLocaleDateString('en-GB', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric',
              }),
              expireMode: ExpireMode.FINITE,
            }
          : member
      }
      )
    );
  };

  const countExpirationDays = (expiration: string) => {
    const expirationDate = new Date(expiration);
    const today = new Date();
    const diffTime = expirationDate.getTime() - today.getTime();
    const days = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return days > 0 ? days : -1;
  };

  const updateTeamMember = () => {
    // console.log(teamMembers);
    if (!branch?.id) return;
    const member = teamMembers.find(member => member.id === editingMember);
    if (!member) return;
    const updatedMembers = memberApi.update(branch.id, member.id, {
      roleId: member.roleId,
      roleExpiresAt: member.accessExpiresAt,
      expireMode: member.expireMode,
    });
    // console.log(updatedMembers);
  };

  const getAccessExpiresText = (member: TeamMember) => {
    if (member.expireMode === ExpireMode.INFINITE) {
      return (
        <div className="flex items-center space-x-1">
          <Infinity className="w-4 h-4" />
          <span>No expiration</span>
        </div>
      );
    }
    if (member.daysToExpire <= 0) {
      return (
        <div className="flex items-center space-x-1">
          <span>Expired {Math.abs(member.daysToExpire)} days ago</span>
        </div>
      );
    }
    return `${member.daysToExpire} days`;
  };

  const navigate = useNavigate();
  const openMemberForm = () => {
    navigate('/brand', {
      state: {openMemberForm: true}
    });
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="title-2">Manage Team Members</h1>
        <div className="flex space-x-4">
          <Button variant="secondary" size="sm" onClick={openMemberForm}>
            Add member
          </Button>
          {/* <Button variant="zuno-dark-2" size="sm">
            Edit roles
          </Button> */}
        </div>
      </div>
      <TabContainer
        tabs={[
          { key: 'all', label: 'All' },
          { key: 'members', label: 'Members' },
          { key: 'groups', label: 'Groups' },
        ]}
        activeTab={activeTab}
        onTabChange={setActiveTab}
      >
        <div className="bg-white rounded-lg shadow-sm">
          {/* Search and Filters */}
          <div className="mb-8 flex items-center">
            <div className="flex space-x-4 flex-1">
              <div className="relative flex-1 max-w-xs">
                <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search"
                  className="pl-10 pr-4 py-3 bg-gray-100 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-brand/20"
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="flex items-center space-x-4">
                <Button
                  variant="secondary"
                  size="sm"
                  bgColor="bg-brand"
                  style={{ borderRadius: '8px' }}
                  icon={Filter}
                  iconPosition="left"
                  onClick={() => setRoleFilter(null)}
                >
                  <span>Filter by role</span>
                  <ChevronDown className="w-4 h-4 ml-2" />
                </Button>
              </div>
              <div className="flex-1"></div>
              <div className="flex items-center space-x-4">
                {editingMember && (
                  <>
                    <Button
                      variant="light"
                      onClick={() => {
                        setTeamMembers(originalTeamMembers);
                        setEditingMember(null);
                      }}
                    >
                      Cancel
                    </Button>
                    <Button
                      variant="primary"
                      onClick={() => updateTeamMember()}
                    >
                      Save Changes
                    </Button>
                  </>
                )}
                <button className="px-4 py-2 bg-[#EDEDED] rounded-lg text-[#7E7E7E] flex items-center space-x-2">
                  <span className="mr-4">Sort by teams</span>
                  <ChevronDown className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Table */}
          <div className="max-h-[calc(100vh-300px)] overflow-y-auto">
            <table className="w-full">
              <thead className="sticky top-0 ">
                <tr className="text-left border-b">
                  <th className="pl-6 py-4">
                    <Checkbox
                      bgColor="bg-brand"
                      label=""
                      checked={selectedMembers.length === teamMembers.length}
                      onChange={handleSelectAll}
                    />
                  </th>
                  <th className="pr-6 py-4 title">Account</th>
                  <th className="px-6 py-4 title">Access expires in</th>
                  <th className="px-6 py-4 title">Role</th>
                  <th className="px-6 py-4 title">Expiration</th>
                  <th className="px-6 py-4"></th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {teamMembers.map(member => (
                  <tr key={member.id} className={`hover:bg-gray-50 ${editingMember !== member.id && !!editingMember ? 'cursor-not-allowed pointer-events-none' : ''}`}>
                    <td className="pl-6 py-4">
                      <Checkbox
                        bgColor="bg-brand"
                        label=""
                        checked={selectedMembers.includes(member.id)}
                        onChange={() => handleSelectMember(member.id)}
                      />
                    </td>
                    <td className="pr-6 py-4">
                      <div className="flex items-center space-x-3">
                        {/* <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center">
                          <span className="text-primary font-medium">
                            {member.initial}
                          </span>
                        </div> */}
                        <div>
                          <div className="zuno-text">{member.name}</div>
                          <div className="subtitle-2">{member.position}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 zuno-text">
                      {getAccessExpiresText(member)}
                    </td>
                    <td className="px-6 py-4">
                      <RoleDropdown
                        role={member.roleId}
                        roles={roles}
                        onRoleChange={newRole =>
                          handleRoleChange(member.id, newRole)
                        }
                        disabled={
                          editingMember !== null && editingMember !== member.id
                        }
                      />
                    </td>
                    <td className="px-6 py-4">
                      <ExpirationDate
                        date={member.daysToExpire === -1 ? null : member.accessExpiresAt}
                        expireMode={member.expireMode}
                        onClear={() => handleDateChange(member.id, null)}
                        onSelectDate={date => handleDateChange(member.id, date)}
                      />
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => handleDelete(member.id)}
                        className="text-error hover:text-error"
                        disabled={
                          editingMember !== null && editingMember !== member.id
                        }
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </TabContainer>

      <ConfirmDialog
        isOpen={memberToDelete !== null}
        title="Delete Team Member"
        message="Are you sure you want to delete this team member? This action cannot be undone."
        onConfirm={confirmDelete}
        onCancel={() => setMemberToDelete(null)}
      />
    </div>
  );
};

export default TeamPage;

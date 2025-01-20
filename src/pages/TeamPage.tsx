import React, { useState } from 'react';
import { Search, ChevronDown, Infinity, Filter } from 'lucide-react';
import { TeamMember } from '../types/team';
import { teamMembers as seedTeamMembers } from '../seeds';
import RoleDropdown from '../components/team/RoleDropdown';
import ExpirationDate from '../components/team/ExpirationDate';
import ConfirmDialog from '../components/ui/ConfirmDialog';
import Button from '../components/ui/Button';
import { TabContainer } from '../components/containers';
import Checkbox from '../components/ui/Checkbox';

const TeamPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>(seedTeamMembers);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMembers, setSelectedMembers] = useState<string[]>([]);
  const [editingMember, setEditingMember] = useState<string | null>(null);
  const [memberToDelete, setMemberToDelete] = useState<string | null>(null);
  const [roleFilter, setRoleFilter] = useState<string | null>(null);

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
        member.id === memberId ? { ...member, role: newRole } : member
      )
    );
  };

  const handleDelete = (memberId: string) => {
    setMemberToDelete(memberId);
  };

  const confirmDelete = () => {
    if (memberToDelete) {
      setTeamMembers(prev =>
        prev.filter(member => member.id !== memberToDelete)
      );
      setMemberToDelete(null);
    }
  };

  const handleDateChange = (memberId: string, date: Date | null) => {
    if (editingMember !== memberId) {
      setEditingMember(memberId);
    }
    setTeamMembers(prev =>
      prev.map(member =>
        member.id === memberId
          ? {
              ...member,
              expiration: date
                ? date
                    .toLocaleDateString('en-GB', {
                      day: '2-digit',
                      month: '2-digit',
                      year: 'numeric',
                    })
                    .split('/')
                    .join('.')
                : null,
              daysToExpire: date
                ? Math.ceil(
                    (date.getTime() - new Date().getTime()) /
                      (1000 * 60 * 60 * 24)
                  )
                : -1,
            }
          : member
      )
    );
  };

  const getAccessExpiresText = (daysToExpire: number) => {
    if (daysToExpire === -1)
      return (
        <div className="flex items-center space-x-1">
          <Infinity className="w-4 h-4" />
          <span>No expiration</span>
        </div>
      );
    return `${daysToExpire} days`;
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="title-2">Manage Team Members</h1>
        <div className="flex space-x-4">
          <Button variant="secondary" size="sm">
            Add member
          </Button>
          <Button variant="zuno-dark-2" size="sm">
            Edit roles
          </Button>
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
                  className="pl-10 pr-4 py-2 bg-gray-100 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-brand/20"
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
                      onClick={() => setEditingMember(null)}
                    >
                      Cancel
                    </Button>
                    <Button
                      variant="primary"
                      onClick={() => setEditingMember(null)}
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
              <thead className="sticky top-0 bg-white">
                <tr className="text-left border-y">
                  <th className="pl-6 py-4">
                    <Checkbox
                      bgColor="bg-brand"
                      label=""
                      checked={selectedMembers.length === teamMembers.length}
                      onChange={handleSelectAll}
                    />
                  </th>
                  <th className="px-6 py-4 title">Account</th>
                  <th className="px-6 py-4 title">Access expires in</th>
                  <th className="px-6 py-4 title">Role</th>
                  <th className="px-6 py-4 title">Expiration</th>
                  <th className="px-6 py-4"></th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {teamMembers.map(member => (
                  <tr key={member.id} className="hover:bg-gray-50">
                    <td className="pl-6 py-4">
                      <Checkbox
                        bgColor="bg-brand"
                        label=""
                        checked={selectedMembers.includes(member.id)}
                        onChange={() => handleSelectMember(member.id)}
                      />
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center">
                          <span className="text-primary font-medium">
                            {member.initial}
                          </span>
                        </div>
                        <div>
                          <div className="zuno-text">{member.name}</div>
                          <div className="subtitle-2">{member.position}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 zuno-text">
                      {getAccessExpiresText(member.daysToExpire)}
                    </td>
                    <td className="px-6 py-4">
                      <RoleDropdown
                        role={member.role}
                        roles={member.roles}
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
                        date={member.expiration}
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

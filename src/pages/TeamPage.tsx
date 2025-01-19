import React, { useState } from 'react';
import { Search, ChevronDown, Infinity, Filter } from 'lucide-react';
import { TeamMember } from '../types/team';
import { teamMembers as seedTeamMembers } from '../seeds';
import RoleDropdown from '../components/team/RoleDropdown';
import ExpirationDate from '../components/team/ExpirationDate';
import ConfirmDialog from '../components/ui/ConfirmDialog';

const TeamPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('All');
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
      setTeamMembers(prev => prev.filter(member => member.id !== memberToDelete));
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
                ? date.toLocaleDateString('en-GB', {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric',
                  }).split('/').join('.')
                : null,
              daysToExpire: date
                ? Math.ceil((date.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))
                : -1,
            }
          : member
      )
    );
  };

  const getAccessExpiresText = (daysToExpire: number) => {
    if (daysToExpire === -1) return <div className="flex items-center space-x-1">
      <Infinity className="w-4 h-4" />
      <span>No expiration</span>
    </div>;
    return `${daysToExpire} days`;
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Manage Team Members</h1>
        <div className="flex space-x-4">
          <button className="btn btn-secondary">Add member</button>
          <button className="px-6 py-2 bg-secondary-50 text-secondary rounded-md hover:bg-secondary-100 transition-colors">
            Edit roles
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm">
        {/* Tabs */}
        <div className="flex space-x-8 px-6 pt-4 border-b">
          {['All', 'Members', 'Groups'].map((tab) => (
            <button
              key={tab}
              className={`pb-4 relative ${
                activeTab === tab
                  ? 'text-primary font-medium border-b-2 border-primary'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Search and Filters */}
        <div className="p-6 flex items-center border-b">
          <div className="flex space-x-4 flex-1">
            <div className="relative flex-1 max-w-md">
              <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search"
                className="pl-10 pr-4 py-2 bg-gray-100 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-primary/20"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex items-center space-x-4">
              <button 
                className="px-4 py-2 bg-secondary text-white rounded-lg flex items-center space-x-2"
                onClick={() => setRoleFilter(null)}
              >
                <Filter className="w-4 h-4" />
                <span>Filter by role</span>
                <ChevronDown className="w-4 h-4 ml-2" />
              </button>
              <button className="px-4 py-2 bg-gray-100 rounded-lg text-gray-700 flex items-center space-x-2">
                <span>Sort by teams</span>
                <ChevronDown className="w-4 h-4" />
              </button>
              {editingMember && (
                <>
                  <button 
                    onClick={() => setEditingMember(null)}
                    className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
                  >
                    Cancel
                  </button>
                  <button 
                    onClick={() => setEditingMember(null)}
                    className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-600 transition-colors"
                  >
                    Save Changes
                  </button>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="max-h-[calc(100vh-300px)] overflow-y-auto">
          <table className="w-full">
            <thead className="sticky top-0 bg-white">
              <tr className="text-left border-y">
                <th className="pl-6 py-4">
                  <input
                    type="checkbox"
                    checked={selectedMembers.length === teamMembers.length}
                    onChange={handleSelectAll}
                    className="rounded border-gray-300 text-primary focus:ring-primary"
                  />
                </th>
                <th className="px-6 py-4 font-medium">Account</th>
                <th className="px-6 py-4 font-medium">Access expires</th>
                <th className="px-6 py-4 font-medium">Role</th>
                <th className="px-6 py-4 font-medium">Expiration</th>
                <th className="px-6 py-4"></th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {teamMembers.map((member) => (
                <tr key={member.id} className="hover:bg-gray-50">
                  <td className="pl-6 py-4">
                    <input
                      type="checkbox"
                      checked={selectedMembers.includes(member.id)}
                      onChange={() => handleSelectMember(member.id)}
                      className="rounded border-gray-300 text-primary focus:ring-primary"
                    />
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center">
                        <span className="text-primary font-medium">{member.initial}</span>
                      </div>
                      <div>
                        <div className="font-medium">{member.name}</div>
                        <div className="text-sm text-gray-500">{member.position}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">{getAccessExpiresText(member.daysToExpire)}</td>
                  <td className="px-6 py-4">
                    <RoleDropdown
                      role={member.role}
                      roles={member.roles}
                      onRoleChange={(newRole) => handleRoleChange(member.id, newRole)}
                      disabled={editingMember !== null && editingMember !== member.id}
                    />
                  </td>
                  <td className="px-6 py-4">
                    <ExpirationDate
                      date={member.expiration}
                      onClear={() => handleDateChange(member.id, null)}
                      onSelectDate={(date) => handleDateChange(member.id, date)}
                    />
                  </td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => handleDelete(member.id)}
                      className="text-red-500 hover:text-red-600"
                      disabled={editingMember !== null && editingMember !== member.id}
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
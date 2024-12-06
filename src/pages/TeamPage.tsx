import React, { useState } from 'react';
import { Search, ChevronDown } from 'lucide-react';
import { TeamMember } from '../types/team';
import { initialTeamMembers } from '../data/teamMembers';
import RoleDropdown from '../components/team/RoleDropdown';
import ExpirationDate from '../components/team/ExpirationDate';

const TeamPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMembers, setSelectedMembers] = useState<string[]>([]);
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>(initialTeamMembers);

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

  const handleEditRoles = () => {
    // Handle edit roles action
  };

  const handleClearDate = (memberId: string) => {
    setTeamMembers(members => 
      members.map(member => 
        member.id === memberId 
          ? { ...member, expiration: 'Expiration date' }
          : member
      )
    );
  };

  const handleSelectDate = (memberId: string, date: Date) => {
    setTeamMembers(members =>
      members.map(member =>
        member.id === memberId
          ? { 
              ...member, 
              expiration: date.toLocaleDateString('en-GB', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric'
              }).split('/').join('.')
            }
          : member
      )
    );
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

        {/* Filters */}
        <div className="p-6 flex justify-between items-center">
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
            <button className="px-4 py-2 bg-secondary text-white rounded-lg flex items-center space-x-2">
              <span>Roles</span>
              <ChevronDown className="w-4 h-4" />
            </button>
          </div>
          <button className="flex items-center space-x-2 px-4 py-2 bg-gray-100 rounded-lg text-gray-700">
            <span>Sort by teams</span>
            <ChevronDown className="w-4 h-4" />
          </button>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
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
                <th className="px-6 py-4 font-medium">Projects</th>
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
                  <td className="px-6 py-4">{member.projects}</td>
                  <td className="px-6 py-4">{member.accessExpires}</td>
                  <td className="px-6 py-4">
                    <RoleDropdown
                      role={member.role}
                      roles={member.roles}
                      onEditRoles={handleEditRoles}
                    />
                  </td>
                  <td className="px-6 py-4">
                    <ExpirationDate
                      date={member.expiration}
                      onClear={() => handleClearDate(member.id)}
                      onSelectDate={(date) => handleSelectDate(member.id, date)}
                    />
                  </td>
                  <td className="px-6 py-4 text-primary">Delete</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default TeamPage;
// Centralized seed data for the entire application
import { TeamMember } from '../types/team';
import { Role } from '../types/role';
import { Transaction } from '../types/transaction';

export const teamMembers: TeamMember[] = [
  {
    id: '1',
    name: 'Abhishek Rath',
    initial: 'A',
    role: 'Multiple roles',
    position: 'General Manager',
    daysToExpire: 365,
    accessExpires: null,
    roles: ['Administrator', 'Manager'],
    expiration: '21.11.2025',
  },
  {
    id: '2',
    name: 'Abhijith Sharma',
    initial: 'A',
    role: 'Administrator',
    position: 'Administrator',
    daysToExpire: -1,
    accessExpires: null,
    roles: ['Administrator'],
    expiration: null,
  },
  {
    id: '3',
    name: 'Abhishek Rath',
    initial: 'A',
    role: 'Administrator',
    position: 'General Manager',
    daysToExpire: 25,
    accessExpires: null,
    roles: ['Administrator'],
    expiration: '21.11.2025',
  },
  {
    id: '4',
    name: 'Abhishek Rath',
    initial: 'A',
    role: 'Multiple roles',
    position: 'General Manager',
    daysToExpire: 180,
    accessExpires: null,
    roles: ['Administrator', 'Manager'],
    expiration: '21.11.2025',
  },
];

// Export other seed data as needed
export const roles: Role[] = [
  // ... existing roles data
];

export const transactions: Transaction[] = [
  // ... existing transactions data
];
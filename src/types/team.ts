export interface TeamMember {
  id: string;
  name: string;
  initial: string;
  role: string;
  position: string;
  daysToExpire: number;
  accessExpires: string;
  roles: string[];
  expiration: string | null;
}

export interface TeamMemberRole {
  name: string;
  isActive: boolean;
}
export interface TeamMember {
  id: string;
  name: string;
  initial: string;
  role: string;
  position: string;
  projects: number;
  accessExpires: string;
  roles: string[];
  expiration: string;
}

export interface TeamMemberRole {
  name: string;
  isActive: boolean;
}
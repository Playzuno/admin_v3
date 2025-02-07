import { ExpireMode, Role } from ".";

export interface TeamMember {
  id: string;
  name: string;
  initial: string;
  role: Role;
  position: string;
  daysToExpire: number;
  accessExpires: string;
  expireMode: typeof ExpireMode[keyof typeof ExpireMode];
  roles: string[];
  expiration: string | null;
  roleId: string;
  accessExpiresAt: Date;
}

export interface TeamMemberRole {
  name: string;
  isActive: boolean;
}
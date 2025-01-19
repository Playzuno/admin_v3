export interface Branch {
  id: string;
  initial: string;
  name: string;
  branchId: string;
  users: number;
  feedback: number;
  isActive: boolean;
}

export interface InviteFormData {
  username: string;
  email: string;
  contact: string;
  branch: string;
  role: string;
}
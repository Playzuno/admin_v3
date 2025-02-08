import { LoggedInUser } from '.';

export interface AuthContextType {
  user: LoggedInUser | null;
  updateUser: () => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
  updateUserImageVersion: () => Promise<void>;
  imageVersion: number;
}

export type Role = 'ADMIN' | 'USER';

export interface User {
  id: number;
  username: string;
  password?: string; // Should not be sent to frontend
  name: string;
  roles: Role[];
}

export interface MenuItem {
  id: string;
  label: string;
  path?: string;
  icon?: string;
  children?: MenuItem[];
}

export interface UserPrefs {
  themeColor?: string;
  menuPlacement?: 'top' | 'left' | 'right' | 'bottom';
  bgImageUrl?: string;
}

// For JWT payload
export interface JwtPayload {
  id: number;
  username: string;
  roles: Role[];
}

// Add user to Express Request
declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload;
    }
  }
}

// These types should mirror the data structures sent by the backend API.

export interface Role {
  id: number;
  name: string;
  description?: string;
}

export interface User {
  id: number;
  username: string;
  employeeName: string;
  email?: string;
  roles: Role[];
}

export interface Menu {
  id: number;
  name: string;
  type: 'INTERNAL' | 'EXTERNAL';
  path?: string;
  icon?: string;
  order: number;
  children: Menu[];
  parent?: Menu;
}

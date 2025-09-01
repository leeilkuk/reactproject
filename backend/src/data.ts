import { User, MenuItem, UserPrefs } from './types';

// Seed data for users. In a real application, this would come from a database.
// Passwords should be hashed. For this example, we'll use plain text.
export const usersSeed: User[] = [
  {
    id: 1,
    username: 'admin',
    password: 'admin123',
    name: 'Administrator',
    roles: ['ADMIN'],
  },
  {
    id: 2,
    username: 'user',
    password: 'user123',
    name: 'Normal User',
    roles: ['USER'],
  },
];

// Seed data for the 3-depth menu structure.
export const menusSeed: MenuItem[] = [
  {
    id: 'dashboard',
    label: '대시보드',
    path: '/app/dashboard',
    icon: 'bi-speedometer2',
  },
  {
    id: 'pay',
    label: '급여',
    icon: 'bi-cash-coin',
    children: [
      {
        id: 'pay-monthly',
        label: '월별',
        children: [
          {
            id: 'pay-manage',
            label: '정산관리',
            path: '/app/pay/monthly/manage',
          },
          {
            id: 'pay-report',
            label: '리포트',
            path: '/app/pay/monthly/report',
          },
        ],
      },
    ],
  },
  {
    id: 'admin',
    label: '관리',
    icon: 'bi-person-fill-gear',
    children: [
      {
        id: 'users',
        label: '사용자',
        path: '/app/admin/users',
      },
      {
        id: 'roles',
        label: '권한',
        path: '/app/admin/roles',
      },
    ],
  },
  {
    id: 'settings',
    label: '설정',
    icon: 'bi-gear',
    path: '/app/settings/theme',
  }
];

// In-memory store for user preferences.
// In a real application, this would be stored in a database.
// Map<userId, UserPrefs>
export const userPrefsStore = new Map<number, UserPrefs>();

import { AppDataSource } from './data-source';
import { UserService } from './services/UserService';
import { RoleService } from './services/RoleService';
import { MenuService } from './services/MenuService';

const seedDatabase = async () => {
  console.log('Seeding database...');
  await AppDataSource.initialize();

  const userService = new UserService();
  const roleService = new RoleService();
  const menuService = new MenuService();

  // Create roles
  const adminRole = await roleService.createRole({ name: 'ADMIN', description: 'Super Administrator' });
  const userRole = await roleService.createRole({ name: 'USER', description: 'General User' });
  console.log('Roles created...');

  // Create admin user
  const adminUser = await userService.createUser({
    username: 'admin',
    passwordHash: 'admin123', // In a real app, this would be the raw password to be hashed
    employeeName: 'Admin User',
    email: 'admin@example.com'
  });
  console.log('Admin user created...');

  // Assign roles to admin user
  await userService.assignRoles(adminUser.id, ['ADMIN', 'USER']);
  console.log('Roles assigned to admin...');

  // Create menus
  const dashboardMenu = await menuService.createMenu({ name: 'Dashboard', path: '/app/dashboard', icon: 'bi-speedometer2', order: 1 });
  const adminMenu = await menuService.createMenu({ name: 'Administration', icon: 'bi-person-fill-gear', order: 2 });

  await menuService.createMenu({ name: 'User Management', path: '/app/admin/users', order: 1 }, adminMenu.id);
  await menuService.createMenu({ name: 'Role Management', path: '/app/admin/roles', order: 2 }, adminMenu.id);
  await menuService.createMenu({ name: 'Menu Management', path: '/app/admin/menus', order: 3 }, adminMenu.id);
  console.log('Menus created...');

  // Assign all menus to ADMIN role
  await menuService.assignRoles(dashboardMenu.id, ['ADMIN']);
  await menuService.assignRoles(adminMenu.id, ['ADMIN']);
  console.log('Menus assigned to ADMIN role...');

  await AppDataSource.destroy();
  console.log('Seeding complete.');
};

seedDatabase().catch(error => {
  console.error('Seeding failed:', error);
  process.exit(1);
});

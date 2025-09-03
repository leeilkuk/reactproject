import { Router } from 'express';
import { z } from 'zod';
import { UserService } from './services/UserService';
import { RoleService } from './services/RoleService';
import { MenuService } from './services/MenuService';
import { authGuard } from './auth'; // Assuming auth.ts exists and provides this
import jwt from 'jsonwebtoken';

const router = Router();
const userService = new UserService();
const roleService = new RoleService();
const menuService = new MenuService();

const JWT_SECRET = process.env.JWT_SECRET || 'dev-secret';

// Auth routes
router.post('/auth/login', async (req, res) => {
  const { username, password } = req.body;
  const user = await userService.findByUsername(username);

  if (!user || !(await userService.validatePassword(password, user.passwordHash))) {
    return res.status(401).json({ ok: false, message: 'Invalid credentials' });
  }

  const payload = { id: user.id, username: user.username, roles: user.roles.map(r => r.name) };
  const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '2h' });

  res.json({ ok: true, token, user: { id: user.id, name: user.employeeName, roles: user.roles.map(r => r.name) } });
});

router.get('/auth/me', authGuard, async (req, res) => {
    res.json({ ok: true, user: req.user });
});


// User routes
router.get('/users', authGuard, async (req, res) => {
  const users = await userService.findAll();
  res.json(users);
});

router.post('/users', authGuard, async (req, res) => {
  const newUser = await userService.createUser(req.body);
  res.json(newUser);
});

router.post('/users/:id/roles', authGuard, async (req, res) => {
    const user = await userService.assignRoles(parseInt(req.params.id), req.body.roles);
    res.json(user);
});


// Role routes
router.get('/roles', authGuard, async (req, res) => {
  const roles = await roleService.findAll();
  res.json(roles);
});

router.post('/roles', authGuard, async (req, res) => {
  const newRole = await roleService.createRole(req.body);
  res.json(newRole);
});


// Menu routes
router.get('/menus', authGuard, async (req, res) => {
  const menus = await menuService.findTrees();
  res.json(menus);
});

router.post('/menus', authGuard, async (req, res) => {
    const newMenu = await menuService.createMenu(req.body, req.body.parentId);
    res.json(newMenu);
});

router.post('/menus/:id/roles', authGuard, async (req, res) => {
    const menu = await menuService.assignRoles(parseInt(req.params.id), req.body.roles);
    res.json(menu);
});


export default router;

import { Router, Request, Response } from 'express';
import { z } from 'zod';
import { findUser, signToken, authGuard } from './auth';
import { menusSeed, userPrefsStore } from './data';
import { JwtPayload } from './types';

const router = Router();

// Zod schema for user preferences validation
const userPrefsSchema = z.object({
  themeColor: z.string().optional(),
  menuPlacement: z.enum(['top', 'left', 'right', 'bottom']).optional(),
  bgImageUrl: z.string().url().or(z.literal('')).optional(),
});

// POST /api/auth/login
router.post('/auth/login', (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ ok: false, message: 'Username and password are required.' });
  }

  const user = findUser(username, password);

  if (!user) {
    return res.status(401).json({ ok: false, message: 'Invalid credentials.' });
  }

  const payload: JwtPayload = {
    id: user.id,
    username: user.username,
    roles: user.roles,
  };

  const token = signToken(payload);

  res.json({
    ok: true,
    token,
    user: { id: user.id, name: user.name, roles: user.roles },
  });
});

// POST /api/auth/logout
router.post('/auth/logout', (req, res) => {
  // For JWT, logout is handled client-side by deleting the token.
  // This endpoint is for semantics.
  res.json({ ok: true });
});

// GET /api/me
router.get('/me', authGuard, (req: Request, res: Response) => {
  // The user payload is attached to the request by the authGuard
  res.json({ ok: true, user: req.user });
});

// GET /api/menus
router.get('/menus', authGuard, (req: Request, res: Response) => {
  // In a real app, you might filter menus based on user roles (req.user.roles)
  res.json({ ok: true, menus: menusSeed });
});

// GET /api/user-prefs
router.get('/user-prefs', authGuard, (req: Request, res: Response) => {
  const userId = req.user?.id;
  if (!userId) {
    return res.status(400).json({ ok: false, message: 'User ID not found in token.' });
  }
  const prefs = userPrefsStore.get(userId) || {};
  res.json({ ok: true, preferences: prefs });
});

// POST /api/user-prefs
router.post('/user-prefs', authGuard, (req: Request, res: Response) => {
  const userId = req.user?.id;
  if (!userId) {
    return res.status(400).json({ ok: false, message: 'User ID not found in token.' });
  }

  const result = userPrefsSchema.safeParse(req.body);
  if (!result.success) {
    return res.status(400).json({ ok: false, message: 'Invalid data.', errors: result.error.issues });
  }

  const currentPrefs = userPrefsStore.get(userId) || {};
  const newPrefs = { ...currentPrefs, ...result.data };
  userPrefsStore.set(userId, newPrefs);

  res.json({ ok: true, preferences: newPrefs });
});

export default router;

import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { usersSeed } from './data';
import { User, JwtPayload } from './types';

const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
  console.error('FATAL ERROR: JWT_SECRET is not defined.');
  process.exit(1);
}

/**
 * Signs a JWT token.
 * @param payload - The payload to sign.
 * @returns The JWT token.
 */
export const signToken = (payload: JwtPayload): string => {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '2h' });
};

/**
 * Middleware to guard protected routes.
 * Verifies the JWT token from the Authorization header.
 */
export const authGuard = (req: Request, res: Response, next: NextFunction): void => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    res.status(401).json({ ok: false, message: 'Unauthorized: No token provided.' });
    return;
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload;
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ ok: false, message: 'Unauthorized: Invalid token.' });
  }
};

/**
 * Finds a user by username and password.
 * NOTE: This is a mock implementation. In a real app, you would query a database
 * and use hashed passwords.
 * @param username - The user's username.
 * @param password - The user's password.
 * @returns The user object if found, otherwise null.
 */
export const findUser = (username: string, password?: string): User | null => {
  const user = usersSeed.find((u) => u.username === username);
  if (!user) {
    return null;
  }
  // If password is provided, check it. Otherwise, just return the user.
  if (password && user.password !== password) {
    return null;
  }
  return user;
};

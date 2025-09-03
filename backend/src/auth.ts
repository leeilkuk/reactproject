import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { UserService } from './services/UserService';

const JWT_SECRET = process.env.JWT_SECRET || 'dev-secret';

interface JwtPayload {
    id: number;
    username: string;
    roles: string[];
}

export const authGuard = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    res.status(401).json({ ok: false, message: 'Unauthorized: No token provided.' });
    return;
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload;
    req.user = decoded; // Attach decoded payload to request
    next();
  } catch (error) {
    res.status(401).json({ ok: false, message: 'Unauthorized: Invalid token.' });
  }
};

import { Request, Response, NextFunction } from 'express';
import { verifyToken } from './jwtUtils';  

const authenticateJWT = (req: Request, res: Response, next: NextFunction): void => {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    res.status(403).json({ message: 'No token provided' });
  }

  try {
    const decoded = verifyToken(token!);

    req.user = decoded;

    next();
  } catch (err) {
    res.status(403).json({ message: 'Invalid or expired token' });
  }
};

export { authenticateJWT };

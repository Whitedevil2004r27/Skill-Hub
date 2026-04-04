import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

/**
 * Middleware to verify Supabase JWT from the Authorization header.
 * Expects format: Authorization: Bearer <token>
 */
export const verifyJWT = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Missing or invalid authorization header' });
  }

  const token = authHeader.split(' ')[1];
  const secret = process.env.SUPABASE_JWT_SECRET;

  if (!secret) {
    console.error('SUPABASE_JWT_SECRET is not defined in environment variables');
    return res.status(500).json({ error: 'Internal server error' });
  }

  try {
    const decoded = jwt.verify(token, secret);
    // Attach decoded user info to request (Supabase JWT payload contains user metadata)
    (req as any).user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ error: 'Invalid or expired token' });
  }
};

/**
 * Middleware to verify if the authenticated user is an administrator.
 * Must be used AFTER verifyJWT middleware.
 */
import { supabase } from '../lib/supabase';

export const verifyAdmin = async (req: Request, res: Response, next: NextFunction) => {
  const user = (req as any).user;

  if (!user || !user.sub) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    const { data: profile, error } = await supabase
      .from('profiles')
      .select('is_admin')
      .eq('user_id', user.sub)
      .single();

    if (error || !profile || !profile.is_admin) {
      return res.status(403).json({ error: 'Forbidden: Admin access required' });
    }

    next();
  } catch (error) {
    console.error('Error verifying admin status:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

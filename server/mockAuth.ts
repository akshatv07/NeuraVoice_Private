import { Request, Response, NextFunction } from 'express';
import { db } from './db';
import { users } from '@shared/schema';

// Simple in-memory session storage for development
const sessions = new Map<string, any>();

// Mock authentication middleware
export const isAuthenticated = (req: any, res: Response, next: NextFunction) => {
  // Check for session cookie
  const sessionId = req.cookies?.sessionId;
  
  if (sessionId && sessions.has(sessionId)) {
    req.user = sessions.get(sessionId);
    return next();
  }

  // For development, auto-login as the dummy user if not logged in
  if (process.env.NODE_ENV === 'development') {
    // Get the first user from the database
    db.select().from(users).limit(1).then(([user]) => {
      if (user) {
        const newSessionId = `dev-session-${Date.now()}`;
        sessions.set(newSessionId, user);
        res.cookie('sessionId', newSessionId, { httpOnly: true });
        req.user = user;
        return next();
      }
      next(new Error('No users found in the database'));
    }).catch(next);
  } else {
    res.status(401).json({ error: 'Not authenticated' });
  }
}

// Mock setupAuth function for development
export const setupAuth = (app: any) => {
  // Just add the isAuthenticated middleware
  app.use((req: any, res: Response, next: NextFunction) => {
    // Mock user for development
    if (process.env.NODE_ENV === 'development' && !req.user) {
      // This will be handled by the isAuthenticated middleware
    }
    next();
  });
}

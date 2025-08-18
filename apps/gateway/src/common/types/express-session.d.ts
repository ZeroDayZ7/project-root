// /types/express-session.d.ts
import session from 'express-session';

declare module 'express-session' {
  interface SessionData {
    userId: number;
    username: string;
    csrfToken: string;
    email: string;
    role: string;
    test: string;
  }
}

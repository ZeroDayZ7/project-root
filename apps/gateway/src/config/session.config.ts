import session from 'express-session';
import { Application } from 'express';
import { createSessionStore } from '@/config/session-store.js';
import env from '@/config/env.js';
import { logger } from '@zerodayz7/common';

export default function sessionManager(app: Application): void {
  const store = createSessionStore();
   
  const sessionConfig: session.SessionOptions = {
    name: env.SESSION_COOKIE_NAME,
    secret: env.SESSION_SECRET_KEY,
    store,
    resave: false,
    saveUninitialized: false,
    rolling: true,
    proxy: env.NODE_ENV === 'production',
    cookie: {
      maxAge: env.SESSION_EXPIRES,
      httpOnly: true,
      secure: env.NODE_ENV === 'production',
      sameSite: env.NODE_ENV === 'production' ? 'lax' : 'lax',
    },
  };

  if (env.NODE_ENV === 'production') {
    app.set('trust proxy', 1);
  }

  app.use(session(sessionConfig));
  logger.info('✅ Session configured successfully - 7');
}

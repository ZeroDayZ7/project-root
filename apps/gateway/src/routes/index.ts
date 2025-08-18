import { Router } from 'express';
import authProxy from './proxies/auth.proxy-a.js';
import { logger } from '@zerodayz7/common';
import { getCsrfToken } from '@/common/csrf/csrf.controller.ts';
import { sessionInitHandler } from '@/controllers/session.controller.ts';

const router: Router = Router();


router.get('/test-session', (req, res) => {
  logger.info('Test session endpoint hit');
  req.session.test = 'test-value'; // Przykładowe ustawienie wartości w sesji
  if (req.session) {
    req.session.test = 'test-value';
    logger.info('Session object:', req.session);
    res.json({ hasSession: !!req.session, sessionId: req.session.id, test: req.session.test });
  } else {
    res.json({ hasSession: false, error: 'No session' });
  }
});

// router.get('/csrf-token', getCsrfToken);

// router.get('/session-init', sessionInitHandler);

// Logowanie wszystkich żądań do /auth
router.use('/auth', (req, _res, next) => {
  logger.info('Received on /auth:', req.method, req.originalUrl, req.body);
  next();
}, authProxy);


export default router;

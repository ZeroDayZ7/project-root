import env from './env.js';
console.log('Using CORS origin:', env.WEB_URL);
export const corsOptions = {
  origin: (incomingOrigin: string | undefined, callback: any) => {
    console.log('Incoming Origin:', incomingOrigin);
    if (incomingOrigin === env.WEB_URL) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-CSRF-Token'],
  exposedHeaders: ['Content-Length'],
  maxAge: env.CORS_EXPIRES,
  optionsSuccessStatus: 200,
};

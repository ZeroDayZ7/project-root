import rateLimit from 'express-rate-limit';

export const checkEmailRateLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 20,
  message: 'Za dużo prób sprawdzania email, spróbuj za chwilę',
});

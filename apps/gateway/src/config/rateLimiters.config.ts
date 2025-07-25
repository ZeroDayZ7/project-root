import rateLimit from 'express-rate-limit';

export const loginRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minut
  max: 5, // 5 prób logowania na 15 minut
  message: 'Za dużo prób logowania. Spróbuj ponownie później.',
  standardHeaders: true,
  legacyHeaders: false,
});

export const registerRateLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 godzina
  max: 10, // 10 rejestracji na godzinę
  message: 'Za dużo rejestracji. Spróbuj ponownie później.',
  standardHeaders: true,
  legacyHeaders: false,
}); 
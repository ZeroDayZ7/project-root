import rateLimit from 'express-rate-limit';

// Globalny rate limiter
// Blokuje IP po przekroczeniu 1000 żądań w ciągu 60 minut (1 godzina)
// Blocks IP after exceeding 1000 requests within 60 minutes (1 hour)
export const globalRateLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 godzina / 1 hour
  max: 1000, // 1000 żądań na godzinę / 1000 requests per hour
  message: 'Za dużo żądań, spróbuj ponownie później. / Too many requests, please try again later.',
  standardHeaders: true,
  legacyHeaders: false,
});

// Rate limiter dla logowania
// Blokuje IP po 5 próbach logowania w ciągu 15 minut
// Blocks IP after 5 login attempts within 15 minutes
export const loginRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minut / 15 minutes
  max: 5, // 5 prób logowania / 5 login attempts
  message: 'Za dużo prób logowania. Spróbuj ponownie później. / Too many login attempts. Please try again later.',
  standardHeaders: true,
  legacyHeaders: false,
});

// Rate limiter dla rejestracji
// Blokuje IP po 10 rejestracjach w ciągu 60 minut (1 godzina)
// Blocks IP after 10 registrations within 60 minutes (1 hour)
export const registerRateLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 godzina / 1 hour
  max: 10, // 10 rejestracji / 10 registrations
  message: 'Za dużo rejestracji. Spróbuj ponownie później. / Too many registrations. Please try again later.',
  standardHeaders: true,
  legacyHeaders: false,
}); 
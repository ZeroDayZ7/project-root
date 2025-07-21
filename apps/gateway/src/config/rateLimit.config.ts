export const rateLimitOptions = {
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
  message: 'Za dużo żądań, spróbuj ponownie później.',
};

import rateLimit from 'express-rate-limit';

export const loginRateLimiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 5 });
export const registerRateLimiter = rateLimit({ windowMs: 60 * 60 * 1000, max: 10 });
export const forgotPasswordRateLimiter = rateLimit({ windowMs: 60 * 60 * 1000, max: 3 });
export const resetPasswordRateLimiter = rateLimit({ windowMs: 60 * 60 * 1000, max: 5 });
export const changePasswordRateLimiter = rateLimit({ windowMs: 60 * 60 * 1000, max: 5 }); 
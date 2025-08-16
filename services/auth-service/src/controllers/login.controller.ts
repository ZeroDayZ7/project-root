import { Request, Response } from 'express';

export const loginController = (req: Request, res: Response) => {
  // TODO: Implementacja logiki logowania
  res.json({ message: 'Login endpoint' });
}; 
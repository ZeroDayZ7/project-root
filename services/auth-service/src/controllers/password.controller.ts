import { Request, Response } from 'express';

export const forgotPasswordController = (req: Request, res: Response) => {
  // TODO: Implementacja logiki zapomnianego hasła
  res.json({ message: 'Forgot password endpoint' });
};

export const resetPasswordController = (req: Request, res: Response) => {
  // TODO: Implementacja logiki resetowania hasła
  res.json({ message: 'Reset password endpoint' });
};

export const changePasswordController = (req: Request, res: Response) => {
  // TODO: Implementacja logiki zmiany hasła
  res.json({ message: 'Change password endpoint' });
}; 
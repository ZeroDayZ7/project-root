'use client';

import React from 'react';
import { Button, Input, Label } from '@neo/ui';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@neo/ui';

interface LoginFormProps {
  loginStep: 'initial' | 'email' | 'password' | 'success';
  setLoginStep: (step: 'initial' | 'email' | 'password' | 'success') => void;
  email: string;
  setEmail: (email: string) => void;
  password: string;
  setPassword: (password: string) => void;
  validateEmail: (email: string) => boolean;
  handleEmailSubmit: () => void;
  handlePasswordSubmit: () => void;
}

export const LoginForm: React.FC<LoginFormProps> = ({
  loginStep,
  setLoginStep,
  email,
  setEmail,
  password,
  setPassword,
  validateEmail,
  handleEmailSubmit,
  handlePasswordSubmit,
}) => {
  return (
    <Card className="max-w-md w-full">
      <CardHeader className="text-center">
        <CardTitle>DOSTĘP DO SYSTEMU</CardTitle>
        <CardDescription>
          Uwierzytelnianie wielopoziomowe aktywne
        </CardDescription>
      </CardHeader>
      <CardContent>
        {loginStep === 'initial' && (
          <div className="space-y-4">
            <Button
              variant="outline"
              className="w-full"
              onClick={() => setLoginStep('email')}
            >
              INICJUJ LOGOWANIE
            </Button>
            <Button
              variant="outline"
              className="w-full cursor-not-allowed"
              disabled
            >
              REJESTRACJA NOWEGO UŻYTKOWNIKA
            </Button>
          </div>
        )}

        {loginStep === 'email' && (
          <div className="space-y-4">
            <div>
              <Label htmlFor="email">{'> ADRES EMAIL:'}</Label>
              <Input
                id="email"
                type="email"
                placeholder="user@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoFocus
                className="bg-input"
              />
            </div>
            <Button
              className="w-full"
              disabled={!validateEmail(email)}
              onClick={handleEmailSubmit}
            >
              WERYFIKUJ EMAIL
            </Button>
            <Button
              variant="link"
              className="w-full text-sm"
              onClick={() => setLoginStep('initial')}
            >
              ← POWRÓT
            </Button>
          </div>
        )}

        {loginStep === 'password' && (
          <div className="space-y-4">
            <div className="text-sm text-primary mb-4">
              Email zweryfikowany: <span className="text-cyan">{email}</span>
            </div>
            <div>
              <Label htmlFor="password">{'> HASŁO DOSTĘPU:'}</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoFocus
                className="bg-input"
              />
            </div>
            <Button
              className="w-full"
              disabled={password.length === 0}
              onClick={handlePasswordSubmit}
            >
              AUTORYZUJ DOSTĘP
            </Button>
            <Button
              variant="link"
              className="w-full text-sm"
              onClick={() => setLoginStep('email')}
            >
              ← ZMIEŃ EMAIL
            </Button>
          </div>
        )}

        {loginStep === 'success' && (
          <div className="text-center space-y-4 text-primary">
            <div className="text-lg">✅ DOSTĘP AUTORYZOWANY</div>
            <div className="text-sm">Przekierowanie do panelu głównego...</div>
            <div>ŁADOWANIE INTERFEJSU...</div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

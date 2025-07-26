'use client';

import { useState } from 'react';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@neo/ui';
import { Button, Input } from '@neo/ui';
import { Loader2, Eye, EyeOff } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { StepPasswordProps } from './types';


export function StepPassword({
  email,
  password,
  setPassword,
  onSubmit,
  error,
  isSubmitting,
  csrfTokenReady,
  onBack,
}: StepPasswordProps) {
  const t = useTranslations('LoginPage');
  const isDisabled = isSubmitting || !csrfTokenReady;
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => setShowPassword((prev) => !prev);

  return (
    <div className="space-y-4">
      {error && <div className="text-red-500 text-sm text-center">{error}</div>}
      <div className="text-sm text-blue-500 text-center">
        {t('verifiedEmail')}: <span className="text-cyan-500">{email}</span>
      </div>
      <FormField
        control={{} as any}
        name="password"
        render={() => (
          <FormItem>
            <FormLabel htmlFor="password">{t('password')}</FormLabel>
            <FormControl>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={isDisabled}
                  autoComplete="current-password"
                  placeholder="••••••••"
                  className="bg-gray-50 border-gray-200 focus:ring-blue-500"
                />
                <button
                  type="button"
                  onClick={toggleShowPassword}
                  className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-500 hover:text-gray-700 disabled:cursor-not-allowed"
                  disabled={isDisabled}
                  aria-label={showPassword ? 'Ukryj hasło' : 'Pokaż hasło'}
                >
                  {showPassword ? <EyeOff /> : <Eye />}
                </button>
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <Button
        type="button"
        className="w-full bg-blue-600 text-white hover:bg-blue-700 transition-colors"
        disabled={isDisabled || !password}
        onClick={() => onSubmit(password)}
      >
        {isSubmitting ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            {t('loggingIn')}
          </>
        ) : (
          t('login')
        )}
      </Button>
      <Button
        variant="link"
        className="w-full text-sm text-blue-500"
        onClick={onBack}
      >
        {t('back')}
      </Button>
      {!csrfTokenReady && !isSubmitting && (
        <p className="text-muted-foreground text-center text-xs">{t('csrfError')}</p>
      )}
    </div>
  );
}
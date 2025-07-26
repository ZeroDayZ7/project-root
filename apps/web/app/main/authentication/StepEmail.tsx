'use client';

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@neo/ui';
import { Button, Input } from '@neo/ui';
import { Loader2 } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { StepEmailProps } from './types';

export function StepEmail({
  email,
  setEmail,
  onSubmit,
  error,
  isSubmitting,
  csrfTokenReady,
}: StepEmailProps) {
//   const t = useTranslations('LoginPage');
  const isDisabled = isSubmitting || !csrfTokenReady;

  return (
    <div className="space-y-4">
      {error && <div className="text-red-500 text-sm text-center">{error}</div>}
      <FormField
        control={{} as any} // FormField bez form, bo używamy stanu nadrzędnego
        name="email"
        render={() => (
          <FormItem>
            <FormLabel htmlFor="email">
                {/* {t('email')} */}
asdas
            </FormLabel>
            <FormControl>
              <Input
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isDisabled}
                autoComplete="username"
                placeholder="email@example.com"
                className="bg-gray-50 border-gray-200 focus:ring-blue-500"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <Button
        type="button"
        className="w-full bg-blue-600 text-white hover:bg-blue-700 transition-colors"
        disabled={isDisabled || !email}
        onClick={() => onSubmit(email)}
      >
        {isSubmitting ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            {/* {t('verifying')} */}asdasd
          </>
        ) : (
        //   t('verifyEmail')
        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        )}
      </Button>
      {!csrfTokenReady && !isSubmitting && (
        <p className="text-muted-foreground text-center text-xs">
            {/* {t('csrfError')} */}
            asdsad
            </p>
      )}
    </div>
  );
}
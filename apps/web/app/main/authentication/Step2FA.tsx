'use client';

import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@neo/ui';
import { Button, Input } from '@neo/ui';
import { Loader2 } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Step2FAProps } from './types';

export function Step2FA({
  email,
  twoFactorCode,
  setTwoFactorCode,
  onSubmit,
  error,
  isSubmitting,
  csrfTokenReady,
  onBack,
}: Step2FAProps) {
  const t = useTranslations('LoginPage');
  const isDisabled = isSubmitting || !csrfTokenReady;

  return (
    <div className="space-y-4">
      {error && <div className="text-red-500 text-sm text-center">{error}</div>}
      <div className="text-sm text-blue-500 text-center">
        {t('verifiedEmail')}: <span className="text-cyan-500">{email}</span>
      </div>
      <FormField
        control={{} as any}
        name="twoFactorCode"
        render={() => (
          <FormItem>
            <FormLabel htmlFor="twoFactorCode">{t('twoFactorCode')}</FormLabel>
            <FormControl>
              <Input
                id="twoFactorCode"
                value={twoFactorCode}
                onChange={(e) => setTwoFactorCode(e.target.value)}
                disabled={isDisabled}
                placeholder="123456"
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
        disabled={isDisabled || !twoFactorCode}
        onClick={() => onSubmit(twoFactorCode)}
      >
        {isSubmitting ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            {t('verifying')}
          </>
        ) : (
          t('verify2FA')
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
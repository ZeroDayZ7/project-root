'use client';

import { UseFormReturn } from 'react-hook-form';
import { Button, Input } from '@neo/ui';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@neo/ui';
import { Eye, EyeOff, Loader2 } from 'lucide-react';
import { LoginSchema } from './schemas';




interface LoginFormProps {
  form: UseFormReturn<LoginSchema>;
  isLoading: boolean;
  isSubmitting: boolean;
  showPassword: boolean;
  toggleShowPassword: () => void;
  showConfirmPassword: boolean;
  toggleShowConfirmPassword: () => void;
  onSubmit: (e?: React.BaseSyntheticEvent) => Promise<void>;
  csrfTokenReady: boolean;
  error: string | null;
}

export function LoginForm({
  form,
  isLoading,
  isSubmitting,
  showPassword,
  toggleShowPassword,
  showConfirmPassword,
  toggleShowConfirmPassword,
  onSubmit,
  csrfTokenReady,
  error,
}: LoginFormProps) {
  const isDisabled = isSubmitting || !csrfTokenReady;

  return (
    <Form {...form}>
      <form onSubmit={onSubmit} className="space-y-4">
        {error && (
          <div className="text-red-500 text-sm text-center">{error}</div>
        )}

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="email">Email</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  id="email"
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

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="password">Hasło</FormLabel>
              <FormControl>
                <div className="relative">
                  <Input
                    {...field}
                    id="password"
                    type={showPassword ? 'text' : 'password'}
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
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="confirm-password">Potwierdź hasło</FormLabel>
              <FormControl>
                <div className="relative">
                  <Input
                    {...field}
                    id="confirm-password"
                    type={showConfirmPassword ? 'text' : 'password'}
                    disabled={isDisabled}
                    autoComplete="current-password"
                    placeholder="••••••••"
                    className="bg-gray-50 border-gray-200 focus:ring-blue-500"
                  />
                  <button
                    type="button"
                    onClick={toggleShowConfirmPassword}
                    className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-500 hover:text-gray-700 disabled:cursor-not-allowed"
                    disabled={isDisabled}
                    aria-label={showConfirmPassword ? 'Ukryj hasło' : 'Pokaż hasło'}
                  >
                    {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          className="w-full bg-blue-600 text-white hover:bg-blue-700 transition-colors"
          disabled={isDisabled}
        >
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Logowanie...
            </>
          ) : csrfTokenReady ? (
            <>Zaloguj się</>
          ) : (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Czekaj...
            </>
          )}
        </Button>

        {!csrfTokenReady && !isLoading && (
          <p className="text-muted-foreground text-center text-xs">
            Nie można załadować tokena CSRF
          </p>
        )}
      </form>
    </Form>
  );
}

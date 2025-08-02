'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Input } from '@neo/ui';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@neo/ui';
import { LoginStep3Form, loginStep3Schema } from './schema';

interface LoginStep3Props {
  onSubmit: (data: LoginStep3Form) => void;
}

export const LoginStep3 = ({ onSubmit }: LoginStep3Props) => {
  const form = useForm<LoginStep3Form>({
    resolver: zodResolver(loginStep3Schema),
    defaultValues: { totpCode: '' },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="totpCode"
          render={({ field }) => (
            <FormItem>
              <FormLabel>TOTP Code</FormLabel>
              <FormControl>
                <Input placeholder="Enter 6-digit TOTP code" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full">Login</Button>
      </form>
    </Form>
  );
};
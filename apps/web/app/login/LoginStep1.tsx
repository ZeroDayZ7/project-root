'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Input, Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@neo/ui';
import { LoginStep1Form, loginStep1Schema } from './schema';

interface LoginStep1Props {
  onSubmit: (data: LoginStep1Form) => void;
}

export const LoginStep1 = ({ onSubmit }: LoginStep1Props) => {
  const form = useForm<LoginStep1Form>({
    resolver: zodResolver(loginStep1Schema),
    defaultValues: { identifier: '' },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="identifier"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email or Username</FormLabel>
              <FormControl>
                <Input placeholder="Enter email or username" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full">Next</Button>
      </form>
    </Form>
  );
};
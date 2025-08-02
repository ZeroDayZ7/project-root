'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Input} from '@neo/ui';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@neo/ui';
import { LoginStep2Form, loginStep2Schema } from './schema';

interface LoginStep2Props {
  onSubmit: (data: LoginStep2Form) => void;
}

export const LoginStep2 = ({ onSubmit }: LoginStep2Props) => {
  const form = useForm<LoginStep2Form>({
    resolver: zodResolver(loginStep2Schema),
    defaultValues: { password: '' },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" placeholder="Enter password" {...field} />
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
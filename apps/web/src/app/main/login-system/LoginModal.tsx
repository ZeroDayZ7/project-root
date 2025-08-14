'use client';
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from '@neo/ui';
import LoginSystem from './LoginSystem';
import { Loader } from '@/components/ui/Loader';
import dynamic from 'next/dynamic';
import LoginBoxHeader from './LoginBoxHeader';

const LoginModalD = dynamic(() => import('./LoginSystem.tsx').then((mod) => mod.default), {
  loading: () => <Loader />,
  ssr: false,
});

export default function LoginModal() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="btn">Rozpocznij logowanie</button>
      </DialogTrigger>
      <DialogContent className="w-full">
        <DialogTitle>
          <LoginBoxHeader />
        </DialogTitle>
        <LoginModalD />
        <DialogDescription>
          Zaloguj się
        </DialogDescription>
      </DialogContent>
    </Dialog>
  );
}

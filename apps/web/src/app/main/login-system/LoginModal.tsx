'use client';

import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from '@neo/ui';
import LoginSystem from './LoginSystem';
import LoginBoxHeader from './components/LoginBoxHeader';

export default function LoginModal() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="btn">Rozpocznij logowanie</button>
      </DialogTrigger>
      <DialogContent className="w-full">
        <DialogDescription></DialogDescription>
        <DialogTitle>
          <LoginBoxHeader />
        </DialogTitle>
        <LoginSystem />
      </DialogContent>
    </Dialog>
  );
}

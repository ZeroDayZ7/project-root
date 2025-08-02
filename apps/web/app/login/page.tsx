'use client';

import { useState } from 'react';
import { Button } from '@neo/ui';
import { LoginModal } from './LoginModal';

export default function LoginPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    console.log('Login button clicked, opening modal'); // Debug log
    setIsModalOpen(true);
  };

  return (
    <div className="flex min-h-screen items-center justify-center">
      <Button onClick={() => {
        console.log('Button clicked'); // Additional debug log
        handleOpenModal();
      }}>
        Login
      </Button>
      <LoginModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}
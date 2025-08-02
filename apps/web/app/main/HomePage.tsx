'use client';
import { useState } from 'react';
import { Header } from './Header';
import { SystemInfo } from './SystemInfo';
import { LoginSystem } from './LoginSystem';
import { SystemUpdates } from './SystemUpdates';
import { SystemStatus } from './SystemStatus';
import { Footer } from './Footer';

export default function HomePage() {
  const [loginStep, setLoginStep] = useState<'initial' | 'email' | 'password' | 'success'>('initial');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isValidEmail, setIsValidEmail] = useState(false);
  const [showMore, setShowMore] = useState(false);

  return (
    <div className="min-h-screen bg-black text-green-400 font-mono relative overflow-hidden">
      <div className="relative z-10 container mx-auto px-4 py-8">
        <Header />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <SystemInfo />
          <LoginSystem
            loginStep={loginStep}
            setLoginStep={setLoginStep}
            email={email}
            setEmail={setEmail}
            password={password}
            setPassword={setPassword}
            isValidEmail={isValidEmail}
            setIsValidEmail={setIsValidEmail}
          />
          <div className="space-y-6">
            <SystemUpdates showMore={showMore} setShowMore={setShowMore} />
            <SystemStatus />
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
}

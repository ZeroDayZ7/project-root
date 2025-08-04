'use client';
import { useState } from 'react';
import { Header } from './Header';
import { SystemInfo } from './SystemInfo';
import LoginSystem from './login-system/LoginSystem';
import { SystemUpdates } from './SystemUpdates';
import { SystemStatus } from './SystemStatus';
import { Footer } from './Footer';

export default function HomePage() {
  const [showMore, setShowMore] = useState(false);

  return (
    <div className="min-h-screen relative overflow-hidden">
      <div className="relative z-10 container mx-auto px-4 py-8">
        <Header />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <SystemInfo />
          <LoginSystem />
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

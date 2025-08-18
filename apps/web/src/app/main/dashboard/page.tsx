'use client';

import { DashboardCard } from './DashboardCard';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

export default function DashboardPage() {
  const [showDashboard, setShowDashboard] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowDashboard(true), 1700); // delay po loaderze
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {showDashboard && (
        <motion.div
          key="dashboard"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="p-8 bg-background min-h-screen text-white"
        >
          <h1 className="text-2xl font-bold mb-6">Witaj w dashboardzie!</h1>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <DashboardCard title="Użytkownicy">
              <p>Liczba zarejestrowanych użytkowników: 123</p>
            </DashboardCard>

            <DashboardCard title="Sesje">
              <p>Aktywne sesje: 7</p>
            </DashboardCard>

            <DashboardCard title="Powiadomienia">
              <p>Nieprzeczytane: 5</p>
            </DashboardCard>

            <DashboardCard title="Ostatnie logowania">
              <ul className="list-disc list-inside">
                <li>user1 – 10:45</li>
                <li>user2 – 09:30</li>
                <li>user3 – 08:15</li>
              </ul>
            </DashboardCard>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

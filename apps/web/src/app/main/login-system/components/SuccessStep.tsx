'use client';

import { Loader } from '@/components/ui/Loader';
import { motion } from 'framer-motion';

export default function SuccessStep() {
  return (
    <motion.div
      className="text-center space-y-4"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="text-foreground text-lg">✅ DOSTĘP AUTORYZOWANY</div>
      <div className="text-sm text-foreground/70">
        Przekierowanie do panelu głównego...
      </div>
      <Loader message="ŁADOWANIE INTERFEJSU..." />
    </motion.div>
  );
}

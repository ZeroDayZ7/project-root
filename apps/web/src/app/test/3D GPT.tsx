'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

type LoginStep = 'email' | 'password' | 'twoFactor' | 'success';

export default function Login3DModal() {
  const [loginStep, setLoginStep] = useState<LoginStep>('email');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [otp, setOtp] = useState('');

  const nextStep = () => {
    switch (loginStep) {
      case 'email':
        setLoginStep('password');
        break;
      case 'password':
        setLoginStep('twoFactor');
        break;
      case 'twoFactor':
        setLoginStep('success');
        break;
      default:
        break;
    }
  };

  const backStep = () => {
    switch (loginStep) {
      case 'password':
        setLoginStep('email');
        break;
      case 'twoFactor':
        setLoginStep('password');
        break;
      default:
        break;
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    nextStep();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-background bg-opacity-90 z-50">
      <AnimatePresence mode="wait">
        <motion.div
          key={loginStep}
          className="w-full max-w-lg p-8 rounded-xl shadow-lg bg-background text"
          initial={{ opacity: 0, rotateY: 45, scale: 0.8 }}
          animate={{ opacity: 1, rotateY: 0, scale: 1 }}
          exit={{ opacity: 0, rotateY: -45, scale: 0.8 }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
          style={{ transformStyle: 'preserve-3d' }}
        >
          <h2 className="text-2xl font-bold mb-6">Login 3D</h2>

          {loginStep === 'email' && (
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <input
                type="email"
                placeholder="Email"
                className="p-3 rounded-md bg-background text border border-transparent focus:border-gray-400 outline-none"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <button
                type="submit"
                className="p-3 rounded-md bg-background text border border-transparent hover:scale-105 transition-transform"
              >
                Next
              </button>
            </form>
          )}

          {loginStep === 'password' && (
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <input
                type="password"
                placeholder="Password"
                className="p-3 rounded-md bg-background text border border-transparent focus:border-gray-400 outline-none"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <div className="flex justify-between mt-2">
                <button
                  type="button"
                  onClick={backStep}
                  className="p-3 rounded-md bg-background text border border-transparent hover:scale-105 transition-transform"
                >
                  Back
                </button>
                <button
                  type="submit"
                  className="p-3 rounded-md bg-background text border border-transparent hover:scale-105 transition-transform"
                >
                  Next
                </button>
              </div>
            </form>
          )}

          {loginStep === 'twoFactor' && (
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <input
                type="text"
                placeholder="2FA Code"
                className="p-3 rounded-md bg-background text border border-transparent focus:border-gray-400 outline-none"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                required
              />
              <div className="flex justify-between mt-2">
                <button
                  type="button"
                  onClick={backStep}
                  className="p-3 rounded-md bg-background text border border-transparent hover:scale-105 transition-transform"
                >
                  Back
                </button>
                <button
                  type="submit"
                  className="p-3 rounded-md bg-background text border border-transparent hover:scale-105 transition-transform"
                >
                  Verify
                </button>
              </div>
            </form>
          )}

          {loginStep === 'success' && (
            <motion.div
              initial={{ scale: 0.8, rotateX: -20, opacity: 0 }}
              animate={{ scale: 1, rotateX: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col items-center justify-center gap-4 border"
            >
              <p className="text-xl font-bold">🎉 Login Successful!</p>
              <button
                onClick={() => setLoginStep('email')}
                className="p-3 rounded-md bg-background text border border-transparent hover:scale-105 transition-transform"
              >
                Log out / Restart
              </button>
            </motion.div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

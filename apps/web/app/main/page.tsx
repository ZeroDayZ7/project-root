'use client';

import { LoginFlow } from './authentication/LoginFlow';
import Link from 'next/link';
import { useTranslations } from 'next-intl';

export default function Home() {
  // const t = useTranslations('LoginPage');

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-gray-50 to-gray-100 p-4">
      <LoginFlow />
      <div className="mt-4 text-center text-sm text-gray-500">
        <Link href="/" className="hover:underline">
          {/* {t('homePage')} */}xxx
        </Link>
        {' | '}
        <Link href="/register" className="hover:underline">
          {/* {t('register')} */}ccc
        </Link>
      </div>
    </div>
  );
}
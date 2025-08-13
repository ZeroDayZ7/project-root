import Header from './Header';
import SystemInfo from './SystemInfo';
import LoginSystem from '../login-system/LoginSystem';
import SystemStatus from './SystemStatus';
import Footer from './Footer';
import SystemDescription from './SystemDescription';

export default function HomePage() {
  return (
    <div className="relative z-10 overflow-hidden container mx-auto px-4 py-2">
      <Header />
      <main className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <SystemInfo />
        <div className="flex flex-col items-center justify-start">
          <SystemDescription />
          <LoginSystem />
        </div>
        <div className="space-y-6">
          <SystemStatus />
        </div>
      </main>
      <Footer />
    </div>
  );
}

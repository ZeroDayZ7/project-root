import AppBrand from '@/components/layout/AppBrand';
import ThemeSwitcher from '@/components/themes/ThemeSwitcher';

export default function Header() {
  return (
    <header className="mb-8">
      <ThemeSwitcher />
      <AppBrand />
    </header>
  );
}

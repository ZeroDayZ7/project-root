'use client';

import { Button } from '@/components/Button1';

// Strona logowania
const LoginPage = () => {
  return (
    <div>
      <Button variant="primary" onClick={() => alert('Klik!')}>
        Zatwierdź
      </Button>

      <Button variant="secondary" aria-label="Zamknij okno">
        ✖
      </Button>

      <Button variant="danger" disabled>
        Usuń
      </Button>

      <Button variant="success" loading>
        Wysyłanie...
      </Button>

      <Button variant="ghost">Więcej opcji</Button>
    </div>
  );
};

export default LoginPage;

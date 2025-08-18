'use client';
import { useEffect, useState } from 'react';
import { api } from '@/lib/http/httpClientInstance';

interface User {
  id: number;
  email: string;
}

export default function DashboardUsers() {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    api.get<User[]>('/users.json')
      .then(setUsers)
      .catch((err) => console.error(err.message));
  }, []);

  return (
    <div>
      <h2>Użytkownicy:</h2>
      <ul>
        {users.map((u) => (
          <li key={u.id}>{u.email}</li>
        ))}
      </ul>
    </div>
  );
}

'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function SquareTest() {
  const [text, setText] = useState('');
  const [checkbox, setCheckbox] = useState(false);

  return (
    <div
      style={{
        backgroundColor: 'var(--background)',
        color: 'var(--foreground)',
        minHeight: '100vh',
        padding: '2rem',
        transition: 'background-color 0.3s, color 0.3s',
        fontFamily: 'Arial, sans-serif',
      }}
    >
      <h1>Test motywu</h1>
      <div
        style={{
          width: '200px',
          height: '200px',
          backgroundColor: 'var(--background)',
          color: 'var(--foreground)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          border: '2px solid var(--foreground)',
          borderRadius: '8px',
          fontWeight: 'bold',
          fontSize: '18px',
          marginBottom: '2rem',
          transition: 'background-color 0.3s, color 0.3s',
        }}
      >
        Test Motywu
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          alert(`Wysłano: ${text}, Checkbox: ${checkbox}`);
        }}
      >
        <label htmlFor="testInput" style={{ display: 'block', marginBottom: '0.5rem' }}>
          Wprowadź tekst:
        </label>
        <input
          id="testInput"
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          style={{
            width: '100%',
            padding: '0.5rem',
            marginBottom: '1rem',
            borderRadius: '4px',
            border: '1px solid var(--foreground)',
            backgroundColor: 'var(--background)',
            color: 'var(--foreground)',
            transition: 'background-color 0.3s, color 0.3s, border-color 0.3s',
          }}
        />

        <label style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem' }}>
          <input
            type="checkbox"
            checked={checkbox}
            onChange={(e) => setCheckbox(e.target.checked)}
            style={{ marginRight: '0.5rem' }}
          />
          Akceptuję warunki
        </label>

        <button
          type="submit"
          style={{
            padding: '0.6rem 1.2rem',
            backgroundColor: 'var(--foreground)',
            color: 'var(--background)',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontWeight: 'bold',
            transition: 'background-color 0.3s, color 0.3s',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = 'var(--background)';
            e.currentTarget.style.color = 'var(--foreground)';
            e.currentTarget.style.border = '1px solid var(--foreground)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'var(--foreground)';
            e.currentTarget.style.color = 'var(--background)';
            e.currentTarget.style.border = 'none';
          }}
        >
          Wyślij
        </button>
      </form>

      <div style={{ marginTop: '3rem' }}>
        <Link href="/another-page" style={{ color: 'var(--foreground)', textDecoration: 'underline' }}>
          Przejdź do drugiej strony
        </Link>
      </div>
    </div>
  );
}

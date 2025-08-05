// File: project-root/apps/web/app/main/Footer.tsx
'use client'; // Oznacza komponent jako Client Component w Next.js, umożliwiając użycie hooków Reacta i interaktywności.

import React, { useState, useEffect } from 'react'; // Importuje niezbędne hooki Reacta do zarządzania stanem i efektami cyklu życia.

export function Footer() {
  // Deklaruje zmienną stanu do przechowywania sformatowanej bieżącej daty.
  const [currentDate, setCurrentDate] = useState('');
  // Deklaruje zmienną stanu do przechowywania bieżącego roku.
  const [currentYear, setCurrentYear] = useState('');

  // Hook useEffect uruchamiany po zamontowaniu komponentu.
  useEffect(() => {
    const today = new Date(); // Tworzy nowy obiekt Date reprezentujący bieżącą datę i czas.

    // Pobiera dzień miesiąca i formatuje go do dwucyfrowego stringu (np. '01', '15').
    const day = String(today.getDate()).padStart(2, '0');
    // Pobiera miesiąc (0-11), dodaje 1 i formatuje do dwucyfrowego stringu.
    const month = String(today.getMonth() + 1).padStart(2, '0');
    // Pobiera pełny rok (np. 2023).
    const year = today.getFullYear();

    // Ustawia stan currentDate na sformatowaną datę (DD.MM.RRRR).
    setCurrentDate(`${day}.${month}.${year}`);
    // Ustawia stan currentYear na bieżący rok.
    setCurrentYear(String(year));
  }, []); // Pusta tablica zależności [] zapewnia, że efekt uruchomi się tylko raz po pierwszym renderowaniu.

  return (
    // Główny kontener stopki z klasami Tailwind CSS dla stylizacji.
    <div className="mt-12 text-center text-xs text-foreground/50">
      {/* Wyświetla wersję systemu i dynamicznie aktualizowaną datę ostatniej aktualizacji. */}
      <div>KASANDRA SYSTEM v3.12.1 | OSTATNIA AKTUALIZACJA: {currentDate}</div>
      {/* Wyświetla informację o prawach autorskich z dynamicznie aktualizowanym rokiem. */}
      <div className="mt-1">&copy; {currentYear} Wszystkie prawa zastrzeżone.</div>
    </div>
  );
}

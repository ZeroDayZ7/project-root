export default function Footer() {
  const today = new Date();
  const day = String(today.getDate()).padStart(2, '0');
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const year = today.getFullYear();

  const formattedDate = `${day}.${month}.${year}`;

  return (
    <footer className="mt-12 text-center text-xs text-foreground/50">
      <p>KASANDRA SYSTEM v3.12.1 | OSTATNIA AKTUALIZACJA: {formattedDate}</p>
      <p className="mt-1">&copy; {year} Wszystkie prawa zastrzeżone.</p>
    </footer>
  );
}

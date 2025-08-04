import Link from 'next/link';

export default async function TestIndex() {
  await new Promise((resolve) => setTimeout(resolve, 2000));

  const tests = [
    { name: 'Test Button', path: '/test/button' },
    { name: 'Test Claude Button', path: '/test/button/claude' },
    { name: 'Test Shadcn Button', path: '/test/shadcn' },
  ];

  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold mb-4">🧪 Test Playground</h1>
      <ul className="space-y-2">
        {tests.map((t) => (
          <li key={t.path}>
            <Link
              href={t.path}
              className="text-blue-500 underline hover:text-blue-700"
            >
              {t.name}
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}

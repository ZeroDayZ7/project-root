'use client';

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <div className="p-4 bg-red-100">
      <h2>❌ Wystąpił błąd: {error.message}</h2>
      <button
        onClick={() => reset()}
        className="mt-2 px-3 py-1 bg-red-500"
      >
        Spróbuj ponownie
      </button>
    </div>
  );
}

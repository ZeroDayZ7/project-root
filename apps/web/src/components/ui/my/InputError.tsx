'use client';

interface InputErrorProps {
  id: string;
  message?: string | null;
}

export default function InputError({ id, message }: InputErrorProps) {
  if (!message) return null;

  return (
    <p
      id={id}
      className="mt-1 h-[15px] text-xs text-red-500"
      role="alert"
      aria-live="polite"
    >
      {message}
    </p>
  );
}

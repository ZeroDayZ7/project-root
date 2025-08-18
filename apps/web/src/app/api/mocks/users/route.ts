import { NextResponse } from 'next/server';

export async function GET() {
  const mockUsers = [
    { id: 1, email: 'user1@example.com' },
    { id: 2, email: 'user2@example.com' },
    { id: 3, email: 'user3@example.com' },
  ];
  return NextResponse.json(mockUsers);
}

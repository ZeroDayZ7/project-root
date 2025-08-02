export interface MockUser {
  email: string;
  password: string;
  has2FA: boolean;
  twoFactorCode?: string;
}

const mockData: MockUser[] = [
  {
    email: 'user@example.com',
    password: 'Password123!',
    has2FA: true,
    twoFactorCode: '123456',
  },
  {
    email: 'test@example.com',
    password: 'Test456!',
    has2FA: false,
  },
];

export default mockData;
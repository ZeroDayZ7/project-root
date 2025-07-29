// mocks/useCsrfToken.mock.ts
export function useCsrfToken() {
  return {
    csrfToken: 'mock-csrf-token',
    isLoading: false,
    error: null,
    refreshToken: () => {},
  };
}

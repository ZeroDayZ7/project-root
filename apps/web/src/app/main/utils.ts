export const validateEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

export const getPriorityColor = (priority: string) => {
  switch (priority) {
    case 'CRITICAL':
      return 'text-red-400';
    case 'HIGH':
      return 'text-orange-400';
    case 'MEDIUM':
      return 'text-yellow-400';
    case 'LOW':
      return 'text-green-400';
    default:
      return 'text-cyan-400';
  }
};

export const getStatusColor = (status: string) => {
  switch (status) {
    case 'AKTYWNE':
      return 'text-green-400';
    case 'W TRAKCIE':
      return 'text-yellow-400';
    case 'ZAKOŃCZONE':
      return 'text-gray-400';
    case 'PLANOWANE':
      return 'text-blue-400';
    case 'TESTOWANIE':
      return 'text-purple-400';
    default:
      return 'text-cyan-400';
  }
};

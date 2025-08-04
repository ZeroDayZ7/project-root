export type LoginStep = 'initial' | 'email' | 'password' | 'success';

export interface ChangeItem {
  date: string;
  event: string;
  status: string;
  priority: string;
}

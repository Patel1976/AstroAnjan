import {WalletTransaction} from '../types';
export const mockWalletBalance = 500;
export const mockTransactions: WalletTransaction[] = [
  {id: 'txn-1', type: 'credit', amount: 500, description: 'Welcome bonus', status: 'completed', createdAt: '2026-09-15'},
  {id: 'txn-2', type: 'debit', amount: 180, description: 'Consultation with Aarav Joshi', status: 'completed', createdAt: '2026-10-03'},
];

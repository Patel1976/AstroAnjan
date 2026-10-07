import {mockTransactions, mockWalletBalance} from '../mock/wallet';
export const getInitialWallet = () => ({balance: mockWalletBalance, transactions: mockTransactions});

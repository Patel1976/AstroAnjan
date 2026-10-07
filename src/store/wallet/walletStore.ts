import AsyncStorage from '@react-native-async-storage/async-storage';
import {create} from 'zustand';
import {createJSONStorage, persist} from 'zustand/middleware';
import {getInitialWallet} from '../../services/walletService';
import {WalletTransaction} from '../../types';
interface WalletState {balance: number; transactions: WalletTransaction[]; createOrder: (amount: number) => void;}
export const useWalletStore = create<WalletState>()(persist(
  set => ({
    ...getInitialWallet(),
    createOrder: amount => set(state => ({transactions: [{id: 'order-' + Date.now(), type: 'credit', amount, description: 'Demo top-up order', status: 'pending', createdAt: new Date().toISOString()}, ...state.transactions]})),
  }),
  {name: 'astroanjan-wallet', storage: createJSONStorage(() => AsyncStorage)},
));

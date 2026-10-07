import AsyncStorage from '@react-native-async-storage/async-storage';
import {create} from 'zustand';
import {createJSONStorage, persist} from 'zustand/middleware';
import {isValidMockResetEmail, registerMockAccount, signInWithMockAccount, verifyMockPhone} from '../../services/authService';
import {User} from '../../types';
interface AuthState {
  user: User | null; isAuthenticated: boolean; rememberUser: boolean; hasHydrated: boolean;
  login: (email: string, password: string, remember: boolean) => void;
  register: (name: string, email: string, phone: string, password: string, remember: boolean) => void;
  verifyPhone: (phone: string, code: string, remember: boolean) => boolean;
  requestPasswordReset: (email: string) => boolean;
  logout: () => void; hydrate: () => Promise<void>;
}
export const useAuthStore = create<AuthState>()(persist(
  set => ({
    user: null, isAuthenticated: false, rememberUser: true, hasHydrated: false,
    login: (email, _password, rememberUser) => set({
      user: signInWithMockAccount(email), isAuthenticated: true, rememberUser,
    }),
    register: (name, email, phone, _password, rememberUser) => set({
      user: registerMockAccount(name, email, phone),
      isAuthenticated: true, rememberUser,
    }),
    verifyPhone: (phone, code, rememberUser) => {
      const user = verifyMockPhone(phone, code);
      if (!user) return false;
      set({user, isAuthenticated: true, rememberUser});
      return true;
    },
    requestPasswordReset: isValidMockResetEmail,
    logout: () => set({user: null, isAuthenticated: false, rememberUser: false}),
    hydrate: async () => { await useAuthStore.persist.rehydrate(); set({hasHydrated: true}); },
  }),
  {
    name: 'astroanjan-auth', storage: createJSONStorage(() => AsyncStorage),
    partialize: state => ({
      user: state.rememberUser ? state.user : null,
      isAuthenticated: state.rememberUser && state.isAuthenticated,
      rememberUser: state.rememberUser,
    }),
  },
));

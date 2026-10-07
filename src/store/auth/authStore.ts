import AsyncStorage from '@react-native-async-storage/async-storage';
import {create} from 'zustand';
import {createJSONStorage, persist} from 'zustand/middleware';
import {isValidMockResetEmail, registerMockAccount, resetMockPassword, signInWithMockAccount, validateMockPassword, verifyMockPhone} from '../../services/authService';
import {User} from '../../types';
interface AuthState {
  user: User | null; isAuthenticated: boolean; rememberUser: boolean; hasHydrated: boolean;
  login: (email: string, password: string, remember: boolean) => Promise<boolean>;
  loginWithGoogle: (email: string, remember: boolean) => void;
  register: (name: string, email: string, phone: string, password: string, remember: boolean) => Promise<void>;
  verifyPhone: (phone: string, code: string, remember: boolean) => boolean;
  requestPasswordReset: (email: string) => boolean;
  resetPassword: (email: string, password: string) => Promise<boolean>;
  logout: () => void; hydrate: () => Promise<void>;
}
export const useAuthStore = create<AuthState>()(persist(
  set => ({
    user: null, isAuthenticated: false, rememberUser: true, hasHydrated: false,
    login: async (email, password, rememberUser) => {
      if (!await validateMockPassword(email, password)) return false;
      set({user: signInWithMockAccount(email), isAuthenticated: true, rememberUser});
      return true;
    },
    loginWithGoogle: (email, rememberUser) => set({user: signInWithMockAccount(email), isAuthenticated: true, rememberUser}),
    register: async (name, email, phone, password, rememberUser) => {
      const user = await registerMockAccount(name, email, phone, password);
      set({user, isAuthenticated: true, rememberUser});
    },
    verifyPhone: (phone, code, rememberUser) => {
      const user = verifyMockPhone(phone, code);
      if (!user) return false;
      set({user, isAuthenticated: true, rememberUser});
      return true;
    },
    requestPasswordReset: isValidMockResetEmail,
    resetPassword: resetMockPassword,
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

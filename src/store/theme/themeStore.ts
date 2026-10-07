import AsyncStorage from '@react-native-async-storage/async-storage';
import {create} from 'zustand';
import {createJSONStorage, persist} from 'zustand/middleware';
interface ThemeState {
  mode: 'light' | 'dark'; setMode: (mode: 'light' | 'dark') => void;
  toggle: () => void; hydrate: () => Promise<void>;
}
export const useThemeStore = create<ThemeState>()(persist(
  set => ({
    mode: 'light', setMode: mode => set({mode}),
    toggle: () => set(state => ({mode: state.mode === 'light' ? 'dark' : 'light'})),
    hydrate: async () => { await useThemeStore.persist.rehydrate(); },
  }),
  {name: 'astroanjan-theme', storage: createJSONStorage(() => AsyncStorage), partialize: state => ({mode: state.mode})},
));

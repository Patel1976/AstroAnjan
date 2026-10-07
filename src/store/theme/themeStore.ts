import AsyncStorage from '@react-native-async-storage/async-storage';
import {create} from 'zustand';
import {createJSONStorage, persist} from 'zustand/middleware';
import {Appearance} from 'react-native';
export type ThemePreference = 'system' | 'light' | 'dark';
interface ThemeState {
  mode: 'light' | 'dark'; preference: ThemePreference;
  setPreference: (preference: ThemePreference) => void;
  updateSystemMode: (systemMode: 'light' | 'dark') => void;
  toggle: () => void; hydrate: () => Promise<void>;
}
export const useThemeStore = create<ThemeState>()(persist(
  set => ({
    mode: Appearance.getColorScheme() === 'dark' ? 'dark' : 'light',
    preference: 'system',
    setPreference: preference => set(state => ({
      preference,
      mode: preference === 'system' ? state.mode : preference,
    })),
    updateSystemMode: systemMode => set(state => state.preference === 'system' ? {mode: systemMode} : state),
    toggle: () => set(state => {
      const mode = state.mode === 'light' ? 'dark' : 'light';
      return {mode, preference: mode};
    }),
    hydrate: async () => { await useThemeStore.persist.rehydrate(); },
  }),
  {name: 'astroanjan-theme', storage: createJSONStorage(() => AsyncStorage), partialize: state => ({preference: state.preference})},
));

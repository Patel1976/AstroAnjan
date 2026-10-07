import 'react-native-gesture-handler';
import React, {useEffect} from 'react';
import {StatusBar, useColorScheme} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {RootNavigator} from './src/navigation/RootNavigator';
import {useAuthStore} from './src/store/auth/authStore';
import {useThemeStore} from './src/store/theme/themeStore';

export default function App() {
  const hydrateAuth = useAuthStore(state => state.hydrate);
  const hydrateTheme = useThemeStore(state => state.hydrate);
  const isDark = useThemeStore(state => state.mode === 'dark');
  const preference = useThemeStore(state => state.preference);
  const updateSystemMode = useThemeStore(state => state.updateSystemMode);
  const systemMode = useColorScheme();

  useEffect(() => {
    hydrateAuth().catch(() => undefined);
    hydrateTheme().catch(() => undefined);
  }, [hydrateAuth, hydrateTheme]);

  useEffect(() => {
    if (preference === 'system') {
      updateSystemMode(systemMode === 'dark' ? 'dark' : 'light');
    } else {
      useThemeStore.getState().setPreference(preference);
    }
  }, [preference, systemMode, updateSystemMode]);

  return (
    <SafeAreaProvider>
      <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} />
      <RootNavigator />
    </SafeAreaProvider>
  );
}

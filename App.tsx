import 'react-native-gesture-handler';
import React, {useEffect} from 'react';
import {StatusBar} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {RootNavigator} from './src/navigation/RootNavigator';
import {useAuthStore} from './src/store/auth/authStore';
import {useThemeStore} from './src/store/theme/themeStore';

export default function App() {
  const hydrateAuth = useAuthStore(state => state.hydrate);
  const hydrateTheme = useThemeStore(state => state.hydrate);
  const isDark = useThemeStore(state => state.mode === 'dark');

  useEffect(() => {
    hydrateAuth().catch(() => undefined);
    hydrateTheme().catch(() => undefined);
  }, [hydrateAuth, hydrateTheme]);

  return (
    <SafeAreaProvider>
      <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} />
      <RootNavigator />
    </SafeAreaProvider>
  );
}

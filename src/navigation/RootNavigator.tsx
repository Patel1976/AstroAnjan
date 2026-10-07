import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {AuthNavigator} from './AuthNavigator';
import {MainStackNavigator} from './MainStackNavigator';
import {SplashScreen} from '../screens/SplashScreen';
import {useAuthStore} from '../store/auth/authStore';
import {useThemeStore} from '../store/theme/themeStore';
import {darkColors, lightColors} from '../theme';
const Stack = createNativeStackNavigator();
export function RootNavigator() {
  const authenticated = useAuthStore(state => state.isAuthenticated);
  const hydrated = useAuthStore(state => state.hasHydrated);
  const dark = useThemeStore(state => state.mode === 'dark');
  const colors = dark ? darkColors : lightColors;
  if (!hydrated) return <SplashScreen />;
  return <NavigationContainer><Stack.Navigator screenOptions={{headerShown: false, contentStyle: {backgroundColor: colors.background}}}>
    {authenticated ? <Stack.Screen name="Main" component={MainStackNavigator} /> : <Stack.Screen name="Auth" component={AuthNavigator} />}
  </Stack.Navigator></NavigationContainer>;
}

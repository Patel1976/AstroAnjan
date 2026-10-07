import React from 'react';
import {ActivityIndicator, StyleSheet, View} from 'react-native';
import {useThemeStore} from '../store/theme/themeStore';
import {darkColors, lightColors} from '../theme';
import {AppText} from './AppText';

export function LoadingState({message = 'Loading…'}: {message?: string}) {
  const dark = useThemeStore(state => state.mode === 'dark');
  const colors = dark ? darkColors : lightColors;
  return <View style={styles.wrap} accessibilityRole="progressbar">
    <ActivityIndicator color={colors.accent} size="large" />
    <AppText tone="muted" style={styles.message}>{message}</AppText>
  </View>;
}

const styles = StyleSheet.create({wrap: {flex: 1, minHeight: 180, alignItems: 'center', justifyContent: 'center', padding: 24}, message: {marginTop: 14, textAlign: 'center'}});

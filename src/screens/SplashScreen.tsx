import React from 'react';
import {ActivityIndicator, StyleSheet, View} from 'react-native';
import {AppText} from '../components';
import {useThemeStore} from '../store/theme/themeStore';
import {darkColors, lightColors} from '../theme';
export function SplashScreen() {
  const dark = useThemeStore(state => state.mode === 'dark');
  const colors = dark ? darkColors : lightColors;
  return <View style={[styles.container, {backgroundColor: colors.background}]}><AppText style={styles.symbol}>✦</AppText><AppText style={styles.brand} weight="bold">ASTRO ANJAN</AppText><AppText tone="muted">Find your cosmic balance</AppText><ActivityIndicator color={colors.accent} style={styles.loader} /></View>;
}
const styles = StyleSheet.create({container: {flex: 1, alignItems: 'center', justifyContent: 'center'}, symbol: {fontSize: 52, color: '#C58A43'}, brand: {fontSize: 23, letterSpacing: 3, marginTop: 12, marginBottom: 8}, loader: {marginTop: 36}});

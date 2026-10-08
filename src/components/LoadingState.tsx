import React from 'react';
import {ActivityIndicator, StyleSheet, View} from 'react-native';
import {darkColors, lightColors} from '../theme';
import {useThemeStore} from '../store/theme/themeStore';
import {AppText} from './AppText';

export function LoadingState({message = 'Preparing your reading…'}: {message?: string}) {
  const dark = useThemeStore(state => state.mode === 'dark');
  const colors = dark ? darkColors : lightColors;
  return <View style={styles.wrap} accessibilityRole="progressbar" accessibilityLabel={message}>
    <View style={[styles.loaderCard, {backgroundColor: colors.surface, borderColor: colors.border}]}>
      <View style={[styles.loaderIcon, {backgroundColor: colors.warmSoft}]}><ActivityIndicator color={colors.accent} /></View>
      <View style={styles.copy}><View style={[styles.line, {backgroundColor: colors.soft}]} /><View style={[styles.lineShort, {backgroundColor: colors.soft}]} /></View>
    </View>
    <AppText tone="muted" style={styles.message}>{message}</AppText>
  </View>;
}

const styles = StyleSheet.create({wrap: {flex: 1, minHeight: 190, alignItems: 'center', justifyContent: 'center', padding: 24}, loaderCard: {width: '100%', maxWidth: 340, minHeight: 90, flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderRadius: 22, padding: 18}, loaderIcon: {width: 48, height: 48, borderRadius: 17, alignItems: 'center', justifyContent: 'center'}, copy: {flex: 1, marginLeft: 15, gap: 9}, line: {height: 10, width: '92%', borderRadius: 5}, lineShort: {height: 8, width: '60%', borderRadius: 4}, message: {textAlign: 'center', marginTop: 14}});

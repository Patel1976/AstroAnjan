import React from 'react';
import {StyleSheet, View} from 'react-native';
import {darkColors, lightColors} from '../theme';
import {useThemeStore} from '../store/theme/themeStore';
import {AppButton} from './AppButton';
import {AppText} from './AppText';

export function ErrorState({title = 'Something went wrong', message, onRetry}: {title?: string; message: string; onRetry?: () => void}) {
  const dark = useThemeStore(state => state.mode === 'dark');
  const colors = dark ? darkColors : lightColors;
  return <View style={styles.wrap} accessibilityRole="alert">
    <View style={[styles.iconWrap, {backgroundColor: colors.errorSoft}]}><AppText style={[styles.icon, {color: colors.error}]}>!</AppText></View>
    <AppText variant="cardTitle">{title}</AppText>
    <AppText tone="muted" style={styles.message}>{message}</AppText>
    {onRetry ? <View style={styles.retry}><AppButton title="Try again" onPress={onRetry} secondary /></View> : null}
  </View>;
}

const styles = StyleSheet.create({wrap: {flex: 1, minHeight: 210, alignItems: 'center', justifyContent: 'center', padding: 24}, iconWrap: {width: 50, height: 50, borderRadius: 17, alignItems: 'center', justifyContent: 'center', marginBottom: 13}, icon: {fontSize: 24, fontWeight: '700'}, message: {textAlign: 'center', lineHeight: 20, marginTop: 6, maxWidth: 300}, retry: {width: '100%', marginTop: 18}});

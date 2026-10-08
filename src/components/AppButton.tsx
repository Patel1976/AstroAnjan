import React from 'react';
import {ActivityIndicator, Pressable, StyleSheet, Text} from 'react-native';
import {useThemeStore} from '../store/theme/themeStore';
import {darkColors, lightColors} from '../theme';
export function AppButton({title, onPress, secondary = false, disabled = false, loading = false}: {title: string; onPress: () => void; secondary?: boolean; disabled?: boolean; loading?: boolean}) {
  const dark = useThemeStore(state => state.mode === 'dark');
  const colors = dark ? darkColors : lightColors;
  const unavailable = disabled || loading;
  return <Pressable disabled={unavailable} accessibilityRole="button" accessibilityState={{disabled: unavailable, busy: loading}} onPress={onPress} style={({pressed}) => [styles.button, {backgroundColor: secondary ? colors.soft : colors.primary}, unavailable && styles.disabled, pressed && !unavailable && styles.pressed]}>{loading ? <ActivityIndicator color={secondary ? colors.primary : colors.onPrimary} /> : <Text style={[styles.label, {color: secondary ? colors.primary : colors.onPrimary}]}>{title}</Text>}</Pressable>;
}
const styles = StyleSheet.create({button: {minHeight: 52, borderRadius: 16, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 20}, disabled: {opacity: 0.55}, pressed: {opacity: 0.88, transform: [{scale: 0.985}]}, label: {fontSize: 15, fontWeight: '700', letterSpacing: 0.1}});

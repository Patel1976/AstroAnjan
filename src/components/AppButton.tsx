import React from 'react';
import {Pressable, StyleSheet, Text} from 'react-native';
import {useThemeStore} from '../store/theme/themeStore';
import {darkColors, lightColors} from '../theme';
export function AppButton({title, onPress, secondary = false, disabled = false}: {title: string; onPress: () => void; secondary?: boolean; disabled?: boolean}) {
  const dark = useThemeStore(state => state.mode === 'dark');
  const colors = dark ? darkColors : lightColors;
  return <Pressable disabled={disabled} accessibilityRole="button" accessibilityState={{disabled}} onPress={onPress} style={[styles.button, {backgroundColor: secondary ? colors.soft : colors.primary}, disabled && styles.disabled]}><Text style={[styles.label, {color: secondary ? colors.primary : colors.onPrimary}]}>{title}</Text></Pressable>;
}
const styles = StyleSheet.create({button: {minHeight: 52, borderRadius: 16, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 20}, disabled: {opacity: 0.55}, label: {fontSize: 15, fontWeight: '700'}});

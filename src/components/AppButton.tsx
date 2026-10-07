import React from 'react';
import {Pressable, StyleSheet, Text} from 'react-native';
import {useThemeStore} from '../store/theme/themeStore';
import {darkColors, lightColors} from '../theme';
export function AppButton({title, onPress, secondary = false}: {title: string; onPress: () => void; secondary?: boolean}) {
  const dark = useThemeStore(state => state.mode === 'dark');
  const colors = dark ? darkColors : lightColors;
  return <Pressable onPress={onPress} style={[styles.button, {backgroundColor: secondary ? colors.soft : colors.primary}]}><Text style={[styles.label, {color: secondary ? colors.primary : '#FFFFFF'}]}>{title}</Text></Pressable>;
}
const styles = StyleSheet.create({button: {minHeight: 52, borderRadius: 16, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 20}, label: {fontSize: 15, fontWeight: '700'}});

import React from 'react';
import {Text, TextProps, StyleSheet} from 'react-native';
import {useThemeStore} from '../store/theme/themeStore';
import {darkColors, lightColors, typography} from '../theme';
type TextVariant = 'hero' | 'screenTitle' | 'sectionTitle' | 'cardTitle' | 'body' | 'secondary' | 'caption';
type Props = TextProps & {tone?: 'primary' | 'muted' | 'accent'; weight?: 'regular' | 'medium' | 'bold'; variant?: TextVariant};
export function AppText({style, tone = 'primary', weight = 'regular', variant = 'body', ...props}: Props) {
  const dark = useThemeStore(state => state.mode === 'dark');
  const colors = dark ? darkColors : lightColors;
  return <Text {...props} style={[styles.base, typography[variant], {color: tone === 'muted' ? colors.textSecondary : tone === 'accent' ? colors.accent : colors.textPrimary}, weight === 'bold' && styles.bold, style]} />;
}
const styles = StyleSheet.create({base: {includeFontPadding: false}, bold: {fontWeight: '700'}});

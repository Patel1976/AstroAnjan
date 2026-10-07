import React from 'react';
import {Text, TextProps, StyleSheet} from 'react-native';
import {useThemeStore} from '../store/theme/themeStore';
import {darkColors, lightColors} from '../theme';
type Props = TextProps & {tone?: 'primary' | 'muted' | 'accent'; weight?: 'regular' | 'medium' | 'bold'};
export function AppText({style, tone = 'primary', weight = 'regular', ...props}: Props) {
  const dark = useThemeStore(state => state.mode === 'dark');
  const colors = dark ? darkColors : lightColors;
  return <Text {...props} style={[styles.base, {color: tone === 'muted' ? colors.muted : tone === 'accent' ? colors.accent : colors.text}, weight === 'bold' && styles.bold, style]} />;
}
const styles = StyleSheet.create({base: {fontSize: 15}, bold: {fontWeight: '700'}});

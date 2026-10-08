import React, {PropsWithChildren} from 'react';
import {Pressable, StyleSheet, View} from 'react-native';
import {useThemeStore} from '../store/theme/themeStore';
import {darkColors, lightColors} from '../theme';
export function AppCard({children, style, onPress}: PropsWithChildren<{style?: object; onPress?: () => void}>) {
  const dark = useThemeStore(state => state.mode === 'dark');
  const colors = dark ? darkColors : lightColors;
  const cardStyle = [styles.card, {backgroundColor: colors.surfaceElevated, borderColor: colors.border}, onPress && styles.interactive, style];
  return onPress
    ? <Pressable accessibilityRole="button" onPress={onPress} style={({pressed}) => [...cardStyle, pressed && styles.pressed]}>{children}</Pressable>
    : <View style={cardStyle}>{children}</View>;
}
const styles = StyleSheet.create({card: {borderRadius: 20, padding: 16, borderWidth: StyleSheet.hairlineWidth, shadowColor: '#281B30', shadowOpacity: 0.045, shadowRadius: 10, shadowOffset: {width: 0, height: 3}, elevation: 2}, interactive: {shadowOpacity: 0.065, elevation: 2}, pressed: {opacity: 0.95, transform: [{scale: 0.99}]}});

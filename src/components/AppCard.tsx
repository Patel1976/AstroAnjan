import React, {PropsWithChildren} from 'react';
import {Pressable, StyleSheet, View} from 'react-native';
import {useThemeStore} from '../store/theme/themeStore';
import {darkColors, lightColors} from '../theme';
export function AppCard({children, style, onPress}: PropsWithChildren<{style?: object; onPress?: () => void}>) {
  const dark = useThemeStore(state => state.mode === 'dark');
  const colors = dark ? darkColors : lightColors;
  const cardStyle = [styles.card, {backgroundColor: colors.surface, borderColor: colors.border}, style];
  return onPress
    ? <Pressable onPress={onPress} style={cardStyle}>{children}</Pressable>
    : <View style={cardStyle}>{children}</View>;
}
const styles = StyleSheet.create({card: {borderRadius: 20, padding: 18, borderWidth: 1}});

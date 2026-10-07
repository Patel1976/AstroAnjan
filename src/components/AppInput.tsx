import React from 'react';
import {StyleSheet, TextInput, TextInputProps} from 'react-native';
import {useThemeStore} from '../store/theme/themeStore';
import {darkColors, lightColors} from '../theme';
export function AppInput(props: TextInputProps) {
  const dark = useThemeStore(state => state.mode === 'dark');
  const colors = dark ? darkColors : lightColors;
  return <TextInput placeholderTextColor={colors.muted} {...props} style={[styles.input, {backgroundColor: colors.surface, borderColor: colors.border, color: colors.text}, props.style]} />;
}
const styles = StyleSheet.create({input: {height: 54, borderRadius: 14, borderWidth: 1, paddingHorizontal: 16, fontSize: 15}});

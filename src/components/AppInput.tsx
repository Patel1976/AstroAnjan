import React, {useState} from 'react';
import {StyleSheet, TextInput, TextInputProps} from 'react-native';
import {useThemeStore} from '../store/theme/themeStore';
import {darkColors, lightColors, radius} from '../theme';
export function AppInput(props: TextInputProps) {
  const [focused, setFocused] = useState(false);
  const dark = useThemeStore(state => state.mode === 'dark');
  const colors = dark ? darkColors : lightColors;
  const {onFocus, onBlur, style, ...inputProps} = props;
  return <TextInput placeholderTextColor={colors.muted} selectionColor={colors.accent} {...inputProps} onFocus={event => {setFocused(true); onFocus?.(event);}} onBlur={event => {setFocused(false); onBlur?.(event);}} style={[styles.input, {backgroundColor: colors.surface, borderColor: focused ? colors.primary : colors.border, color: colors.text}, focused && styles.focused, style]} />;
}
const styles = StyleSheet.create({input: {minHeight: 54, borderRadius: radius.md, borderWidth: 1, paddingHorizontal: 16, paddingVertical: 12, fontSize: 15, lineHeight: 21}, focused: {borderWidth: 1.5}});

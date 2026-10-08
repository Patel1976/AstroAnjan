import React from 'react';
import {Image, StyleSheet, View} from 'react-native';
import {AppText} from './AppText';
import {darkColors, lightColors} from '../theme';
import {useThemeStore} from '../store/theme/themeStore';
export function Avatar({name, uri, size = 56, color}: {name: string; uri?: string | null; size?: number; color?: string}) {
  const dark = useThemeStore(state => state.mode === 'dark');
  const colors = dark ? darkColors : lightColors;
  const initials = name.split(' ').map(part => part[0]).slice(0, 2).join('').toUpperCase();
  if (uri) return <Image accessible accessibilityLabel={`${name} profile photo`} source={{uri}} style={{width: size, height: size, borderRadius: size / 2, borderWidth: 1, borderColor: colors.border}} />;
  return <View style={[styles.avatar, {width: size, height: size, borderRadius: size / 2, backgroundColor: color ?? colors.warmSoft, borderColor: colors.surface}]}><AppText style={{fontSize: size * 0.3, color: colors.iconText}} weight="bold">{initials}</AppText></View>;
}
const styles = StyleSheet.create({avatar: {alignItems: 'center', justifyContent: 'center', borderWidth: 2}});

import React from 'react';
import {StyleSheet, View} from 'react-native';
import {darkColors, lightColors} from '../theme';
import {useThemeStore} from '../store/theme/themeStore';
import {AppText} from './AppText';

export function EmptyState({title, message}: {title: string; message: string}) {
  const dark = useThemeStore(state => state.mode === 'dark');
  const colors = dark ? darkColors : lightColors;
  return <View style={[styles.wrap, {backgroundColor: colors.surface, borderColor: colors.border}]}>
    <View style={[styles.iconWrap, {backgroundColor: colors.warmSoft}]}><AppText style={[styles.icon, {color: colors.accent}]}>✦</AppText></View>
    <AppText variant="cardTitle" style={styles.title}>{title}</AppText>
    <AppText tone="muted" style={styles.message}>{message}</AppText>
  </View>;
}

const styles = StyleSheet.create({wrap: {padding: 24, alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderRadius: 22, marginVertical: 12}, iconWrap: {width: 54, height: 54, borderRadius: 19, alignItems: 'center', justifyContent: 'center', marginBottom: 14}, icon: {fontSize: 25}, title: {textAlign: 'center'}, message: {textAlign: 'center', marginTop: 6, lineHeight: 20, maxWidth: 290}});

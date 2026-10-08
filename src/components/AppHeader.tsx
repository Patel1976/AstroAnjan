import React from 'react';
import {Pressable, StyleSheet, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {AppText} from './AppText';
import {useThemeStore} from '../store/theme/themeStore';
import {darkColors, lightColors} from '../theme';

export function AppHeader({title, subtitle, right, onBack, showBack = true}: {title: string; subtitle?: string; right?: React.ReactNode; onBack?: () => void; showBack?: boolean}) {
  const navigation = useNavigation();
  const dark = useThemeStore(state => state.mode === 'dark');
  const colors = dark ? darkColors : lightColors;
  return <View style={styles.row}>
    {showBack ? <Pressable accessibilityRole='button' accessibilityLabel='Go back' onPress={onBack ?? (() => navigation.goBack())} style={({pressed}) => [styles.back, {backgroundColor: colors.soft, borderColor: colors.border}, pressed && styles.backPressed]}><View style={styles.arrow}><View style={[styles.arrowTop, {backgroundColor: colors.primary}]} /><View style={[styles.arrowBottom, {backgroundColor: colors.primary}]} /></View></Pressable> : <View style={styles.spacer} />}
    <View style={styles.heading}><AppText style={styles.title} weight="bold" numberOfLines={1}>{title}</AppText>{subtitle ? <AppText tone="muted" style={styles.subtitle} numberOfLines={1}>{subtitle}</AppText> : null}</View>
    <View style={styles.right}>{right}</View>
  </View>;
}

const styles = StyleSheet.create({row: {minHeight: 52, flexDirection: 'row', alignItems: 'center', marginBottom: 20}, back: {width: 42, height: 42, borderRadius: 15, borderWidth: 1, alignItems: 'center', justifyContent: 'center'}, backPressed: {opacity: 0.72, transform: [{scale: 0.96}]}, spacer: {width: 42}, arrow: {width: 12, height: 16, justifyContent: 'center'}, arrowTop: {position: 'absolute', width: 9, height: 1.8, borderRadius: 1, left: 0, top: 4, transform: [{rotate: '-45deg'}]}, arrowBottom: {position: 'absolute', width: 9, height: 1.8, borderRadius: 1, left: 0, bottom: 4, transform: [{rotate: '45deg'}]}, heading: {flex: 1, minWidth: 0, marginLeft: 10}, title: {fontSize: 21, lineHeight: 27, letterSpacing: -0.35}, subtitle: {fontSize: 12, marginTop: 1}, right: {minWidth: 30, alignItems: 'flex-end'}});

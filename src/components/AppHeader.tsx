import React from 'react';
import {Pressable, StyleSheet, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {AppText} from './AppText';
import {useThemeStore} from '../store/theme/themeStore';
import {darkColors, lightColors} from '../theme';

export function AppHeader({title, right, onBack, showBack = true}: {title: string; right?: React.ReactNode; onBack?: () => void; showBack?: boolean}) {
  const navigation = useNavigation();
  const dark = useThemeStore(state => state.mode === 'dark');
  const colors = dark ? darkColors : lightColors;
  return <View style={styles.row}>
    {showBack ? <Pressable accessibilityRole="button" accessibilityLabel="Go back" onPress={onBack ?? (() => navigation.goBack())} style={[styles.back, {backgroundColor: colors.soft}]}><AppText style={[styles.arrow, {color: colors.primary}]}>‹</AppText></Pressable> : <View style={styles.spacer} />}
    <AppText style={styles.title} weight="bold" numberOfLines={1}>{title}</AppText>
    <View style={styles.right}>{right}</View>
  </View>;
}

const styles = StyleSheet.create({row: {minHeight: 52, flexDirection: 'row', alignItems: 'center', marginBottom: 16}, back: {width: 42, height: 42, borderRadius: 14, alignItems: 'center', justifyContent: 'center'}, spacer: {width: 42}, arrow: {fontSize: 30, lineHeight: 34}, title: {flex: 1, fontSize: 19, marginLeft: 10}, right: {minWidth: 30, alignItems: 'flex-end'}});

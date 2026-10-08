import React from 'react';
import {Pressable, StyleSheet, View, ViewStyle} from 'react-native';
import {useThemeStore} from '../store/theme/themeStore';
import {darkColors, lightColors} from '../theme';
import {AppInput} from './AppInput';
import {AppText} from './AppText';

export function SearchBar({value, onChangeText, placeholder, style}: {value: string; onChangeText: (value: string) => void; placeholder: string; style?: ViewStyle}) {
  const dark = useThemeStore(state => state.mode === 'dark');
  const colors = dark ? darkColors : lightColors;
  return <View style={[styles.wrap, {backgroundColor: colors.surface, borderColor: colors.border}, style]}>
    <View style={styles.searchIcon} accessibilityElementsHidden><View style={[styles.lens, {borderColor: colors.muted}]} /><View style={[styles.handle, {backgroundColor: colors.muted}]} /></View>
    <AppInput value={value} onChangeText={onChangeText} placeholder={placeholder} returnKeyType="search" style={styles.input} />
    {value.length > 0 ? <Pressable accessibilityRole="button" accessibilityLabel="Clear search" onPress={() => onChangeText('')} hitSlop={10} style={styles.clear}><View style={[styles.crossLine, {backgroundColor: colors.muted, transform: [{rotate: '45deg'}]}]} /><View style={[styles.crossLine, {backgroundColor: colors.muted, transform: [{rotate: '-45deg'}]}]} /></Pressable> : null}
  </View>;
}

const styles = StyleSheet.create({wrap: {minHeight: 54, flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderRadius: 16, paddingLeft: 16, paddingRight: 8}, searchIcon: {width: 20, height: 22, marginRight: 10, justifyContent: 'center'}, lens: {width: 13, height: 13, borderRadius: 7, borderWidth: 1.8}, handle: {position: 'absolute', width: 7, height: 1.8, borderRadius: 1, left: 11, top: 15, transform: [{rotate: '45deg'}]}, input: {flex: 1, borderWidth: 0, backgroundColor: 'transparent', paddingHorizontal: 0, minHeight: 50}, clear: {width: 34, height: 38, alignItems: 'center', justifyContent: 'center'}, crossLine: {position: 'absolute', width: 14, height: 1.8, borderRadius: 1}});

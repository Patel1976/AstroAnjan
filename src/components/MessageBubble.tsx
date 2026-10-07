import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Message} from '../types';
import {AppText} from './AppText';
import {darkColors, lightColors} from '../theme';
import {useThemeStore} from '../store/theme/themeStore';
export function MessageBubble({message}: {message: Message}) {
  const own = message.sender === 'user';
  const dark = useThemeStore(state => state.mode === 'dark');
  const colors = dark ? darkColors : lightColors;
  return <View style={[styles.row, own ? styles.ownRow : styles.otherRow]}><View style={[styles.bubble, {backgroundColor: own ? colors.primary : colors.surface, borderColor: colors.border}, own ? styles.own : styles.other]}><AppText style={{color: own ? colors.onPrimary : colors.text}}>{message.text}</AppText><AppText style={[styles.time, {color: own ? colors.cosmicMuted : colors.muted}]}>{new Date(message.createdAt).toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'})}</AppText></View></View>;
}
const styles = StyleSheet.create({row: {width: '100%', marginVertical: 5}, ownRow: {alignItems: 'flex-end'}, otherRow: {alignItems: 'flex-start'}, bubble: {maxWidth: '82%', paddingHorizontal: 14, paddingVertical: 10, borderRadius: 17, borderWidth: StyleSheet.hairlineWidth}, own: {borderBottomRightRadius: 5}, other: {borderBottomLeftRadius: 5}, time: {fontSize: 10, textAlign: 'right', marginTop: 5}});

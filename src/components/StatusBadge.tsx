import React from 'react';
import {StyleSheet, View} from 'react-native';
import {useThemeStore} from '../store/theme/themeStore';
import {darkColors, lightColors} from '../theme';
import {AppText} from './AppText';

type Status = 'pending' | 'accepted' | 'active' | 'completed' | 'cancelled' | 'approved' | 'rejected' | 'available' | 'unavailable';
type ColorToken = 'statusPending' | 'statusAccepted' | 'statusActive' | 'statusCompleted' | 'statusCancelled';
const statusColor: Record<Status, ColorToken> = {
  pending: 'statusPending', accepted: 'statusAccepted', active: 'statusActive', completed: 'statusCompleted',
  cancelled: 'statusCancelled', approved: 'statusActive', rejected: 'statusCancelled', available: 'statusActive', unavailable: 'statusCompleted',
};

export function StatusBadge({status, label}: {status: Status; label?: string}) {
  const dark = useThemeStore(state => state.mode === 'dark');
  const colors = dark ? darkColors : lightColors;
  const color = colors[statusColor[status]];
  return <View style={[styles.badge, {backgroundColor: colors.soft}]}><View style={[styles.dot, {backgroundColor: color}]} /><AppText style={[styles.label, {color}]} weight="bold">{label ?? status}</AppText></View>;
}

const styles = StyleSheet.create({badge: {flexDirection: 'row', alignItems: 'center', alignSelf: 'flex-start', borderRadius: 999, paddingHorizontal: 10, paddingVertical: 6, gap: 6}, dot: {width: 6, height: 6, borderRadius: 3}, label: {fontSize: 10, lineHeight: 14, textTransform: 'uppercase', letterSpacing: 0.35}});

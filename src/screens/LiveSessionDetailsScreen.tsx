import React from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {SafeAreaView} from 'react-native-safe-area-context';
import {AppCard, AppHeader, AppText, Avatar, EmptyState} from '../components';
import {MainStackParamList} from '../navigation/types';
import {useLiveSessionStore} from '../store/liveSessions/liveSessionStore';
import {useThemeStore} from '../store/theme/themeStore';
import {darkColors, lightColors} from '../theme';
type Props = NativeStackScreenProps<MainStackParamList, 'LiveSessionDetails'>;
export function LiveSessionDetailsScreen({route}: Props) {
  const session = useLiveSessionStore(state => state.getById(route.params.sessionId));
  const dark = useThemeStore(state => state.mode === 'dark'); const colors = dark ? darkColors : lightColors;
  if (!session) return <SafeAreaView edges={['top']} style={[styles.safe, {backgroundColor: colors.background}]}><AppHeader title="Session" /><EmptyState title="Session unavailable" message="This live session could not be found." /></SafeAreaView>;
  return <SafeAreaView edges={['top']} style={[styles.safe, {backgroundColor: colors.background}]}><ScrollView contentContainerStyle={styles.page}>
    <AppHeader title="Live session" />
    <View style={[styles.player, {backgroundColor: colors.cosmic}]}><AppText style={styles.play} tone="accent">▶</AppText><AppText style={[styles.playerText, {color: colors.onCosmic}]}>Video playback is coming soon</AppText></View>
    <AppText style={styles.title} weight="bold">{session.title}</AppText><AppText tone="muted" style={styles.description}>{session.description}</AppText>
    <AppCard style={styles.host}><Avatar name={session.astrologerName} size={50} /><View style={styles.hostInfo}><AppText weight="bold">{session.astrologerName}</AppText><AppText tone="muted" style={styles.hostMeta}>{session.isLive ? session.viewers + ' viewers now' : new Date(session.startsAt).toLocaleString()}</AppText></View><AppText tone="accent" weight="bold">{session.isLive ? 'LIVE' : 'SOON'}</AppText></AppCard>
    <AppText tone="muted" style={styles.note}>This prototype does not stream video. Session information is mock data.</AppText>
  </ScrollView></SafeAreaView>;
}
const styles = StyleSheet.create({safe: {flex: 1}, page: {padding: 20}, player: {aspectRatio: 16 / 10, borderRadius: 22, alignItems: 'center', justifyContent: 'center'}, play: {fontSize: 38}, playerText: {marginTop: 10}, title: {fontSize: 23, marginTop: 22}, description: {lineHeight: 22, marginTop: 7}, host: {flexDirection: 'row', alignItems: 'center', marginTop: 20, padding: 15}, hostInfo: {marginLeft: 11, flex: 1}, hostMeta: {fontSize: 12, marginTop: 3}, note: {fontSize: 12, lineHeight: 19, marginTop: 19}});

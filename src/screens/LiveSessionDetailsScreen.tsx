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
    <View style={[styles.player, {backgroundColor: colors.cosmic}]}><AppText style={styles.play} tone="accent">?</AppText><AppText style={[styles.playerText, {color: colors.onCosmic}]}>Video playback is coming soon</AppText></View>
    <AppText style={styles.title} weight="bold">{session.title}</AppText><AppText tone="muted" style={styles.description}>{session.description}</AppText>
    <AppCard style={[styles.host, {borderColor: colors.border}]}>
      <View style={styles.hostTop}>
        <View style={[styles.livePill, {backgroundColor: session.isLive ? colors.soft : colors.warmSoft}]}>
          <View style={[styles.liveDot, {backgroundColor: session.isLive ? colors.success : colors.accent}]} />
          <AppText style={[styles.liveLabel, {color: session.isLive ? colors.success : colors.accent}]} weight="bold">{session.isLive ? 'LIVE NOW' : 'UPCOMING'}</AppText>
        </View>
        <AppText tone="muted" style={styles.hostMeta}>{session.isLive ? session.viewers + ' watching' : new Date(session.startsAt).toLocaleString()}</AppText>
      </View>
      <View style={[styles.hostRow, {borderTopColor: colors.border}]}>
        <Avatar name={session.astrologerName} size={42} />
        <View style={styles.hostInfo}><AppText weight="bold">{session.astrologerName}</AppText><AppText tone="muted" style={styles.hostSub}>Session host</AppText></View>
      </View>
    </AppCard>
    <AppText tone="muted" style={styles.note}>This prototype does not stream video. Session information is mock data.</AppText>
  </ScrollView></SafeAreaView>;
}
const styles = StyleSheet.create({safe: {flex: 1}, page: {paddingHorizontal: 20, paddingTop: 12, paddingBottom: 32, width: '100%', maxWidth: 760, alignSelf: 'center'}, player: {aspectRatio: 16 / 10, borderRadius: 22, alignItems: 'center', justifyContent: 'center'}, play: {fontSize: 38}, playerText: {marginTop: 10}, title: {fontSize: 23, marginTop: 22}, description: {lineHeight: 22, marginTop: 7}, host: {marginTop: 20, padding: 16}, hostTop: {flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14}, livePill: {flexDirection: 'row', alignItems: 'center', gap: 6, borderRadius: 10, paddingHorizontal: 9, paddingVertical: 6}, liveDot: {width: 7, height: 7, borderRadius: 4}, liveLabel: {fontSize: 9, letterSpacing: 0.4}, hostMeta: {fontSize: 11}, hostRow: {flexDirection: 'row', alignItems: 'center', gap: 12, paddingTop: 14, borderTopWidth: StyleSheet.hairlineWidth}, hostInfo: {flex: 1}, hostSub: {fontSize: 12, marginTop: 2}, note: {fontSize: 12, lineHeight: 19, marginTop: 19}});

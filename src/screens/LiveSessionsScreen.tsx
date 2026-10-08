import React from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {SafeAreaView} from 'react-native-safe-area-context';
import {AppCard, AppHeader, AppText, Avatar, EmptyState} from '../components';
import {MainStackParamList} from '../navigation/types';
import {useLiveSessionStore} from '../store/liveSessions/liveSessionStore';
import {useThemeStore} from '../store/theme/themeStore';
import {darkColors, lightColors} from '../theme';
export function LiveSessionsScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<MainStackParamList>>();
  const sessions = useLiveSessionStore(state => state.sessions);
  const dark = useThemeStore(state => state.mode === 'dark'); const colors = dark ? darkColors : lightColors;
  return <SafeAreaView edges={['top']} style={[styles.safe, {backgroundColor: colors.background}]}><ScrollView contentContainerStyle={styles.page}>
    <AppHeader title="Live sessions" /><AppText variant="screenTitle" style={styles.heading} weight="bold">Learn together, live</AppText><AppText tone="muted" style={styles.subtitle}>Join a guided session or save a place for an upcoming event.</AppText>
    {sessions.map(session => <AppCard key={session.id} style={[styles.card, {backgroundColor: session.isLive ? colors.cosmic : colors.surfaceElevated, borderColor: session.isLive ? colors.cosmic : colors.border}]} onPress={() => navigation.navigate('LiveSessionDetails', {sessionId: session.id})}>
      <View style={styles.cardTop}>
        <View style={[styles.livePill, {backgroundColor: session.isLive ? colors.cosmicOverlay : colors.warmSoft}]}>
          <View style={[styles.liveDot, {backgroundColor: session.isLive ? colors.live : colors.accent}]} />
          <AppText style={[styles.liveLabel, {color: session.isLive ? colors.onCosmic : colors.accent}]} weight="bold">{session.isLive ? 'LIVE NOW' : 'UPCOMING'}</AppText>
        </View>
        <AppText style={[styles.viewers, {color: session.isLive ? colors.cosmicMuted : colors.muted}]}>{session.isLive ? `${session.viewers} watching` : new Date(session.startsAt).toLocaleDateString()}</AppText>
      </View>
      <AppText style={[styles.title, {color: session.isLive ? colors.onCosmic : colors.text}]} weight="bold" numberOfLines={2}>{session.title}</AppText>
      <AppText style={[styles.description, {color: session.isLive ? colors.cosmicMuted : colors.muted}]} numberOfLines={2}>{session.description}</AppText>
      <View style={[styles.host, {borderTopColor: session.isLive ? colors.cosmicOverlay : colors.border}]}>
        <Avatar name={session.astrologerName} size={30} />
        <AppText style={[styles.hostName, {color: session.isLive ? colors.cosmicMuted : colors.muted}]} numberOfLines={1}>{session.astrologerName}</AppText>
        <AppText style={[styles.joinText, {color: session.isLive ? colors.onCosmic : colors.accent}]} weight="bold">{session.isLive ? 'Join now  ›' : 'Save spot  ›'}</AppText>
      </View>
    </AppCard>)}
    {sessions.length === 0 ? <EmptyState title="No live sessions" message="Check back later for upcoming sessions." /> : null}
  </ScrollView></SafeAreaView>;
}
const styles = StyleSheet.create({safe: {flex: 1}, page: {paddingHorizontal: 20, paddingTop: 12, paddingBottom: 32, width: '100%', maxWidth: 760, alignSelf: 'center'}, heading: {fontSize: 24}, subtitle: {lineHeight: 20, marginTop: 5}, card: {marginTop: 14, padding: 16, borderRadius: 20}, cardTop: {flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14}, livePill: {flexDirection: 'row', alignItems: 'center', gap: 6, borderRadius: 10, paddingHorizontal: 9, paddingVertical: 6}, liveDot: {width: 7, height: 7, borderRadius: 4}, liveLabel: {fontSize: 9, letterSpacing: 0.4}, viewers: {fontSize: 10}, title: {fontSize: 17, lineHeight: 23}, description: {lineHeight: 20, marginTop: 5, fontSize: 13}, host: {flexDirection: 'row', alignItems: 'center', marginTop: 14, paddingTop: 12, borderTopWidth: StyleSheet.hairlineWidth, gap: 8}, hostName: {fontSize: 12, flex: 1}, joinText: {fontSize: 12}});

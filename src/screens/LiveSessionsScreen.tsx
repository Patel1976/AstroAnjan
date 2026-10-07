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
    <AppHeader title="Live sessions" /><AppText style={styles.heading} weight="bold">Learn together, live</AppText><AppText tone="muted" style={styles.subtitle}>Join a guided session or save a place for an upcoming event.</AppText>
    {sessions.map(session => <AppCard key={session.id} style={styles.card} onPress={() => navigation.navigate('LiveSessionDetails', {sessionId: session.id})}>
      <View style={[styles.poster, {backgroundColor: session.isLive ? '#34213F' : colors.soft}]}><AppText style={styles.posterIcon} tone={session.isLive ? 'accent' : 'primary'}>✧</AppText><AppText style={[styles.liveBadge, {color: session.isLive ? '#FFFFFF' : colors.muted}]}>{session.isLive ? '● LIVE NOW' : 'UPCOMING'}</AppText></View>
      <AppText style={styles.title} weight="bold">{session.title}</AppText><AppText tone="muted" style={styles.description}>{session.description}</AppText>
      <View style={styles.host}><Avatar name={session.astrologerName} size={34} /><AppText style={styles.hostName}>{session.astrologerName}</AppText><AppText tone="muted" style={styles.viewers}>{session.isLive ? session.viewers + ' watching' : new Date(session.startsAt).toLocaleString()}</AppText></View>
    </AppCard>)}
    {sessions.length === 0 ? <EmptyState title="No live sessions" message="Check back later for upcoming sessions." /> : null}
  </ScrollView></SafeAreaView>;
}
const styles = StyleSheet.create({safe: {flex: 1}, page: {padding: 20, paddingBottom: 32}, heading: {fontSize: 24}, subtitle: {lineHeight: 20, marginTop: 5}, card: {marginTop: 16, padding: 14}, poster: {height: 135, borderRadius: 15, alignItems: 'center', justifyContent: 'center'}, posterIcon: {fontSize: 44}, liveBadge: {position: 'absolute', top: 12, left: 12, fontSize: 10, fontWeight: '700'}, title: {fontSize: 17, marginTop: 13}, description: {lineHeight: 20, marginTop: 5}, host: {flexDirection: 'row', alignItems: 'center', marginTop: 13}, hostName: {marginLeft: 9, fontWeight: '600', flex: 1}, viewers: {fontSize: 10}});

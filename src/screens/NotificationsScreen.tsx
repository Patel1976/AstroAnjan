import React from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {AppCard, AppHeader, AppText, EmptyState} from '../components';
import {useNotificationStore} from '../store/notifications/notificationStore';
import {NotificationItem} from '../types';
import {useThemeStore} from '../store/theme/themeStore';
import {darkColors, lightColors} from '../theme';
const icons: Record<NotificationItem['type'], string> = {consultation: '◷', wallet: '₹', astrology: '✧', live: '◉'};
export function NotificationsScreen() {
  const items = useNotificationStore(state => state.items);
  const unread = items.filter(item => !item.isRead).length;
  const markRead = useNotificationStore(state => state.markRead);
  const markAllRead = useNotificationStore(state => state.markAllRead);
  const dark = useThemeStore(state => state.mode === 'dark'); const colors = dark ? darkColors : lightColors;
  return <SafeAreaView edges={['top']} style={[styles.safe, {backgroundColor: colors.background}]}><ScrollView contentContainerStyle={styles.page}>
    <AppHeader title="Notifications" right={<AppText tone="accent" weight="bold" onPress={markAllRead}>Read all</AppText>} />
    <AppText tone="muted" style={styles.count}>{unread} unread</AppText>
    {items.map(item => <AppCard key={item.id} onPress={() => markRead(item.id)} style={[styles.card, !item.isRead && {borderColor: colors.accent}]}>
      <View style={[styles.icon, {backgroundColor: colors.soft}]}><AppText tone="accent">{icons[item.type]}</AppText></View>
      <View style={styles.content}><View style={styles.titleRow}><AppText style={styles.title} weight="bold">{item.title}</AppText>{!item.isRead ? <View style={[styles.unread, {backgroundColor: colors.accent}]} /> : null}</View><AppText tone="muted" style={styles.body}>{item.body}</AppText><AppText tone="muted" style={styles.date}>{new Date(item.createdAt).toLocaleString()}</AppText></View>
    </AppCard>)}
    {items.length === 0 ? <EmptyState title="You're all caught up" message="New in-app notifications will appear here." /> : null}
  </ScrollView></SafeAreaView>;
}
const styles = StyleSheet.create({safe: {flex: 1}, page: {padding: 20, paddingBottom: 32}, count: {fontSize: 12, marginBottom: 13}, card: {flexDirection: 'row', padding: 14, marginBottom: 10}, icon: {width: 40, height: 40, borderRadius: 13, alignItems: 'center', justifyContent: 'center'}, content: {flex: 1, marginLeft: 12}, titleRow: {flexDirection: 'row', alignItems: 'center'}, title: {flex: 1}, unread: {width: 8, height: 8, borderRadius: 4}, body: {lineHeight: 19, marginTop: 5}, date: {fontSize: 10, marginTop: 7}});

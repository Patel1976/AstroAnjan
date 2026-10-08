import React from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {AppCard, AppHeader, AppText, EmptyState} from '../components';
import {useNotificationStore} from '../store/notifications/notificationStore';
import {NotificationItem} from '../types';
import {useThemeStore} from '../store/theme/themeStore';
import {darkColors, lightColors} from '../theme';
const icons: Record<NotificationItem['type'], string> = {consultation: '?', wallet: '?', astrology: '?', live: '?'};
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
      <View style={styles.cardTop}>
        <View style={[styles.icon, {backgroundColor: item.type === 'wallet' ? colors.warmSoft : colors.soft}]}>
          <AppText tone="accent" style={styles.iconText}>{icons[item.type]}</AppText>
        </View>
        <View style={styles.content}>
          <View style={styles.titleRow}>
            <AppText style={styles.title} weight="bold" numberOfLines={1}>{item.title}</AppText>
            {!item.isRead ? <View style={[styles.unreadDot, {backgroundColor: colors.accent}]} /> : null}
          </View>
          <AppText tone="muted" style={styles.body} numberOfLines={2}>{item.body}</AppText>
        </View>
      </View>
      <View style={[styles.footer, {borderTopColor: colors.border}]}>
        <View style={[styles.typePill, {backgroundColor: colors.soft, borderColor: colors.border}]}>
          <AppText style={[styles.typeText, {color: colors.primary}]} weight="bold">{item.type.toUpperCase()}</AppText>
        </View>
        <AppText tone="muted" style={styles.date}>{new Date(item.createdAt).toLocaleString()}</AppText>
      </View>
    </AppCard>)}
    {items.length === 0 ? <EmptyState title="You're all caught up" message="New in-app notifications will appear here." /> : null}
  </ScrollView></SafeAreaView>;
}
const styles = StyleSheet.create({safe: {flex: 1}, page: {paddingHorizontal: 20, paddingTop: 12, paddingBottom: 32, width: '100%', maxWidth: 760, alignSelf: 'center'}, count: {fontSize: 12, marginBottom: 13}, card: {padding: 14, marginBottom: 10}, cardTop: {flexDirection: 'row', alignItems: 'flex-start', gap: 12}, icon: {width: 42, height: 42, borderRadius: 14, alignItems: 'center', justifyContent: 'center', flexShrink: 0}, iconText: {fontSize: 18}, content: {flex: 1}, titleRow: {flexDirection: 'row', alignItems: 'center'}, title: {flex: 1, fontSize: 14}, unreadDot: {width: 8, height: 8, borderRadius: 4, marginLeft: 6}, body: {lineHeight: 19, marginTop: 4, fontSize: 13}, footer: {flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 12, paddingTop: 10, borderTopWidth: StyleSheet.hairlineWidth}, typePill: {borderRadius: 8, paddingHorizontal: 8, paddingVertical: 4, borderWidth: StyleSheet.hairlineWidth}, typeText: {fontSize: 9, letterSpacing: 0.4}, date: {fontSize: 10}});

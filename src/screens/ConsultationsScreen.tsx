import React, {useMemo, useState} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {SafeAreaView} from 'react-native-safe-area-context';
import {AppCard, AppHeader, AppText, Avatar, EmptyState} from '../components';
import {MainStackParamList} from '../navigation/types';
import {useConsultationStore} from '../store/consultations/consultationStore';
import {ConsultationStatus} from '../types';
import {useThemeStore} from '../store/theme/themeStore';
import {darkColors, lightColors} from '../theme';
const filters = ['all', 'pending', 'accepted', 'active', 'completed', 'cancelled'] as const;
export function ConsultationsScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<MainStackParamList>>();
  const consultations = useConsultationStore(state => state.consultations);
  const [filter, setFilter] = useState<(typeof filters)[number]>('all');
  const dark = useThemeStore(state => state.mode === 'dark'); const colors = dark ? darkColors : lightColors;
  const statusColors: Record<ConsultationStatus, string> = {pending: colors.statusPending, accepted: colors.statusAccepted, active: colors.statusActive, completed: colors.statusCompleted, cancelled: colors.statusCancelled};
  const list = useMemo(() => consultations.filter(item => filter === 'all' || item.status === filter), [consultations, filter]);
  return <SafeAreaView edges={['top']} style={[styles.safe, {backgroundColor: colors.background}]}><ScrollView contentContainerStyle={styles.page}>
    <AppHeader title="Consultations" />
    <AppText style={styles.heading} weight="bold">Your sessions</AppText><AppText tone="muted" style={styles.subtitle}>Requests, chats and past guidance in one place.</AppText>
    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filters}>{filters.map(item => <AppText key={item} onPress={() => setFilter(item)} style={[styles.filter, {backgroundColor: filter === item ? colors.primary : colors.surface, color: filter === item ? colors.onPrimary : colors.muted}]}>{item[0].toUpperCase() + item.slice(1)}</AppText>)}</ScrollView>
    {list.map(item => <AppCard key={item.id} style={styles.card} onPress={() => navigation.navigate('ConsultationDetails', {consultationId: item.id})}>
      <View style={styles.row}><Avatar name={item.astrologerName} size={50} /><View style={styles.info}><AppText weight="bold">{item.astrologerName}</AppText><AppText tone="muted" style={styles.specialty}>{item.specialty} · {item.mode}</AppText><AppText tone="muted" style={styles.date}>{new Date(item.createdAt).toLocaleDateString()}</AppText></View><AppText style={[styles.status, {color: statusColors[item.status], backgroundColor: colors.soft}]}>{item.status.toUpperCase()}</AppText></View>
      <View style={[styles.bottom, {borderColor: colors.border}]}><AppText tone="muted" style={styles.rate}>₹{item.pricePerMinute}/min</AppText><AppText tone="accent" weight="bold">View details  ›</AppText></View>
    </AppCard>)}
    {list.length === 0 ? <EmptyState title="No sessions here" message="Choose another filter or request a chat with an astrologer." /> : null}
  </ScrollView></SafeAreaView>;
}
const styles = StyleSheet.create({safe: {flex: 1}, page: {padding: 20, paddingBottom: 32}, heading: {fontSize: 24}, subtitle: {marginTop: 5}, filters: {gap: 8, paddingVertical: 16}, filter: {fontSize: 12, paddingVertical: 9, paddingHorizontal: 12, borderRadius: 12, overflow: 'hidden'}, card: {padding: 14, marginBottom: 11}, row: {flexDirection: 'row', alignItems: 'center'}, info: {marginLeft: 12, flex: 1}, specialty: {fontSize: 12, marginTop: 3}, date: {fontSize: 11, marginTop: 3}, status: {fontSize: 10, fontWeight: '700', padding: 7, borderRadius: 8, overflow: 'hidden'}, bottom: {borderTopWidth: StyleSheet.hairlineWidth, marginTop: 13, paddingTop: 11, flexDirection: 'row', justifyContent: 'space-between'}, rate: {fontSize: 12}});

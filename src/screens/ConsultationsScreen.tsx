import React, {useMemo, useState} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {SafeAreaView} from 'react-native-safe-area-context';
import {AppCard, AppHeader, AppText, Avatar, EmptyState, StatusBadge} from '../components';
import {MainStackParamList} from '../navigation/types';
import {useConsultationStore} from '../store/consultations/consultationStore';
import {useThemeStore} from '../store/theme/themeStore';
import {darkColors, lightColors} from '../theme';
const filters = ['all', 'pending', 'accepted', 'active', 'completed', 'cancelled'] as const;
export function ConsultationsScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<MainStackParamList>>();
  const consultations = useConsultationStore(state => state.consultations);
  const [filter, setFilter] = useState<(typeof filters)[number]>('all');
  const dark = useThemeStore(state => state.mode === 'dark'); const colors = dark ? darkColors : lightColors;
  const list = useMemo(() => consultations.filter(item => filter === 'all' || item.status === filter), [consultations, filter]);
  return <SafeAreaView edges={['top']} style={[styles.safe, {backgroundColor: colors.background}]}><ScrollView contentContainerStyle={styles.page}>
    <AppHeader title="Consultations" />
    <AppText variant="screenTitle" style={styles.heading} weight="bold">Your sessions</AppText><AppText tone="muted" style={styles.subtitle}>Requests, chats and past guidance in one place.</AppText>
    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filters}>{filters.map(item => <AppText key={item} onPress={() => setFilter(item)} style={[styles.filter, {backgroundColor: filter === item ? colors.primary : colors.surface, color: filter === item ? colors.onPrimary : colors.muted}]}>{item[0].toUpperCase() + item.slice(1)}</AppText>)}</ScrollView>
    {list.map(item => <AppCard key={item.id} style={styles.card} onPress={() => navigation.navigate('ConsultationDetails', {consultationId: item.id})}>
      <View style={styles.cardTop}>
        <View style={[styles.modePill, {backgroundColor: colors.soft, borderColor: colors.border}]}>
          <AppText style={[styles.modeText, {color: colors.primary}]} weight="bold">{item.mode.toUpperCase()}</AppText>
        </View>
        <StatusBadge status={item.status} />
      </View>
      <View style={styles.row}>
        <Avatar name={item.astrologerName} size={46} />
        <View style={styles.info}>
          <AppText weight="bold" style={styles.astroName}>{item.astrologerName}</AppText>
          <AppText tone="muted" style={styles.specialty}>{item.specialty}</AppText>
          <AppText tone="muted" style={styles.date}>{new Date(item.createdAt).toLocaleDateString()}</AppText>
        </View>
      </View>
      <View style={[styles.bottom, {borderColor: colors.border}]}>
        <View style={[styles.priceTag, {backgroundColor: colors.warmSoft}]}><AppText style={[styles.rate, {color: colors.accent}]} weight="bold">₹{item.pricePerMinute}<AppText tone="muted" style={styles.perMin}>/min</AppText></AppText></View>
        <AppText tone="accent" weight="bold">View details  ›</AppText>
      </View>
    </AppCard>)}
    {list.length === 0 ? <EmptyState title="No sessions here" message="Choose another filter or request a chat with an astrologer." /> : null}
  </ScrollView></SafeAreaView>;
}
const styles = StyleSheet.create({safe: {flex: 1}, page: {paddingHorizontal: 20, paddingTop: 12, paddingBottom: 32, width: '100%', maxWidth: 760, alignSelf: 'center'}, heading: {fontSize: 24}, subtitle: {marginTop: 5}, filters: {gap: 8, paddingVertical: 16}, filter: {fontSize: 12, paddingVertical: 9, paddingHorizontal: 12, borderRadius: 12, overflow: 'hidden'}, card: {padding: 15, marginBottom: 11}, cardTop: {flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14}, modePill: {flexDirection: 'row', alignItems: 'center', borderRadius: 10, paddingHorizontal: 9, paddingVertical: 6, borderWidth: StyleSheet.hairlineWidth}, modeText: {fontSize: 9, letterSpacing: 0.4}, row: {flexDirection: 'row', alignItems: 'center'}, info: {marginLeft: 12, flex: 1}, astroName: {fontSize: 16, fontWeight: '600'}, specialty: {fontSize: 12, marginTop: 3}, date: {fontSize: 11, marginTop: 3}, bottom: {borderTopWidth: StyleSheet.hairlineWidth, marginTop: 14, paddingTop: 12, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}, priceTag: {borderRadius: 10, paddingHorizontal: 10, paddingVertical: 6}, rate: {fontSize: 13}, perMin: {fontSize: 10, fontWeight: '400'}});

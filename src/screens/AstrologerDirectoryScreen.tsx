import React, {useMemo} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {SafeAreaView} from 'react-native-safe-area-context';
import {AppCard, AppHeader, AppInput, AppText, Avatar, EmptyState, RatingStars} from '../components';
import {MainStackParamList} from '../navigation/types';
import {useAstrologerStore} from '../store/astrologers/astrologerStore';
import {useThemeStore} from '../store/theme/themeStore';
import {darkColors, lightColors} from '../theme';
const specialties = ['All', 'Vedic Astrology', 'Tarot Reading', 'Numerology'];
const quickFilters = ['Any rating', 'Top rated', 'Under ₹30/min', '10+ years'];
export function AstrologerDirectoryScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<MainStackParamList>>();
  const {astrologers, query, onlineOnly, specialty, setQuery, setOnlineOnly, setSpecialty} = useAstrologerStore();
  const [quickFilter, setQuickFilter] = React.useState(quickFilters[0]);
  const dark = useThemeStore(state => state.mode === 'dark'); const colors = dark ? darkColors : lightColors;
  const filtered = useMemo(() => astrologers.filter(person =>
    (!onlineOnly || person.isOnline) &&
    (specialty === 'All' || person.specialty === specialty) &&
    (quickFilter !== 'Top rated' || person.rating >= 4.8) &&
    (quickFilter !== 'Under ₹30/min' || person.pricePerMinute < 30) &&
    (quickFilter !== '10+ years' || person.experienceYears >= 10) &&
    (person.name + ' ' + person.specialty + ' ' + person.languages.join(' ')).toLowerCase().includes(query.toLowerCase()),
  ).sort((a, b) => b.rating - a.rating), [astrologers, onlineOnly, query, quickFilter, specialty]);
  return <SafeAreaView edges={['top']} style={[styles.safe, {backgroundColor: colors.background}]}><ScrollView contentContainerStyle={styles.page}>
    <AppHeader title="Find an astrologer" />
    <AppText style={styles.heading} weight="bold">Guidance that feels personal</AppText>
    <AppInput value={query} onChangeText={setQuery} placeholder="Search by name, skill or language" style={styles.search} />
    <View style={styles.onlineRow}><AppText weight="bold">Available now</AppText><AppText onPress={() => setOnlineOnly(!onlineOnly)} style={[styles.toggle, {backgroundColor: onlineOnly ? colors.primary : colors.soft, color: onlineOnly ? '#FFFFFF' : colors.primary}]}>{onlineOnly ? 'On' : 'Show online'}</AppText></View>
    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filters}>{specialties.map(item => <AppText key={item} onPress={() => setSpecialty(item)} style={[styles.filter, {backgroundColor: specialty === item ? colors.primary : colors.surface, color: specialty === item ? '#FFFFFF' : colors.muted}]}>{item}</AppText>)}</ScrollView>
    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filters}>{quickFilters.map(item => <AppText key={item} onPress={() => setQuickFilter(item)} style={[styles.filter, {backgroundColor: quickFilter === item ? colors.soft : colors.surface, color: quickFilter === item ? colors.primary : colors.muted}]}>{item}</AppText>)}</ScrollView>
    <AppText tone="muted" style={styles.count}>{filtered.length} astrologers to explore</AppText>
    {filtered.map(person => <AppCard key={person.id} style={styles.card} onPress={() => navigation.navigate('AstrologerProfile', {astrologerId: person.id})}>
      <View style={styles.top}><View style={styles.identity}><Avatar name={person.name} size={58} color={person.avatarColor} /><View style={styles.bio}><View style={styles.nameRow}><AppText style={styles.name} weight="bold">{person.name}</AppText><View style={[styles.dot, {backgroundColor: person.isOnline ? colors.success : colors.muted}]} /></View><AppText tone="muted" style={styles.specialty}>{person.specialty}</AppText><RatingStars rating={person.rating} /></View></View></View>
      <AppText tone="muted" style={styles.details}>{person.experienceYears} years experience · {person.languages.join(', ')}</AppText>
      <View style={styles.bottom}><AppText tone="muted" style={styles.price}>₹{person.pricePerMinute}/min</AppText><AppText tone="accent" weight="bold">{person.isOnline ? 'Chat now  ›' : 'View profile  ›'}</AppText></View>
    </AppCard>)}
    {filtered.length === 0 ? <EmptyState title="No astrologers found" message="Try a different name or filter." /> : null}
  </ScrollView></SafeAreaView>;
}
const styles = StyleSheet.create({safe: {flex: 1}, page: {padding: 20, paddingBottom: 30}, heading: {fontSize: 23, marginTop: 2}, search: {marginTop: 18}, onlineRow: {flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 18}, toggle: {paddingHorizontal: 14, paddingVertical: 8, borderRadius: 12, overflow: 'hidden', fontSize: 12, fontWeight: '700'}, filters: {gap: 8, paddingVertical: 14}, filter: {fontSize: 12, paddingVertical: 9, paddingHorizontal: 12, borderRadius: 12, overflow: 'hidden'}, count: {fontSize: 12, marginBottom: 10}, card: {marginBottom: 12, padding: 15}, top: {flexDirection: 'row'}, identity: {flexDirection: 'row', alignItems: 'center', flex: 1}, bio: {marginLeft: 12, flex: 1}, nameRow: {flexDirection: 'row', alignItems: 'center'}, name: {fontSize: 16, marginRight: 7}, dot: {width: 8, height: 8, borderRadius: 4}, specialty: {fontSize: 12, marginTop: 3, marginBottom: 5}, details: {fontSize: 12, marginTop: 13}, bottom: {flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 14, paddingTop: 11, borderTopWidth: StyleSheet.hairlineWidth, borderColor: '#E9E2EA'}, price: {fontSize: 13, fontWeight: '600'}});

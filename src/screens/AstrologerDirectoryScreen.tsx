import React, {useMemo} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {SafeAreaView} from 'react-native-safe-area-context';
import {AppCard, AppHeader, AppText, Avatar, EmptyState, RatingStars, SearchBar} from '../components';
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
    <AppText variant="screenTitle" style={styles.heading} weight="bold">Guidance that feels personal</AppText>
    <SearchBar value={query} onChangeText={setQuery} placeholder="Search by name, skill or language" style={styles.search} />
    <View style={styles.onlineRow}><AppText weight="bold">Available now</AppText><AppText onPress={() => setOnlineOnly(!onlineOnly)} style={[styles.toggle, {backgroundColor: onlineOnly ? colors.primary : colors.soft, color: onlineOnly ? colors.onPrimary : colors.primary}]}>{onlineOnly ? 'On' : 'Show online'}</AppText></View>
    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filters}>{specialties.map(item => <AppText key={item} onPress={() => setSpecialty(item)} style={[styles.filter, {backgroundColor: specialty === item ? colors.primary : colors.surface, color: specialty === item ? colors.onPrimary : colors.muted}]}>{item}</AppText>)}</ScrollView>
    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filters}>{quickFilters.map(item => <AppText key={item} onPress={() => setQuickFilter(item)} style={[styles.filter, {backgroundColor: quickFilter === item ? colors.soft : colors.surface, color: quickFilter === item ? colors.primary : colors.muted}]}>{item}</AppText>)}</ScrollView>
    <AppText tone="muted" style={styles.count}>{filtered.length} astrologers to explore</AppText>
    {filtered.map(person => <AppCard key={person.id} style={styles.card} onPress={() => navigation.navigate('AstrologerProfile', {astrologerId: person.id})}>
      <View style={styles.cardTop}>
        <View style={[styles.onlinePill, {backgroundColor: person.isOnline ? colors.soft : colors.surface, borderColor: colors.border}]}>
          <View style={[styles.dot, {backgroundColor: person.isOnline ? colors.success : colors.muted}]} />
          <AppText style={[styles.onlineText, {color: person.isOnline ? colors.success : colors.muted}]} weight="bold">{person.isOnline ? 'ONLINE NOW' : 'OFFLINE'}</AppText>
        </View>
        <View style={styles.ratingRow}><AppText style={{color: colors.accent}}>★</AppText><AppText style={styles.ratingText} weight="bold">{person.rating.toFixed(1)}</AppText></View>
      </View>
      <View style={styles.identity}>
        <Avatar name={person.name} size={46} color={person.avatarColor} />
        <View style={styles.bio}>
          <AppText style={styles.name} weight="bold">{person.name}</AppText>
          <AppText tone="muted" style={styles.specialty}>{person.specialty}</AppText>
          <AppText tone="muted" style={styles.details}>{person.experienceYears} yrs · {person.languages.join(', ')}</AppText>
        </View>
      </View>
      <View style={[styles.bottom, {borderColor: colors.border}]}>
        <View style={[styles.priceTag, {backgroundColor: colors.warmSoft}]}><AppText style={[styles.price, {color: colors.accent}]} weight="bold">₹{person.pricePerMinute}<AppText tone="muted" style={styles.perMin}>/min</AppText></AppText></View>
        <AppText tone="accent" weight="bold">{person.isOnline ? 'Chat now  ›' : 'View profile  ›'}</AppText>
      </View>
    </AppCard>)}
    {filtered.length === 0 ? <EmptyState title="No astrologers found" message="Try a different name or filter." /> : null}
  </ScrollView></SafeAreaView>;
}
const styles = StyleSheet.create({safe: {flex: 1}, page: {paddingHorizontal: 20, paddingTop: 12, paddingBottom: 30, width: '100%', maxWidth: 760, alignSelf: 'center'}, heading: {fontSize: 23, marginTop: 2}, search: {marginTop: 18}, onlineRow: {flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 18}, toggle: {paddingHorizontal: 14, paddingVertical: 8, borderRadius: 12, overflow: 'hidden', fontSize: 12, fontWeight: '700'}, filters: {gap: 8, paddingVertical: 14}, filter: {fontSize: 12, paddingVertical: 9, paddingHorizontal: 12, borderRadius: 12, overflow: 'hidden'}, count: {fontSize: 12, marginBottom: 10}, card: {marginBottom: 12, padding: 15}, cardTop: {flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14}, onlinePill: {flexDirection: 'row', alignItems: 'center', gap: 6, borderRadius: 10, paddingHorizontal: 9, paddingVertical: 6, borderWidth: StyleSheet.hairlineWidth}, onlineText: {fontSize: 9, letterSpacing: 0.4}, ratingRow: {flexDirection: 'row', alignItems: 'center', gap: 4}, ratingText: {fontSize: 12}, identity: {flexDirection: 'row', alignItems: 'center'}, bio: {marginLeft: 12, flex: 1}, name: {fontSize: 16, fontWeight: '600'}, dot: {width: 7, height: 7, borderRadius: 4}, specialty: {fontSize: 12, marginTop: 3}, details: {fontSize: 11, marginTop: 3}, bottom: {flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 14, paddingTop: 12, borderTopWidth: StyleSheet.hairlineWidth}, priceTag: {borderRadius: 10, paddingHorizontal: 10, paddingVertical: 6}, price: {fontSize: 13}, perMin: {fontSize: 10, fontWeight: '400'}});

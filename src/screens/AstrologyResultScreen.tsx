import React, {useState} from 'react';
import {Alert, ScrollView, StyleSheet, View} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {SafeAreaView} from 'react-native-safe-area-context';
import {AppButton, AppCard, AppHeader, AppText, EmptyState, ErrorState, LoadingState} from '../components';
import {MainStackParamList} from '../navigation/types';
import {useAstrologyStore} from '../store/astrology/astrologyStore';
import {useProfileStore} from '../store/profile/profileStore';
import {useThemeStore} from '../store/theme/themeStore';
import {darkColors, lightColors} from '../theme';
type Props = NativeStackScreenProps<MainStackParamList, 'AstrologyResult'>;
export function AstrologyResultScreen({route, navigation}: Props) {
  const result = useAstrologyStore(state => state.results[route.params.toolId]);
  const status = useAstrologyStore(state => state.status);
  const error = useAstrologyStore(state => state.error);
  const profile = useProfileStore(state => state.profile);
  const [tab, setTab] = useState('Overview');
  const dark = useThemeStore(state => state.mode === 'dark'); const colors = dark ? darkColors : lightColors;
  if (!result) return <SafeAreaView edges={['top']} style={[styles.safe, {backgroundColor: colors.background}]}><AppHeader title="Reading" />{status === 'loading' ? <LoadingState message="Preparing your demo reading…" /> : status === 'error' ? <ErrorState message={error ?? 'Try generating the reading again.'} onRetry={() => navigation.navigate('ToolInput', {toolId: route.params.toolId})} /> : <EmptyState title="No reading yet" message="Generate a demo reading to see your result here." />}</SafeAreaView>;
  const kundli = route.params.toolId === 'kundli';
  const sections = kundli ? (tab === 'Planets' ? [{title: 'Sun', body: 'Leo · 10th house · confident expression'}, {title: 'Moon', body: 'Taurus · 7th house · steady emotions'}, {title: 'Mercury', body: 'Virgo · 11th house · thoughtful communication'}] : tab === 'Houses' ? [{title: '1st house', body: 'Identity, approach, and first impressions.'}, {title: '7th house', body: 'Partnership, collaboration, and balance.'}, {title: '10th house', body: 'Career direction and public contribution.'}] : result.sections) : result.sections;
  return <SafeAreaView edges={['top']} style={[styles.safe, {backgroundColor: colors.background}]}><ScrollView contentContainerStyle={styles.page}>
    <AppHeader title={kundli ? 'Kundli report' : result.title} />
    <View style={styles.kicker}><AppText tone="accent" weight="bold">{kundli ? 'SAMPLE BIRTH CHART' : 'YOUR DEMO READING'}</AppText></View>
    <AppText style={styles.heading} weight="bold">{kundli ? profile.name + "'s Kundli" : result.title}</AppText><AppText tone="muted" style={styles.subtitle}>{result.subtitle}</AppText>
    {kundli ? <><View style={styles.tabs}>{['Overview', 'Planets', 'Houses'].map(item => <AppText key={item} onPress={() => setTab(item)} style={[styles.tab, {backgroundColor: tab === item ? colors.primary : colors.surface, color: tab === item ? '#FFFFFF' : colors.muted}]}>{item}</AppText>)}</View>{tab === 'Overview' ? <AppCard style={styles.chart}><AppText style={styles.chartTitle} weight="bold">North Indian chart · Sample</AppText><View style={styles.chartGrid}>{['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'].map((house, index) => <View key={house} style={[styles.chartCell, {borderColor: colors.border}]}><AppText tone="muted">{house}</AppText><AppText tone="accent" style={styles.planet}>{['Su', 'Mo', 'Ma', 'Me'][index % 4]}</AppText></View>)}</View></AppCard> : null}</> : null}
    <AppCard style={styles.summary}><AppText tone="accent" weight="bold">OVERVIEW</AppText><AppText style={styles.summaryText}>{result.summary}</AppText></AppCard>
    {sections.map(section => <AppCard key={section.title} style={styles.section}><AppText style={styles.sectionTitle} weight="bold">{section.title}</AppText><AppText tone="muted" style={styles.sectionBody}>{section.body}</AppText></AppCard>)}
    {kundli ? <View style={styles.download}><AppButton title="Download report" secondary onPress={() => Alert.alert('Report preview', 'PDF download will be added when a report service is connected.')} /></View> : null}
    <AppText tone="muted" style={styles.disclaimer}>For reflection only. This is mock content and not an astrological calculation.</AppText>
  </ScrollView></SafeAreaView>;
}
const styles = StyleSheet.create({safe: {flex: 1}, page: {padding: 20, paddingBottom: 35}, kicker: {marginTop: 4}, heading: {fontSize: 25, marginTop: 8}, subtitle: {marginTop: 5}, tabs: {flexDirection: 'row', gap: 8, marginTop: 18, marginBottom: 8}, tab: {paddingHorizontal: 16, paddingVertical: 10, borderRadius: 14, overflow: 'hidden', fontWeight: '600', fontSize: 13}, chart: {marginTop: 10}, chartTitle: {marginBottom: 14}, chartGrid: {flexDirection: 'row', flexWrap: 'wrap'}, chartCell: {width: '25%', height: 62, borderWidth: 0.5, alignItems: 'center', justifyContent: 'center'}, planet: {fontSize: 12, marginTop: 3}, summary: {marginTop: 14, backgroundColor: '#34213F', borderColor: '#34213F'}, summaryText: {color: '#FFFFFF', fontSize: 17, lineHeight: 25, marginTop: 10}, section: {marginTop: 10}, sectionTitle: {fontSize: 16}, sectionBody: {lineHeight: 21, marginTop: 6}, download: {marginTop: 16}, disclaimer: {textAlign: 'center', fontSize: 12, marginTop: 18, lineHeight: 18}});

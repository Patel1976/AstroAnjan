import React, {useMemo, useState} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useNavigation} from '@react-navigation/native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {AppCard, AppHeader, AppText, SearchBar} from '../components';
import {astrologyTools} from '../mock/astrology';
import {MainStackParamList} from '../navigation/types';
import {useThemeStore} from '../store/theme/themeStore';
import {darkColors, lightColors} from '../theme';
const categories = ['All', 'Vedic', 'Horoscope', 'Self discovery', 'Compatibility'] as const;
export function ToolsScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<MainStackParamList>>();
  const [category, setCategory] = useState<(typeof categories)[number]>('All');
  const [query, setQuery] = useState('');
  const dark = useThemeStore(state => state.mode === 'dark'); const colors = dark ? darkColors : lightColors;
  const tools = useMemo(() => astrologyTools.filter(tool =>
    (category === 'All' || tool.category === category) &&
    (tool.title + ' ' + tool.subtitle).toLowerCase().includes(query.toLowerCase()),
  ), [category, query]);
  return <SafeAreaView edges={['top']} style={[styles.safe, {backgroundColor: colors.background}]}><ScrollView contentContainerStyle={styles.page}>
    <AppHeader title="Astrology" />
    <AppText variant="screenTitle" style={styles.heading} weight="bold">Explore your cosmic toolkit</AppText>
    <AppText style={styles.subtitle} tone="muted">Thoughtful readings for every part of your journey.</AppText>
    <SearchBar value={query} onChangeText={setQuery} placeholder="Search astrology tools" style={styles.search} />
    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.chips}>{categories.map(item => <AppText key={item} onPress={() => setCategory(item)} style={[styles.chip, {backgroundColor: category === item ? colors.primary : colors.surface, color: category === item ? colors.onPrimary : colors.muted}]}>{item}</AppText>)}</ScrollView>
    <View style={styles.grid}>{tools.map((tool, index) => <AppCard key={tool.id} onPress={() => navigation.navigate('ToolInput', {toolId: tool.id})} style={styles.tool}>
      <View style={styles.toolTop}><View style={[styles.icon, {backgroundColor: index % 2 ? colors.soft : colors.warmSoft}]}><AppText style={styles.symbol} tone="accent">{tool.symbol}</AppText></View><AppText tone="muted" style={styles.toolArrow}>↗</AppText></View>
      <AppText weight="bold" numberOfLines={1} style={styles.toolTitle}>{tool.title}</AppText><AppText tone="muted" style={styles.description} numberOfLines={2}>{tool.subtitle}</AppText>
    </AppCard>)}</View>
    {tools.length === 0 ? <AppText tone="muted" style={styles.empty}>No tools match your search.</AppText> : null}
  </ScrollView></SafeAreaView>;
}
const styles = StyleSheet.create({safe: {flex: 1}, page: {paddingHorizontal: 20, paddingTop: 12, paddingBottom: 34, width: '100%', maxWidth: 760, alignSelf: 'center'}, heading: {fontSize: 24, marginTop: 4}, subtitle: {marginTop: 6}, search: {marginTop: 20}, chips: {gap: 8, paddingVertical: 16}, chip: {paddingHorizontal: 15, paddingVertical: 10, borderRadius: 14, overflow: 'hidden', fontSize: 13, fontWeight: '600'}, grid: {flexDirection: 'row', flexWrap: 'wrap', gap: 12}, tool: {width: '48%', padding: 13, borderRadius: 18, elevation: 0, shadowOpacity: 0, borderWidth: 1}, toolTop: {flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 11}, icon: {width: 38, height: 38, borderRadius: 13, alignItems: 'center', justifyContent: 'center'}, symbol: {fontSize: 20}, toolArrow: {fontSize: 17}, toolTitle: {fontSize: 14}, description: {fontSize: 12, lineHeight: 17, marginTop: 4}, empty: {textAlign: 'center', marginTop: 35}});

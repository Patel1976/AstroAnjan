import React, {useMemo, useState} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useNavigation} from '@react-navigation/native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {AppCard, AppHeader, AppInput, AppText} from '../components';
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
    <AppText style={styles.heading} weight="bold">Explore your cosmic toolkit</AppText>
    <AppText style={styles.subtitle} tone="muted">Thoughtful readings for every part of your journey.</AppText>
    <AppInput value={query} onChangeText={setQuery} placeholder="Search astrology tools" style={styles.search} />
    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.chips}>{categories.map(item => <AppText key={item} onPress={() => setCategory(item)} style={[styles.chip, {backgroundColor: category === item ? colors.primary : colors.surface, color: category === item ? '#FFFFFF' : colors.muted}]}>{item}</AppText>)}</ScrollView>
    <View style={styles.grid}>{tools.map((tool, index) => <AppCard key={tool.id} onPress={() => navigation.navigate('ToolInput', {toolId: tool.id})} style={styles.tool}>
      <View style={[styles.icon, {backgroundColor: index % 2 ? colors.soft : '#F7EEDD'}]}><AppText style={styles.symbol} tone="accent">{tool.symbol}</AppText></View>
      <AppText weight="bold">{tool.title}</AppText><AppText tone="muted" style={styles.description}>{tool.subtitle}</AppText>
    </AppCard>)}</View>
    {tools.length === 0 ? <AppText tone="muted" style={styles.empty}>No tools match your search.</AppText> : null}
  </ScrollView></SafeAreaView>;
}
const styles = StyleSheet.create({safe: {flex: 1}, page: {padding: 20, paddingBottom: 34}, heading: {fontSize: 24, marginTop: 4}, subtitle: {marginTop: 6}, search: {marginTop: 20}, chips: {gap: 8, paddingVertical: 16}, chip: {paddingHorizontal: 15, paddingVertical: 10, borderRadius: 14, overflow: 'hidden', fontSize: 13, fontWeight: '600'}, grid: {flexDirection: 'row', flexWrap: 'wrap', gap: 12}, tool: {width: '48%', minHeight: 145, padding: 14}, icon: {width: 42, height: 42, borderRadius: 14, alignItems: 'center', justifyContent: 'center', marginBottom: 12}, symbol: {fontSize: 21}, description: {fontSize: 12, marginTop: 4}, empty: {textAlign: 'center', marginTop: 35}});

import React, {useMemo, useState} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {SafeAreaView} from 'react-native-safe-area-context';
import {AppCard, AppHeader, AppInput, AppText} from '../components';
import {mockLocations} from '../mock/users';
import {MainStackParamList} from '../navigation/types';
import {useProfileStore} from '../store/profile/profileStore';
import {Location} from '../types';
import {useThemeStore} from '../store/theme/themeStore';
import {darkColors, lightColors} from '../theme';
export function LocationPickerScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<MainStackParamList>>();
  const setBirthLocation = useProfileStore(state => state.setBirthLocation);
  const [query, setQuery] = useState('');
  const dark = useThemeStore(state => state.mode === 'dark');
  const colors = dark ? darkColors : lightColors;
  const locations = useMemo(() => mockLocations.filter(location => (location.city + ' ' + location.region).toLowerCase().includes(query.toLowerCase())), [query]);
  const select = (location: Location) => {setBirthLocation(location); navigation.goBack();};
  return <SafeAreaView edges={['top']} style={[styles.safe, {backgroundColor: colors.background}]}><ScrollView contentContainerStyle={styles.page}>
    <AppHeader title="Birth location" /><AppText tone="muted" style={styles.intro}>Search a city or choose one of the suggested locations.</AppText>
    <AppInput value={query} onChangeText={setQuery} placeholder="Search city" />
    <View style={styles.results}>{locations.map(location => <AppCard key={location.id} style={styles.item} onPress={() => select(location)}><View style={[styles.pin, {backgroundColor: colors.warmSoft}]}><AppText tone="accent">⌖</AppText></View><View style={styles.detail}><AppText weight="bold">{location.city}</AppText><AppText tone="muted" style={styles.region}>{location.region}, {location.country}</AppText><AppText tone="muted" style={styles.region}>{location.latitude}, {location.longitude} · {location.timeZone}</AppText></View></AppCard>)}</View>
    {locations.length === 0 ? <AppText tone="muted" style={styles.empty}>No matching mock locations. Try another city.</AppText> : null}
  </ScrollView></SafeAreaView>;
}
const styles = StyleSheet.create({safe: {flex: 1}, page: {padding: 20}, intro: {lineHeight: 21, marginBottom: 18}, results: {marginTop: 16, gap: 10}, item: {flexDirection: 'row', alignItems: 'center', padding: 15}, pin: {width: 40, height: 40, borderRadius: 13, alignItems: 'center', justifyContent: 'center', }, detail: {marginLeft: 12, flex: 1}, region: {fontSize: 12, marginTop: 3}, empty: {textAlign: 'center', marginTop: 35}});

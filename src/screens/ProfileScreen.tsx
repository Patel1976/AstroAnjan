import React from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useNavigation} from '@react-navigation/native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {AppCard, AppHeader, AppText, Avatar} from '../components';
import {useAuthStore} from '../store/auth/authStore';
import {useProfileStore} from '../store/profile/profileStore';
import {MainStackParamList} from '../navigation/types';
import {useThemeStore} from '../store/theme/themeStore';
import {darkColors, lightColors} from '../theme';
export function ProfileScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<MainStackParamList>>();
  const profile = useProfileStore(state => state.profile);
  const logout = useAuthStore(state => state.logout);
  const toggleTheme = useThemeStore(state => state.toggle);
  const dark = useThemeStore(state => state.mode === 'dark');
  const colors = dark ? darkColors : lightColors;
  const rows = [
    {label: 'Edit personal details', icon: '✎', action: () => navigation.navigate('EditProfile')},
    {label: 'Birth details', icon: '☼', action: () => navigation.navigate('BirthDetails')},
    {label: 'My wallet', icon: '₹', action: () => navigation.navigate('Wallet')},
    {label: 'Notifications', icon: '♧', action: () => navigation.navigate('Notifications')},
    {label: 'Reviews', icon: '★', action: () => navigation.navigate('Reviews')},
    {label: 'Live sessions', icon: '◉', action: () => navigation.navigate('LiveSessions')},
    {label: dark ? 'Switch to light theme' : 'Switch to dark theme', icon: '◐', action: toggleTheme},
  ];
  return <SafeAreaView edges={['top']} style={[styles.safe, {backgroundColor: colors.background}]}><ScrollView contentContainerStyle={styles.page}>
    <AppHeader title="My profile" right={<AppText onPress={logout} tone="accent" weight="bold">Log out</AppText>} showBack={false} />
    <AppCard style={styles.profile}><Avatar name={profile.name} uri={profile.imageUri} size={70} /><View style={styles.identity}><AppText style={styles.name} weight="bold">{profile.name}</AppText><AppText tone="muted" style={styles.email}>{profile.email}</AppText><AppText tone="muted">{profile.phone}</AppText></View></AppCard>
    <AppText style={styles.section} weight="bold">YOUR ACCOUNT</AppText>
    {rows.map(row => <AppCard key={row.label} style={styles.row} onPress={row.action}><AppText style={styles.rowIcon} tone="accent">{row.icon}</AppText><AppText style={styles.rowLabel}>{row.label}</AppText><AppText style={styles.chevron} tone="muted">›</AppText></AppCard>)}
    <AppText style={styles.version} tone="muted">Astro Anjan · Demo account</AppText>
  </ScrollView></SafeAreaView>;
}
const styles = StyleSheet.create({safe: {flex: 1}, page: {padding: 20, paddingBottom: 32}, profile: {flexDirection: 'row', alignItems: 'center', padding: 20}, identity: {marginLeft: 16, flex: 1}, name: {fontSize: 20}, email: {marginTop: 5, marginBottom: 3}, section: {fontSize: 12, letterSpacing: 1, marginTop: 28, marginBottom: 12}, row: {flexDirection: 'row', alignItems: 'center', padding: 15, marginBottom: 9}, rowIcon: {fontSize: 20, width: 35}, rowLabel: {flex: 1, fontWeight: '600'}, chevron: {fontSize: 26}, version: {textAlign: 'center', marginTop: 22, fontSize: 12}});

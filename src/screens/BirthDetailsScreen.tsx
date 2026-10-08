import React from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useNavigation} from '@react-navigation/native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {AppButton, AppCard, AppHeader, AppInput, AppText} from '../components';
import {MainStackParamList} from '../navigation/types';
import {useProfileStore} from '../store/profile/profileStore';
import {useThemeStore} from '../store/theme/themeStore';
import {darkColors, lightColors} from '../theme';
export function BirthDetailsScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<MainStackParamList>>();
  const profile = useProfileStore(state => state.profile);
  const updateProfile = useProfileStore(state => state.updateProfile);
  const dark = useThemeStore(state => state.mode === 'dark');
  const colors = dark ? darkColors : lightColors;
  return <SafeAreaView edges={['top']} style={[styles.safe, {backgroundColor: colors.background}]}><ScrollView contentContainerStyle={styles.page}>
    <AppHeader title="Birth details" />
    <AppText tone="muted" style={styles.intro}>Your birth information helps personalize your astrology experience.</AppText>
    <AppText style={styles.label} weight="bold">Date of birth</AppText><AppInput value={profile.dateOfBirth ?? ''} onChangeText={dateOfBirth => updateProfile({dateOfBirth})} placeholder="YYYY-MM-DD" />
    <AppText style={styles.label} weight="bold">Time of birth</AppText><AppInput value={profile.timeOfBirth ?? ''} onChangeText={timeOfBirth => updateProfile({timeOfBirth})} placeholder="HH:MM (24-hour)" />
    <AppText style={styles.label} weight="bold">Birth location</AppText>
    <AppCard style={styles.location} onPress={() => navigation.navigate('LocationPicker')}>
      <View style={[styles.locationIcon, {backgroundColor: colors.warmSoft}]}><AppText style={{color: colors.accent}} weight="bold">⌖</AppText></View>
      <View style={styles.locationText}>
        <AppText weight="bold">{profile.birthLocation || 'Select a location'}</AppText>
        <AppText tone="muted" style={styles.coordinates}>{profile.latitude ?? '—'}, {profile.longitude ?? '—'} · {profile.timeZone ?? 'Time zone'}</AppText>
      </View>
      <AppText tone="accent" style={styles.chevron}>›</AppText>
    </AppCard>
    <View style={styles.note}><AppText tone="muted" style={styles.noteText}>Birth details are stored only in this app for the current demo.</AppText></View>
    <AppButton title="Save birth details" onPress={() => navigation.goBack()} />
  </ScrollView></SafeAreaView>;
}
const styles = StyleSheet.create({safe: {flex: 1}, page: {paddingHorizontal: 20, paddingTop: 12, paddingBottom: 32, width: '100%', maxWidth: 760, alignSelf: 'center'}, intro: {lineHeight: 21, marginBottom: 4}, label: {marginTop: 20, marginBottom: 8}, location: {flexDirection: 'row', alignItems: 'center', gap: 12, padding: 14}, locationIcon: {width: 42, height: 42, borderRadius: 14, alignItems: 'center', justifyContent: 'center'}, locationText: {flex: 1}, coordinates: {fontSize: 12, marginTop: 4}, chevron: {fontSize: 26}, note: {marginVertical: 22}, noteText: {lineHeight: 20}});

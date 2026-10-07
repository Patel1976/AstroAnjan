import React, {useState} from 'react';
import {ActivityIndicator, Alert, ScrollView, StyleSheet, View} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {SafeAreaView} from 'react-native-safe-area-context';
import {AppButton, AppHeader, AppInput, AppText} from '../components';
import {astrologyTools} from '../mock/astrology';
import {MainStackParamList} from '../navigation/types';
import {useAstrologyStore} from '../store/astrology/astrologyStore';
import {useProfileStore} from '../store/profile/profileStore';
import {useThemeStore} from '../store/theme/themeStore';
import {darkColors, lightColors} from '../theme';
type Props = NativeStackScreenProps<MainStackParamList, 'ToolInput'>;
export function ToolInputScreen({route, navigation}: Props) {
  const tool = astrologyTools.find(item => item.id === route.params.toolId) ?? astrologyTools[0];
  const profile = useProfileStore(state => state.profile);
  const generate = useAstrologyStore(state => state.generate);
  const [name, setName] = useState(profile.name);
  const [date, setDate] = useState(profile.dateOfBirth ?? '');
  const [time, setTime] = useState(profile.timeOfBirth ?? '');
  const [place, setPlace] = useState(profile.birthLocation ?? '');
  const [partner, setPartner] = useState('');
  const [busy, setBusy] = useState(false);
  const dark = useThemeStore(state => state.mode === 'dark'); const colors = dark ? darkColors : lightColors;
  const usesBirth = ['kundli', 'personal', 'gochar', 'western', 'yogas', 'compatibility'].includes(tool.id);
  const create = () => {
    if (!name.trim()) {Alert.alert('Name required', 'Enter a name to personalize this demo result.'); return;}
    setBusy(true);
    setTimeout(() => {generate(tool.id, name.trim()); setBusy(false); navigation.navigate(tool.id === 'kundli' ? 'AstrologyResult' : 'AstrologyResult', {toolId: tool.id});}, 350);
  };
  return <SafeAreaView edges={['top']} style={[styles.safe, {backgroundColor: colors.background}]}><ScrollView contentContainerStyle={styles.page} keyboardShouldPersistTaps="handled">
    <AppHeader title={tool.title} />
    <View style={[styles.introIcon, {backgroundColor: colors.warmSoft}]}><AppText style={styles.symbol} tone="accent">{tool.symbol}</AppText></View>
    <AppText style={styles.heading} weight="bold">Personalize your reading</AppText>
    <AppText tone="muted" style={styles.subtitle}>This local demo uses sample guidance and does not calculate an actual chart.</AppText>
    <AppText style={styles.label} weight="bold">{tool.id === 'compatibility' ? 'Your name' : 'Name'}</AppText><AppInput value={name} onChangeText={setName} placeholder="Enter a name" />
    {usesBirth ? <>
      <AppText style={styles.label} weight="bold">Date of birth</AppText><AppInput value={date} onChangeText={setDate} placeholder="YYYY-MM-DD" />
      {['kundli', 'personal', 'gochar', 'western', 'yogas'].includes(tool.id) ? <><AppText style={styles.label} weight="bold">Time of birth</AppText><AppInput value={time} onChangeText={setTime} placeholder="HH:MM (24-hour)" /><AppText style={styles.label} weight="bold">Birth location</AppText><AppInput value={place} onChangeText={setPlace} placeholder="City, region" /></> : null}
      {tool.id === 'compatibility' ? <><AppText style={styles.label} weight="bold">Partner name (optional)</AppText><AppInput value={partner} onChangeText={setPartner} placeholder="Partner name" /></> : null}
    </> : null}
    {['tarot', 'palm'].includes(tool.id) ? <><AppText style={styles.label} weight="bold">What would you like to reflect on?</AppText><AppInput placeholder="Ask a question (optional)" /></> : null}
    <View style={styles.note}><AppText tone="muted" style={styles.noteText}>Results are illustrative mock content for the app prototype.</AppText></View>
    {busy ? <ActivityIndicator color={colors.accent} style={styles.loader} /> : <AppButton title="Generate demo reading" onPress={create} />}
  </ScrollView></SafeAreaView>;
}
const styles = StyleSheet.create({safe: {flex: 1}, page: {padding: 20, paddingBottom: 34}, introIcon: {width: 54, height: 54, borderRadius: 18, alignItems: 'center', justifyContent: 'center', marginTop: 4}, symbol: {fontSize: 26}, heading: {fontSize: 23, marginTop: 18}, subtitle: {lineHeight: 21, marginTop: 7}, label: {marginTop: 18, marginBottom: 7}, note: {marginTop: 20, marginBottom: 18}, noteText: {fontSize: 12, lineHeight: 19}, loader: {marginVertical: 18}});

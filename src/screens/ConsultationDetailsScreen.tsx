import React from 'react';
import {Alert, ScrollView, StyleSheet, View} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {SafeAreaView} from 'react-native-safe-area-context';
import {AppButton, AppCard, AppHeader, AppText, Avatar, EmptyState} from '../components';
import {MainStackParamList} from '../navigation/types';
import {useConsultationStore} from '../store/consultations/consultationStore';
import {useThemeStore} from '../store/theme/themeStore';
import {darkColors, lightColors} from '../theme';
type Props = NativeStackScreenProps<MainStackParamList, 'ConsultationDetails'>;
export function ConsultationDetailsScreen({route, navigation}: Props) {
  const consultation = useConsultationStore(state => state.getById(route.params.consultationId));
  const updateStatus = useConsultationStore(state => state.updateStatus);
  const dark = useThemeStore(state => state.mode === 'dark'); const colors = dark ? darkColors : lightColors;
  if (!consultation) return <SafeAreaView edges={['top']} style={[styles.safe, {backgroundColor: colors.background}]}><AppHeader title="Session details" /><EmptyState title="Session not found" message="This consultation is not available." /></SafeAreaView>;
  const start = () => {updateStatus(consultation.id, 'active'); navigation.navigate('ConsultationChat', {consultationId: consultation.id});};
  const cancel = () => Alert.alert('Cancel request?', 'This demo session will be marked cancelled.', [{text: 'Keep request', style: 'cancel'}, {text: 'Cancel session', style: 'destructive', onPress: () => updateStatus(consultation.id, 'cancelled')}]);
  return <SafeAreaView edges={['top']} style={[styles.safe, {backgroundColor: colors.background}]}><ScrollView contentContainerStyle={styles.page}>
    <AppHeader title="Session details" />
    <AppCard style={styles.person}><Avatar name={consultation.astrologerName} size={66} /><View style={styles.personInfo}><AppText style={styles.name} weight="bold">{consultation.astrologerName}</AppText><AppText tone="muted" style={styles.specialty}>{consultation.specialty}</AppText></View></AppCard>
    <AppCard style={styles.statusCard}><AppText tone="muted">STATUS</AppText><AppText style={styles.status} weight="bold">{consultation.status[0].toUpperCase() + consultation.status.slice(1)}</AppText><AppText tone="muted" style={styles.created}>Requested {new Date(consultation.createdAt).toLocaleString()}</AppText></AppCard>
    <AppText style={styles.sectionTitle} weight="bold">Consultation summary</AppText>
    <AppCard><Detail label="Mode" value="Chat consultation" /><Detail label="Rate" value={'₹' + consultation.pricePerMinute + ' per minute'} /><Detail label="Duration" value={consultation.durationMinutes ? consultation.durationMinutes + ' minutes' : 'Not started'} /></AppCard>
    <AppText tone="muted" style={styles.disclaimer}>This is a local chat demo. Voice and video calls are not available.</AppText>
    <View style={styles.actions}>
      {consultation.status === 'pending' ? <><AppButton title="Accept request" onPress={() => updateStatus(consultation.id, 'accepted')} /><View style={styles.gap}><AppButton title="Cancel request" secondary onPress={cancel} /></View></> : null}
      {consultation.status === 'accepted' ? <AppButton title="Start chat" onPress={start} /> : null}
      {consultation.status === 'active' ? <><AppButton title="Continue chat" onPress={() => navigation.navigate('ConsultationChat', {consultationId: consultation.id})} /><View style={styles.gap}><AppButton title="End consultation" secondary onPress={() => updateStatus(consultation.id, 'completed')} /></View></> : null}
      {consultation.status === 'completed' ? <><AppButton title="Open conversation" secondary onPress={() => navigation.navigate('ConsultationChat', {consultationId: consultation.id})} /><View style={styles.gap}><AppButton title="Write a review" onPress={() => navigation.navigate('ReviewForm', {consultationId: consultation.id})} /></View></> : null}
      {consultation.status === 'cancelled' ? <AppText tone="muted" style={styles.cancelled}>This consultation was cancelled.</AppText> : null}
    </View>
  </ScrollView></SafeAreaView>;
}
function Detail({label, value}: {label: string; value: string}) { return <View style={styles.detail}><AppText tone="muted">{label}</AppText><AppText weight="bold">{value}</AppText></View>; }
const styles = StyleSheet.create({safe: {flex: 1}, page: {padding: 20, paddingBottom: 32}, person: {flexDirection: 'row', alignItems: 'center', padding: 16}, personInfo: {marginLeft: 13}, name: {fontSize: 19}, specialty: {marginTop: 4}, statusCard: {marginTop: 13, padding: 16}, status: {fontSize: 22, marginTop: 5}, created: {fontSize: 12, marginTop: 5}, sectionTitle: {fontSize: 18, marginTop: 24, marginBottom: 12}, detail: {flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 9}, disclaimer: {fontSize: 12, lineHeight: 19, marginTop: 18}, actions: {marginTop: 20}, gap: {marginTop: 10}, cancelled: {textAlign: 'center', padding: 14}});

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
    <AppCard style={styles.person}>
      <View style={styles.personTop}>
        <View style={[styles.statusPill, {backgroundColor: colors.soft, borderColor: colors.border}]}>
          <View style={[styles.statusDot, {backgroundColor: consultation.status === 'active' ? colors.success : consultation.status === 'cancelled' ? colors.error : colors.accent}]} />
          <AppText style={[styles.statusPillText, {color: consultation.status === 'active' ? colors.success : consultation.status === 'cancelled' ? colors.error : colors.accent}]} weight="bold">{consultation.status.toUpperCase()}</AppText>
        </View>
        <AppText tone="muted" style={styles.created}>{new Date(consultation.createdAt).toLocaleDateString()}</AppText>
      </View>
      <View style={styles.personRow}>
        <Avatar name={consultation.astrologerName} size={52} />
        <View style={styles.personInfo}>
          <AppText style={styles.name} weight="bold">{consultation.astrologerName}</AppText>
          <AppText tone="muted" style={styles.specialty}>{consultation.specialty}</AppText>
        </View>
      </View>
    </AppCard>
    <AppText variant="sectionTitle" style={styles.sectionTitle} weight="bold">Consultation summary</AppText>
    <AppCard style={styles.detailCard}>
      <Detail label="Mode" value="Chat consultation" colors={colors} />
      <View style={[styles.detailDivider, {backgroundColor: colors.border}]} />
      <Detail label="Rate" value={'\u20b9' + consultation.pricePerMinute + ' per minute'} colors={colors} />
      <View style={[styles.detailDivider, {backgroundColor: colors.border}]} />
      <Detail label="Duration" value={consultation.durationMinutes ? consultation.durationMinutes + ' minutes' : 'Not started'} colors={colors} />
    </AppCard>
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
function Detail({label, value, colors}: {label: string; value: string; colors: typeof lightColors}) {
  return <View style={styles.detail}><AppText tone="muted" style={styles.detailLabel}>{label}</AppText><View style={[styles.detailValueTag, {backgroundColor: colors.warmSoft}]}><AppText style={[styles.detailValue, {color: colors.accent}]} weight="bold">{value}</AppText></View></View>;
}
const styles = StyleSheet.create({safe: {flex: 1}, page: {paddingHorizontal: 20, paddingTop: 12, paddingBottom: 32, width: '100%', maxWidth: 760, alignSelf: 'center'}, person: {padding: 16}, personTop: {flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14}, statusPill: {flexDirection: 'row', alignItems: 'center', gap: 6, borderRadius: 10, paddingHorizontal: 9, paddingVertical: 6, borderWidth: StyleSheet.hairlineWidth}, statusDot: {width: 7, height: 7, borderRadius: 4}, statusPillText: {fontSize: 9, letterSpacing: 0.4}, created: {fontSize: 11}, personRow: {flexDirection: 'row', alignItems: 'center'}, personInfo: {marginLeft: 13, flex: 1}, name: {fontSize: 18, fontWeight: '600'}, specialty: {marginTop: 4, fontSize: 13}, sectionTitle: {fontSize: 18, marginTop: 24, marginBottom: 12}, detailCard: {padding: 4}, detail: {flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 12, paddingVertical: 10}, detailLabel: {fontSize: 13}, detailValueTag: {borderRadius: 9, paddingHorizontal: 10, paddingVertical: 5}, detailValue: {fontSize: 12}, detailDivider: {height: StyleSheet.hairlineWidth, marginHorizontal: 12}, disclaimer: {fontSize: 12, lineHeight: 19, marginTop: 18}, actions: {marginTop: 20}, gap: {marginTop: 10}, cancelled: {textAlign: 'center', padding: 14}});

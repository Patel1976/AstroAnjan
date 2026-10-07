import React, {useState} from 'react';
import {Alert, ScrollView, StyleSheet, View} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {SafeAreaView} from 'react-native-safe-area-context';
import {AppButton, AppCard, AppHeader, AppInput, AppText, EmptyState} from '../components';
import {MainStackParamList} from '../navigation/types';
import {useConsultationStore} from '../store/consultations/consultationStore';
import {useProfileStore} from '../store/profile/profileStore';
import {useReviewStore} from '../store/reviews/reviewStore';
import {useThemeStore} from '../store/theme/themeStore';
import {darkColors, lightColors} from '../theme';
type Props = NativeStackScreenProps<MainStackParamList, 'ReviewForm'>;
export function ReviewFormScreen({route, navigation}: Props) {
  const consultation = useConsultationStore(state => state.getById(route.params.consultationId));
  const submitReview = useReviewStore(state => state.submit);
  const profile = useProfileStore(state => state.profile);
  const [rating, setRating] = useState(5); const [comment, setComment] = useState('');
  const dark = useThemeStore(state => state.mode === 'dark'); const colors = dark ? darkColors : lightColors;
  if (!consultation || consultation.status !== 'completed') return <SafeAreaView edges={['top']} style={[styles.safe, {backgroundColor: colors.background}]}><AppHeader title="Write a review" /><EmptyState title="Review unavailable" message="Only completed consultations can be reviewed." /></SafeAreaView>;
  const send = () => {
    if (!comment.trim()) {Alert.alert('Write a few words', 'Add a short comment before submitting your review.'); return;}
    submitReview({astrologerId: consultation.astrologerId, consultationId: consultation.id, customerName: profile.name, rating, comment: comment.trim()});
    Alert.alert('Thank you', 'Your demo review has been added.');
    navigation.goBack();
  };
  return <SafeAreaView edges={['top']} style={[styles.safe, {backgroundColor: colors.background}]}><ScrollView contentContainerStyle={styles.page}>
    <AppHeader title="Write a review" />
    <AppCard><AppText weight="bold">How was your session with {consultation.astrologerName}?</AppText><AppText tone="muted" style={styles.prompt}>Your feedback helps other people choose the right guidance.</AppText>
      <View style={styles.stars}>{[1, 2, 3, 4, 5].map(value => <AppText key={value} onPress={() => setRating(value)} style={[styles.star, {color: value <= rating ? colors.accent : colors.border}]}>★</AppText>)}</View>
      <AppText style={styles.ratingLabel} weight="bold">{rating} out of 5</AppText>
    </AppCard>
    <AppText style={styles.label} weight="bold">Your review</AppText><AppInput multiline value={comment} onChangeText={setComment} placeholder="Share what you found helpful..." style={styles.comment} textAlignVertical="top" />
    <View style={styles.note}><AppText tone="muted" style={styles.noteText}>This review is stored locally in the demo app.</AppText></View>
    <AppButton title="Submit review" onPress={send} />
  </ScrollView></SafeAreaView>;
}
const styles = StyleSheet.create({safe: {flex: 1}, page: {padding: 20, paddingBottom: 32}, prompt: {lineHeight: 20, marginTop: 7}, stars: {flexDirection: 'row', justifyContent: 'center', marginTop: 22, gap: 10}, star: {fontSize: 36}, ratingLabel: {textAlign: 'center', marginTop: 5}, label: {marginTop: 22, marginBottom: 8}, comment: {minHeight: 130, paddingTop: 14}, note: {marginVertical: 18}, noteText: {fontSize: 12}});

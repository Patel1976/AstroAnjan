import React, {useMemo} from 'react';
import {Alert, ScrollView, StyleSheet, View} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {SafeAreaView} from 'react-native-safe-area-context';
import {AppButton, AppCard, AppHeader, AppText, Avatar, EmptyState, RatingStars} from '../components';
import {MainStackParamList} from '../navigation/types';
import {useAstrologerStore} from '../store/astrologers/astrologerStore';
import {useConsultationStore} from '../store/consultations/consultationStore';
import {useReviewStore} from '../store/reviews/reviewStore';
import {useThemeStore} from '../store/theme/themeStore';
import {darkColors, lightColors} from '../theme';
type Props = NativeStackScreenProps<MainStackParamList, 'AstrologerProfile'>;
export function AstrologerProfileScreen({route, navigation}: Props) {
  const astrologer = useAstrologerStore(state => state.getById(route.params.astrologerId));
  const request = useConsultationStore(state => state.request);
  const allReviews = useReviewStore(state => state.reviews);
  const reviews = useMemo(() => allReviews.filter(item => item.astrologerId === route.params.astrologerId), [allReviews, route.params.astrologerId]);
  const dark = useThemeStore(state => state.mode === 'dark'); const colors = dark ? darkColors : lightColors;
  if (!astrologer) return <SafeAreaView edges={['top']} style={[styles.safe, {backgroundColor: colors.background}]}><AppHeader title="Astrologer" /><EmptyState title="Profile unavailable" message="This astrologer is not in the demo directory." /></SafeAreaView>;
  const begin = () => {const id = request({astrologerId: astrologer.id, astrologerName: astrologer.name, specialty: astrologer.specialty, pricePerMinute: astrologer.pricePerMinute}); navigation.navigate('ConsultationDetails', {consultationId: id});};
  return <SafeAreaView edges={['top']} style={[styles.safe, {backgroundColor: colors.background}]}><ScrollView contentContainerStyle={styles.page}>
    <AppHeader title="Astrologer profile" />
    <AppCard style={styles.hero}><Avatar name={astrologer.name} size={82} color={astrologer.avatarColor} /><AppText style={styles.name} weight="bold">{astrologer.name}</AppText><AppText tone="muted" style={styles.specialty}>{astrologer.specialty}</AppText><RatingStars rating={astrologer.rating} /><AppText tone="muted" style={styles.experience}>{astrologer.experienceYears} years experience · {astrologer.languages.join(', ')}</AppText><AppText tone="accent" style={styles.rate} weight="bold">₹{astrologer.pricePerMinute} per minute</AppText></AppCard>
    <AppText style={styles.sectionTitle} weight="bold">About</AppText><AppCard><AppText tone="muted" style={styles.bio}>{astrologer.bio}</AppText></AppCard>
    <View style={styles.reviewHead}><AppText style={styles.sectionTitle} weight="bold">Reviews</AppText><AppText tone="muted">{astrologer.reviewCount.toLocaleString()} total</AppText></View>
    {reviews.length ? reviews.map(review => <AppCard key={review.id} style={styles.review}><View style={styles.reviewTop}><AppText weight="bold">{review.customerName}</AppText><RatingStars rating={review.rating} /></View><AppText tone="muted" style={styles.comment}>{review.comment}</AppText></AppCard>) : <EmptyState title="No reviews yet" message="Be the first to share feedback after a completed consultation." />}
    <View style={styles.actions}><AppButton title="Request chat consultation" onPress={begin} /><View style={styles.call}><AppButton title="Voice/video call - coming soon" secondary onPress={() => Alert.alert('Coming soon', 'In-app calling is not available in this demo.')} /></View></View>
  </ScrollView></SafeAreaView>;
}
const styles = StyleSheet.create({safe: {flex: 1}, page: {padding: 20, paddingBottom: 34}, hero: {alignItems: 'center', padding: 22}, name: {fontSize: 22, marginTop: 12}, specialty: {marginTop: 3, marginBottom: 8}, experience: {marginTop: 9, fontSize: 12}, rate: {marginTop: 12}, sectionTitle: {fontSize: 18, marginTop: 22, marginBottom: 11}, bio: {lineHeight: 22}, reviewHead: {flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}, review: {marginBottom: 10, padding: 14}, reviewTop: {flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}, comment: {lineHeight: 20, marginTop: 9}, actions: {marginTop: 18}, call: {marginTop: 10}});

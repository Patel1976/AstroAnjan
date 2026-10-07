import React from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {AppCard, AppHeader, AppText, EmptyState, RatingStars} from '../components';
import {useReviewStore} from '../store/reviews/reviewStore';
import {useThemeStore} from '../store/theme/themeStore';
import {darkColors, lightColors} from '../theme';
export function ReviewsScreen() {
  const reviews = useReviewStore(state => state.reviews);
  const dark = useThemeStore(state => state.mode === 'dark'); const colors = dark ? darkColors : lightColors;
  const average = reviews.length ? reviews.reduce((sum, item) => sum + item.rating, 0) / reviews.length : 0;
  return <SafeAreaView edges={['top']} style={[styles.safe, {backgroundColor: colors.background}]}><ScrollView contentContainerStyle={styles.page}>
    <AppHeader title="Reviews" />
    <AppCard style={styles.summary}><AppText style={styles.score} weight="bold">{average.toFixed(1)}</AppText><RatingStars rating={average} /><AppText tone="muted" style={styles.count}>{reviews.length} written reviews</AppText></AppCard>
    {reviews.map(review => <AppCard key={review.id} style={styles.card}><View style={styles.top}><AppText weight="bold">{review.customerName}</AppText><RatingStars rating={review.rating} /></View><AppText tone="muted" style={styles.date}>{new Date(review.createdAt).toLocaleDateString()}</AppText><AppText style={styles.comment}>{review.comment}</AppText></AppCard>)}
    {reviews.length === 0 ? <EmptyState title="No reviews yet" message="Reviews from completed sessions will appear here." /> : null}
  </ScrollView></SafeAreaView>;
}
const styles = StyleSheet.create({safe: {flex: 1}, page: {padding: 20, paddingBottom: 32}, summary: {alignItems: 'center', padding: 22, marginBottom: 15}, score: {fontSize: 42}, count: {marginTop: 6, fontSize: 12}, card: {padding: 15, marginBottom: 10}, top: {flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}, date: {fontSize: 11, marginTop: 6}, comment: {lineHeight: 21, marginTop: 9}});

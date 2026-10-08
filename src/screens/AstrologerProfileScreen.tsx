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
    <AppCard style={[styles.hero, {backgroundColor: colors.cosmic, borderColor: colors.cosmic}]}>
      <View style={styles.heroTop}>
        <View style={[styles.onlinePill, {backgroundColor: colors.cosmicOverlay}]}>
          <View style={[styles.onlineDot, {backgroundColor: astrologer.isOnline ? colors.success : colors.live}]} />
          <AppText style={[styles.onlineText, {color: astrologer.isOnline ? colors.success : colors.cosmicMuted}]} weight="bold">{astrologer.isOnline ? 'ONLINE NOW' : 'OFFLINE'}</AppText>
        </View>
        <View style={styles.ratingRow}><AppText style={{color: colors.accent}}>★</AppText><AppText style={[styles.ratingText, {color: colors.onCosmic}]} weight="bold">{astrologer.rating.toFixed(1)}</AppText></View>
      </View>
      <Avatar name={astrologer.name} size={72} color={astrologer.avatarColor} />
      <AppText style={[styles.name, {color: colors.onCosmic}]} weight="bold">{astrologer.name}</AppText>
      <AppText style={[styles.specialty, {color: colors.cosmicMuted}]}>{astrologer.specialty}</AppText>
      <View style={[styles.heroFooter, {borderTopColor: colors.cosmicOverlay}]}>
        <View style={[styles.heroStat]}><AppText style={[styles.heroStatVal, {color: colors.onCosmic}]} weight="bold">{astrologer.experienceYears}+</AppText><AppText style={[styles.heroStatLabel, {color: colors.cosmicMuted}]}>Years</AppText></View>
        <View style={[styles.heroStatDivider, {backgroundColor: colors.cosmicOverlay}]} />
        <View style={styles.heroStat}><AppText style={[styles.heroStatVal, {color: colors.onCosmic}]} weight="bold">{astrologer.reviewCount}</AppText><AppText style={[styles.heroStatLabel, {color: colors.cosmicMuted}]}>Reviews</AppText></View>
        <View style={[styles.heroStatDivider, {backgroundColor: colors.cosmicOverlay}]} />
        <View style={styles.heroStat}><AppText style={[styles.heroStatVal, {color: colors.accent}]} weight="bold">₹{astrologer.pricePerMinute}</AppText><AppText style={[styles.heroStatLabel, {color: colors.cosmicMuted}]}>/min</AppText></View>
      </View>
    </AppCard>
    <AppText variant="sectionTitle" style={styles.sectionTitle} weight="bold">About</AppText>
    <AppCard style={styles.aboutCard}>
      <View style={[styles.langRow, {borderBottomColor: colors.border}]}>
        {astrologer.languages.map(lang => <View key={lang} style={[styles.langPill, {backgroundColor: colors.soft, borderColor: colors.border}]}><AppText style={[styles.langText, {color: colors.primary}]} weight="bold">{lang}</AppText></View>)}
      </View>
      <AppText tone="muted" style={styles.bio}>{astrologer.bio}</AppText>
    </AppCard>
    <View style={styles.reviewHead}><AppText variant="sectionTitle" style={styles.sectionTitle} weight="bold">Reviews</AppText><AppText tone="muted">{astrologer.reviewCount.toLocaleString()} total</AppText></View>
    {reviews.length ? reviews.map(review => <AppCard key={review.id} style={styles.review}>
      <View style={styles.reviewTop}>
        <View style={[styles.reviewAvatar, {backgroundColor: colors.soft}]}><AppText style={[styles.reviewAvatarText, {color: colors.primary}]} weight="bold">{review.customerName.charAt(0)}</AppText></View>
        <View style={styles.reviewMeta}><AppText weight="bold">{review.customerName}</AppText><AppText tone="muted" style={styles.reviewDate}>{new Date(review.createdAt).toLocaleDateString()}</AppText></View>
        <RatingStars rating={review.rating} />
      </View>
      <AppText tone="muted" style={[styles.comment, {borderTopColor: colors.border}]}>{review.comment}</AppText>
    </AppCard>) : <EmptyState title="No reviews yet" message="Be the first to share feedback after a completed consultation." />}
    <View style={styles.actions}><AppButton title="Request chat consultation" onPress={begin} /><View style={styles.call}><AppButton title="Voice/video call - coming soon" secondary onPress={() => Alert.alert('Coming soon', 'In-app calling is not available in this demo.')} /></View></View>
  </ScrollView></SafeAreaView>;
}
const styles = StyleSheet.create({safe: {flex: 1}, page: {paddingHorizontal: 20, paddingTop: 12, paddingBottom: 34, width: '100%', maxWidth: 760, alignSelf: 'center'}, hero: {alignItems: 'center', padding: 20, overflow: 'hidden'}, heroTop: {flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '100%', marginBottom: 16}, onlinePill: {flexDirection: 'row', alignItems: 'center', gap: 6, borderRadius: 10, paddingHorizontal: 9, paddingVertical: 6}, onlineDot: {width: 7, height: 7, borderRadius: 4}, onlineText: {fontSize: 9, letterSpacing: 0.4}, ratingRow: {flexDirection: 'row', alignItems: 'center', gap: 4}, ratingText: {fontSize: 13}, name: {fontSize: 21, marginTop: 12, color: '#fff'}, specialty: {marginTop: 3, fontSize: 13}, heroFooter: {flexDirection: 'row', alignItems: 'center', marginTop: 20, paddingTop: 16, borderTopWidth: StyleSheet.hairlineWidth, width: '100%', justifyContent: 'space-around'}, heroStat: {alignItems: 'center'}, heroStatVal: {fontSize: 18}, heroStatLabel: {fontSize: 11, marginTop: 2}, heroStatDivider: {width: 1, height: 32}, sectionTitle: {fontSize: 18, marginTop: 22, marginBottom: 11}, aboutCard: {padding: 16}, langRow: {flexDirection: 'row', flexWrap: 'wrap', gap: 7, paddingBottom: 14, marginBottom: 14, borderBottomWidth: StyleSheet.hairlineWidth}, langPill: {borderRadius: 9, paddingHorizontal: 10, paddingVertical: 5, borderWidth: StyleSheet.hairlineWidth}, langText: {fontSize: 11, letterSpacing: 0.3}, bio: {lineHeight: 22}, reviewHead: {flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}, review: {marginBottom: 10, padding: 15}, reviewTop: {flexDirection: 'row', alignItems: 'center', gap: 10}, reviewAvatar: {width: 38, height: 38, borderRadius: 13, alignItems: 'center', justifyContent: 'center'}, reviewAvatarText: {fontSize: 15}, reviewMeta: {flex: 1}, reviewDate: {fontSize: 11, marginTop: 2}, comment: {lineHeight: 20, marginTop: 12, paddingTop: 12, borderTopWidth: StyleSheet.hairlineWidth}, actions: {marginTop: 18}, call: {marginTop: 10}});

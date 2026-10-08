import React, {useMemo} from 'react';
import {Pressable, ScrollView, StyleSheet, useWindowDimensions, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {SafeAreaView} from 'react-native-safe-area-context';
import {AppCard, AppText, Avatar, StatusBadge} from '../components';
import {astrologyTools} from '../mock/astrology';
import {MainStackParamList} from '../navigation/types';
import {Astrologer, Consultation, LiveSession} from '../types';
import {useAstrologerStore} from '../store/astrologers/astrologerStore';
import {useAuthStore} from '../store/auth/authStore';
import {useConsultationStore} from '../store/consultations/consultationStore';
import {useNotificationStore} from '../store/notifications/notificationStore';
import {useProfileStore} from '../store/profile/profileStore';
import {useWalletStore} from '../store/wallet/walletStore';
import {useLiveSessionStore} from '../store/liveSessions/liveSessionStore';
import {useThemeStore} from '../store/theme/themeStore';
import {darkColors, lightColors} from '../theme';

export function HomeScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<MainStackParamList>>();
  const {width} = useWindowDimensions();
  const contentWidth = Math.min(width, 760);
  const quickActionWidth = (contentWidth - 40) / 4;
  const user = useAuthStore(state => state.user);
  const profile = useProfileStore(state => state.profile);
  const astrologers = useAstrologerStore(state => state.astrologers);
  const consultations = useConsultationStore(state => state.consultations);
  const balance = useWalletStore(state => state.balance);
  const notifications = useNotificationStore(state => state.items);
  const liveSessions = useLiveSessionStore(state => state.sessions);
  const toggleTheme = useThemeStore(state => state.toggle);
  const dark = useThemeStore(state => state.mode === 'dark');
  const colors = dark ? darkColors : lightColors;
  const unread = useMemo(() => notifications.filter(item => !item.isRead).length, [notifications]);
  const onlineExperts = useMemo(() => astrologers.filter(person => person.isOnline).slice(0, 6), [astrologers]);
  const recentConsultations = useMemo(() => [...consultations].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()).slice(0, 2), [consultations]);
  const firstName = user?.name.split(' ')[0] ?? profile.name.split(' ')[0];
  const greeting = new Date().getHours() < 12 ? 'Good morning' : new Date().getHours() < 17 ? 'Good afternoon' : 'Good evening';
  const date = new Date().toLocaleDateString('en-IN', {weekday: 'long', month: 'long', day: 'numeric'});
  const quickTools = ['kundli', 'horoscope', 'compatibility', 'panchang'].map(id => astrologyTools.find(tool => tool.id === id)).filter((tool): tool is (typeof astrologyTools)[number] => Boolean(tool));

  return <SafeAreaView edges={['top']} style={[styles.safe, {backgroundColor: colors.background}]}>
    <ScrollView style={{backgroundColor: colors.background}} contentContainerStyle={styles.page} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <View style={styles.welcome}>
          <AppText tone="muted" style={styles.date}>{date.toUpperCase()}</AppText>
          <AppText style={styles.greeting} variant="hero">{greeting}, {firstName}</AppText>
          <AppText tone="muted" style={styles.welcomeNote}>A little clarity for the path ahead.</AppText>
        </View>
        <View style={styles.headerActions}>
          <Pressable accessibilityRole="button" accessibilityLabel="Notifications" onPress={() => navigation.navigate('Notifications')} style={({pressed}) => [styles.headerButton, {backgroundColor: colors.surface, borderColor: colors.border}, pressed && styles.pressed]}>
            <BellIcon color={colors.iconText} />
            {unread > 0 ? <View style={[styles.badge, {backgroundColor: colors.primary, borderColor: colors.background}]}><AppText style={[styles.badgeText, {color: colors.onPrimary}]} weight="bold">{unread > 9 ? '9+' : unread}</AppText></View> : null}
          </Pressable>
          <Pressable accessibilityRole="button" accessibilityLabel={dark ? 'Switch to light theme' : 'Switch to dark theme'} onPress={toggleTheme} style={({pressed}) => [styles.headerButton, {backgroundColor: colors.surface, borderColor: colors.border}, pressed && styles.pressed]}>
            {dark ? <MoonIcon color={colors.accent} background={colors.surface} /> : <SunIcon color={colors.accent} />}
          </Pressable>
        </View>
      </View>

      <AppCard style={[styles.dailyCard, {backgroundColor: colors.cosmic, borderColor: colors.cosmic}]} onPress={() => navigation.navigate('ToolInput', {toolId: 'horoscope'})}>
        <View style={[styles.orbitOne, {borderColor: colors.cosmicOverlay}]} /><View style={[styles.orbitTwo, {borderColor: colors.cosmicOverlay}]} /><View style={styles.dailyContent}>
    <View style={styles.dailyEyebrow}><View style={[styles.liveDot, {backgroundColor: colors.accent}]} /><AppText style={[styles.eyebrowText, {color: colors.accent}]} weight="bold">YOUR DAILY ASTROLOGY</AppText></View>
          <AppText style={[styles.dailyTitle, {color: colors.onCosmic}]} variant="screenTitle">A moment to realign.</AppText>
          <AppText style={[styles.dailyBody, {color: colors.cosmicMuted}]}>Explore a personal perspective for the day ahead.</AppText>
          <View style={styles.dailyAction}><AppText style={[styles.dailyActionText, {color: colors.accent}]} weight="bold">Read today’s horoscope</AppText><AppText style={[styles.actionArrow, {color: colors.accent}]}>›</AppText></View>
        </View>
      </AppCard>

      <SectionHeading title="Explore your path" action="All tools" onPress={() => navigation.navigate('Tabs', {screen: 'Astrology'} as never)} colors={colors} />
      <View style={styles.quickActions}>{quickTools.map((tool, index) => <Pressable key={tool.id} accessibilityRole='button' onPress={() => navigation.navigate('ToolInput', {toolId: tool.id})} style={({pressed}) => [styles.quickAction, {width: quickActionWidth}, pressed && styles.actionPressed]}>
        <View style={[styles.quickIcon, {backgroundColor: index % 2 ? colors.soft : colors.warmSoft, borderColor: colors.border}]}><AppText style={[styles.quickSymbol, {color: colors.accent}]}>{tool.symbol}</AppText></View>
        <AppText variant='caption' numberOfLines={2} style={styles.quickActionTitle}>{tool.title}</AppText>
      </Pressable>)}</View>

      <SectionHeading title="Astrologers for you" action="See all" onPress={() => navigation.navigate('Tabs', {screen: 'Astrologers'} as never)} colors={colors} />
      {onlineExperts.length > 0 ? <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.horizontalList}>
        {onlineExperts.slice(0, 6).map(person => <ExpertCard key={person.id} expert={person} colors={colors} onPress={() => navigation.navigate('AstrologerProfile', {astrologerId: person.id})} />)}
      </ScrollView> : <AppCard style={styles.emptyOnline}><AppText variant='cardTitle'>Your next guide is one tap away</AppText><AppText tone='muted' style={styles.emptyCopy}>Browse the directory to find an astrologer.</AppText><AppText tone='accent' weight='bold' onPress={() => navigation.navigate('Tabs', {screen: 'Astrologers'} as never)}>Explore astrologers</AppText></AppCard>}

      {liveSessions.length > 0 ? <>
        <SectionHeading title="Live & upcoming" action="View all" onPress={() => navigation.navigate('LiveSessions')} colors={colors} />
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.horizontalList}>
          {liveSessions.slice(0, 4).map(session => <LiveCard key={session.id} session={session} colors={colors} onPress={() => navigation.navigate('LiveSessionDetails', {sessionId: session.id})} />)}
        </ScrollView>
      </> : null}

      <SectionHeading title="Your consultations" action="All sessions" onPress={() => navigation.navigate('Tabs', {screen: 'Consultations'} as never)} colors={colors} />
      {recentConsultations.length ? recentConsultations.map(item => <ConsultationCard key={item.id} consultation={item} colors={colors} onPress={() => navigation.navigate('ConsultationDetails', {consultationId: item.id})} />) : <AppCard style={styles.emptyConsult}><AppText variant="cardTitle">Your guidance journey starts here</AppText><AppText tone="muted" style={styles.emptyCopy}>Connect with an astrologer for a personal consultation.</AppText><AppText tone="accent" weight="bold" onPress={() => navigation.navigate('Tabs', {screen: 'Astrologers'} as never)}>Find an astrologer  ›</AppText></AppCard>}

      <SectionHeading title="Your wallet" action="Transaction history" onPress={() => navigation.navigate('Wallet')} colors={colors} />
      <AppCard style={[styles.walletCard, {backgroundColor: colors.surfaceElevated, borderColor: colors.border}]} onPress={() => navigation.navigate('Wallet')}>
        <View style={[styles.walletIcon, {backgroundColor: colors.warmSoft}]}><AppText style={[styles.walletSymbol, {color: colors.accent}]}>₹</AppText></View>
        <View style={styles.walletCopy}><AppText tone="muted" style={styles.walletEyebrow}>AVAILABLE BALANCE</AppText><AppText variant="screenTitle">₹{balance.toLocaleString('en-IN')}</AppText></View>
        <View style={[styles.walletAction, {backgroundColor: colors.primary}]}><AppText style={[styles.walletActionText, {color: colors.onPrimary}]} weight="bold">Add funds</AppText></View>
      </AppCard>
      <AppCard style={styles.birthCard} onPress={() => navigation.navigate('BirthDetails')}>
        <View style={[styles.birthIcon, {backgroundColor: colors.soft}]}><AppText style={{color: colors.primary}}>✧</AppText></View>
        <View style={styles.birthCopy}><AppText variant="cardTitle">Your birth profile</AppText><AppText tone="muted" style={styles.quickSubtitle}>{profile.birthLocation ?? 'Add your birth details'}</AppText></View>
        <AppText tone="accent" weight="bold">{profile.birthLocation ? 'Edit' : 'Add'}  ›</AppText>
      </AppCard>
    </ScrollView>
  </SafeAreaView>;
}

function SectionHeading({title, action, onPress, colors}: {title: string; action: string; onPress: () => void; colors: typeof lightColors}) {
  return <View style={styles.sectionHeading}><AppText variant="sectionTitle">{title}</AppText><Pressable accessibilityRole="button" onPress={onPress} hitSlop={8}><AppText style={{color: colors.accent}} weight="bold">{action}</AppText></Pressable></View>;
}

function ExpertCard({expert, colors, onPress}: {expert: Astrologer; colors: typeof lightColors; onPress: () => void}) {
  return <AppCard onPress={onPress} style={[styles.expertFeatureCard, {borderColor: colors.border}]}>
    <View style={styles.expertCardTop}>
      <View style={[styles.expertOnlinePill, {backgroundColor: colors.warmSoft}]}><View style={[styles.expertOnlineDot, {backgroundColor: colors.success}]} /><AppText style={[styles.expertOnlineText, {color: colors.success}]} weight='bold'>ONLINE NOW</AppText></View>
      <View style={styles.expertRating}><AppText style={{color: colors.accent}}>★</AppText><AppText style={styles.expertFeatureRatingText} weight='bold'>{expert.rating.toFixed(1)}</AppText></View>
    </View>
    <AppText variant='cardTitle' numberOfLines={1} style={styles.expertFeatureName}>{expert.name}</AppText>
    <AppText tone='muted' numberOfLines={1} style={styles.expertFeatureSpecialty}>{expert.specialty}</AppText>
    <View style={[styles.expertFeatureFooter, {borderTopColor: colors.border}]}><View style={styles.expertFeatureExperience}><Avatar name={expert.name} size={30} color={expert.avatarColor} /><AppText tone='muted' style={styles.expertFeatureExperienceText}>{expert.experienceYears} yrs experience</AppText></View><AppText style={styles.expertFeaturePrice} weight='bold'>₹{expert.pricePerMinute}<AppText tone='muted' style={styles.expertFeatureMinute}> / min</AppText></AppText></View>
  </AppCard>;
}

function LiveCard({session, colors, onPress}: {session: LiveSession; colors: typeof lightColors; onPress: () => void}) {
  return <AppCard onPress={onPress} style={[styles.liveCard, {backgroundColor: session.isLive ? colors.cosmic : colors.surface, borderColor: session.isLive ? colors.cosmic : colors.border}]}>
    <View style={styles.liveCardTop}><View style={[styles.livePill, {backgroundColor: session.isLive ? colors.cosmicOverlay : colors.warmSoft}]}><View style={[styles.liveDot, {backgroundColor: session.isLive ? colors.live : colors.accent}]} /><AppText style={[styles.liveLabel, {color: session.isLive ? colors.onCosmic : colors.accent}]} weight="bold">{session.isLive ? 'LIVE NOW' : 'UPCOMING'}</AppText></View><AppText style={[styles.liveViewers, {color: session.isLive ? colors.cosmicMuted : colors.muted}]}>{session.isLive ? `${session.viewers} watching` : new Date(session.startsAt).toLocaleDateString()}</AppText></View>
    <AppText variant="cardTitle" style={{color: session.isLive ? colors.onCosmic : colors.text}} numberOfLines={2}>{session.title}</AppText>
    <View style={styles.liveHost}><Avatar name={session.astrologerName} size={30} /><AppText style={[styles.liveHostName, {color: session.isLive ? colors.cosmicMuted : colors.muted}]} numberOfLines={1}>{session.astrologerName}</AppText></View>
  </AppCard>;
}

function ConsultationCard({consultation, colors, onPress}: {consultation: Consultation; colors: typeof lightColors; onPress: () => void}) {
  return <AppCard onPress={onPress} style={[styles.consultCard, {borderColor: colors.border}]}>
    <Avatar name={consultation.astrologerName} size={46} />
    <View style={styles.consultCopy}><AppText variant="cardTitle" numberOfLines={1}>{consultation.astrologerName}</AppText><AppText tone="muted" style={styles.quickSubtitle}>{consultation.specialty} · {new Date(consultation.createdAt).toLocaleDateString()}</AppText></View>
    <StatusBadge status={consultation.status} />
  </AppCard>;
}

function BellIcon({color}: {color: string}) {
  return <View style={styles.bellIcon}><View style={[styles.bellBody, {borderColor: color}]} /><View style={[styles.bellBase, {backgroundColor: color}]} /><View style={[styles.bellClapper, {backgroundColor: color}]} /></View>;
}
function SunIcon({color}: {color: string}) {
  return <View style={styles.sunIcon}><View style={[styles.sunCore, {borderColor: color}]} /><View style={[styles.sunRay, styles.sunRayTop, {backgroundColor: color}]} /><View style={[styles.sunRay, styles.sunRayBottom, {backgroundColor: color}]} /><View style={[styles.sunRay, styles.sunRayLeft, {backgroundColor: color}]} /><View style={[styles.sunRay, styles.sunRayRight, {backgroundColor: color}]} /></View>;
}
function MoonIcon({color, background}: {color: string; background: string}) {
  return <View style={styles.moonIcon}><View style={[styles.moonOuter, {backgroundColor: color}]} /><View style={[styles.moonCutout, {backgroundColor: background}]} /></View>;
}

const styles = StyleSheet.create({
  safe: {flex: 1}, page: {paddingHorizontal: 20, paddingTop: 12, paddingBottom: 36, width: '100%', maxWidth: 760, alignSelf: 'center'},
  header: {flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 23}, welcome: {flex: 1, marginRight: 12}, date: {fontSize: 10, lineHeight: 14, letterSpacing: 0.65}, greeting: {fontSize: 25, lineHeight: 32, letterSpacing: -0.55, marginTop: 4}, welcomeNote: {fontSize: 12, lineHeight: 17, marginTop: 2},
  headerActions: {flexDirection: 'row', alignItems: 'center', gap: 9}, headerButton: {width: 42, height: 42, borderRadius: 15, borderWidth: 1, alignItems: 'center', justifyContent: 'center'}, pressed: {opacity: 0.78, transform: [{scale: 0.97}]},
  badge: {position: 'absolute', top: -5, right: -5, minWidth: 17, height: 17, paddingHorizontal: 3, borderRadius: 9, borderWidth: 1.5, alignItems: 'center', justifyContent: 'center'}, badgeText: {fontSize: 9, lineHeight: 12},
  bellIcon: {width: 22, height: 22, alignItems: 'center', justifyContent: 'center'}, bellBody: {width: 14, height: 15, borderWidth: 1.6, borderTopLeftRadius: 8, borderTopRightRadius: 8, borderBottomLeftRadius: 4, borderBottomRightRadius: 4}, bellBase: {position: 'absolute', width: 18, height: 1.6, bottom: 3, borderRadius: 1}, bellClapper: {position: 'absolute', width: 3, height: 3, borderRadius: 2, bottom: 1},
  sunIcon: {width: 22, height: 22, alignItems: 'center', justifyContent: 'center'}, sunCore: {width: 9, height: 9, borderWidth: 1.5, borderRadius: 5}, sunRay: {position: 'absolute', width: 2, height: 4, borderRadius: 1}, sunRayTop: {top: 0}, sunRayBottom: {bottom: 0}, sunRayLeft: {left: 0, transform: [{rotate: '90deg'}]}, sunRayRight: {right: 0, transform: [{rotate: '90deg'}]}, moonIcon: {width: 22, height: 22}, moonOuter: {position: 'absolute', width: 16, height: 16, left: 3, top: 3, borderRadius: 9}, moonCutout: {position: 'absolute', width: 14, height: 14, left: 8, top: 1, borderRadius: 8},
  dailyCard: {padding: 0, overflow: 'hidden', minHeight: 210}, dailyContent: {padding: 22, zIndex: 1}, orbitOne: {position: 'absolute', width: 190, height: 190, borderWidth: 1, borderRadius: 100, right: -48, top: -64}, orbitTwo: {position: 'absolute', width: 140, height: 140, borderWidth: 1, borderRadius: 80, right: -22, top: -38}, dailyEyebrow: {flexDirection: 'row', alignItems: 'center', gap: 8}, liveDot: {width: 7, height: 7, borderRadius: 4}, eyebrowText: {fontSize: 10, lineHeight: 14, letterSpacing: 0.8}, dailyTitle: {fontSize: 25, lineHeight: 31, maxWidth: 290, marginTop: 16}, dailyBody: {maxWidth: 285, fontSize: 13, lineHeight: 20, marginTop: 6}, dailyAction: {flexDirection: 'row', alignItems: 'center', marginTop: 20}, dailyActionText: {fontSize: 13}, actionArrow: {fontSize: 22, marginLeft: 7, lineHeight: 24},
  sectionHeading: {flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 27, marginBottom: 13}, quickActions: {flexDirection: 'row', justifyContent: 'space-between'}, quickAction: {alignItems: 'center', justifyContent: 'flex-start', paddingVertical: 4, minHeight: 94}, actionPressed: {opacity: 0.7, transform: [{scale: 0.96}]}, quickIcon: {width: 54, height: 54, borderRadius: 27, borderWidth: 1, alignItems: 'center', justifyContent: 'center'}, quickSymbol: {fontSize: 22}, quickActionTitle: {fontSize: 11, lineHeight: 15, textAlign: 'center', marginTop: 7, paddingHorizontal: 1},
  horizontalList: {gap: 12, paddingVertical: 2, paddingRight: 20}, liveCard: {width: 255, minHeight: 140, padding: 15, borderRadius: 20, justifyContent: 'space-between'}, liveCardTop: {flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16}, livePill: {flexDirection: 'row', alignItems: 'center', gap: 6, borderRadius: 10, paddingHorizontal: 8, paddingVertical: 6}, liveLabel: {fontSize: 9, letterSpacing: 0.4}, liveViewers: {fontSize: 10}, liveHost: {flexDirection: 'row', alignItems: 'center', marginTop: 13, gap: 8}, liveHostName: {fontSize: 11, flex: 1},
  consultCard: {flexDirection: 'row', alignItems: 'center', padding: 13, marginBottom: 9, borderRadius: 17}, consultCopy: {flex: 1, minWidth: 0, marginHorizontal: 11}, emptyOnline: {padding: 18}, emptyConsult: {padding: 18}, emptyCopy: {fontSize: 12, lineHeight: 18, marginTop: 4, marginBottom: 12},
  walletCard: {flexDirection: 'row', alignItems: 'center', padding: 16, borderRadius: 20}, walletIcon: {width: 42, height: 42, alignItems: 'center', justifyContent: 'center', borderRadius: 14}, walletSymbol: {fontSize: 20, fontWeight: '700'}, walletCopy: {flex: 1, marginLeft: 12}, walletEyebrow: {fontSize: 9, lineHeight: 14, letterSpacing: 0.6}, walletAction: {paddingHorizontal: 13, paddingVertical: 10, borderRadius: 12}, walletActionText: {fontSize: 11}, birthCard: {flexDirection: 'row', alignItems: 'center', padding: 13, marginTop: 12, borderRadius: 17}, birthIcon: {width: 38, height: 38, borderRadius: 13, alignItems: 'center', justifyContent: 'center'}, birthCopy: {flex: 1, marginLeft: 11},  quickSubtitle: {fontSize: 11, lineHeight: 15, marginTop: 2}, expertFeatureCard: {width: 255, minHeight: 140, padding: 15, borderRadius: 20, justifyContent: 'space-between'}, expertCardTop: {flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}, expertOnlineDot: {width: 6, height: 6, borderRadius: 3}, expertOnlineText: {fontSize: 9, letterSpacing: 0.35}, expertFeatureRatingText: {fontSize: 12}, expertOnlinePill: {flexDirection: 'row', alignItems: 'center', gap: 6, borderRadius: 10, paddingHorizontal: 8, paddingVertical: 6}, expertRating: {flexDirection: 'row', alignItems: 'center', gap: 4}, expertFeatureName: {fontSize: 16, lineHeight: 22, fontWeight: '600', marginTop: 12}, expertFeatureSpecialty: {fontSize: 12, lineHeight: 17, marginTop: 2}, expertFeatureFooter: {flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', borderTopWidth: StyleSheet.hairlineWidth, paddingTop: 10, marginTop: 12}, expertFeatureExperience: {flexDirection: 'row', alignItems: 'center', gap: 8}, expertFeatureExperienceText: {fontSize: 10}, expertFeaturePrice: {fontSize: 12}, expertFeatureMinute: {fontSize: 10},});
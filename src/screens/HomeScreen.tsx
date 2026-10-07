import React, {useMemo} from 'react';
import {ScrollView, StyleSheet, useWindowDimensions, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {SafeAreaView} from 'react-native-safe-area-context';
import {AppCard, AppText, Avatar, RatingStars} from '../components';
import {astrologyTools} from '../mock/astrology';
import {MainStackParamList} from '../navigation/types';
import {useAstrologerStore} from '../store/astrologers/astrologerStore';
import {useAuthStore} from '../store/auth/authStore';
import {useConsultationStore} from '../store/consultations/consultationStore';
import {useNotificationStore} from '../store/notifications/notificationStore';
import {useProfileStore} from '../store/profile/profileStore';
import {useWalletStore} from '../store/wallet/walletStore';
import {useLiveSessionStore} from '../store/liveSessions/liveSessionStore';
import {useThemeStore} from '../store/theme/themeStore';
import {darkColors, lightColors} from '../theme';
import {getGridColumnCount} from '../theme/dimensions';
export function HomeScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<MainStackParamList>>();
  const {width} = useWindowDimensions();
  const columnCount = getGridColumnCount(width);
  const gridCardWidth = (width - 40 - (columnCount - 1) * 12) / columnCount;
  const user = useAuthStore(state => state.user);
  const profile = useProfileStore(state => state.profile);
  const astrologers = useAstrologerStore(state => state.astrologers);
  const onlineExperts = useMemo(() => astrologers.filter(person => person.isOnline).slice(0, 2), [astrologers]);
  const consultations = useConsultationStore(state => state.consultations);
  const session = useMemo(() => consultations.find(item => ['pending', 'accepted', 'active'].includes(item.status)), [consultations]);
  const balance = useWalletStore(state => state.balance);
  const notifications = useNotificationStore(state => state.items);
  const unread = useMemo(() => notifications.filter(item => !item.isRead).length, [notifications]);
  const liveSessions = useLiveSessionStore(state => state.sessions);
  const toggleTheme = useThemeStore(state => state.toggle);
  const dark = useThemeStore(state => state.mode === 'dark');
  const colors = dark ? darkColors : lightColors;
  const firstName = user?.name.split(' ')[0] ?? profile.name.split(' ')[0];
  const date = new Date().toLocaleDateString('en-IN', {weekday: 'long', month: 'long', day: 'numeric'}).toUpperCase();
  return <SafeAreaView edges={['top']} style={[styles.safe, {backgroundColor: colors.background}]}>
    <ScrollView style={{backgroundColor: colors.background}} contentContainerStyle={styles.page}>
      <View style={styles.top}>
        <View><AppText tone="muted" style={styles.date}>{date}</AppText><AppText style={styles.greeting} weight="bold">Hello, {firstName} ✨</AppText></View>
        <View style={styles.headerActions}>
          <AppText style={styles.headerIcon} onPress={() => navigation.navigate('Notifications')}>♧{unread > 0 ? <AppText tone="accent" style={styles.badge}> {unread}</AppText> : null}</AppText>
          <AppText style={styles.headerIcon} onPress={toggleTheme}>☼</AppText>
        </View>
      </View>

      <AppCard style={styles.hero} onPress={() => navigation.navigate('ToolInput', {toolId: 'horoscope'})}>
        <AppText tone="accent" weight="bold">YOUR COSMIC NOTE</AppText>
        <AppText style={styles.heroTitle} weight="bold">A little clarity can change everything.</AppText>
        <AppText style={styles.heroBody}>Take a moment to align with what matters today.</AppText>
        <AppText style={styles.link} tone="accent" weight="bold">Explore your horoscope  →</AppText>
      </AppCard>

      <View style={styles.sectionHead}><AppText style={styles.sectionTitle} weight="bold">Your birth profile</AppText><AppText tone="accent" weight="bold" onPress={() => navigation.navigate('BirthDetails')}>Edit</AppText></View>
      <AppCard style={styles.birth} onPress={() => navigation.navigate('BirthDetails')}>
        <View style={styles.birthIcon}><AppText tone="accent">✧</AppText></View>
        <View style={styles.birthInfo}><AppText weight="bold">{profile.birthLocation ?? 'Add your birth location'}</AppText><AppText tone="muted" style={styles.birthMeta}>{profile.dateOfBirth ?? 'Add date of birth'}{profile.timeOfBirth ? ' · ' + profile.timeOfBirth : ''}</AppText></View>
        <AppText tone="accent" style={styles.chevron}>›</AppText>
      </AppCard>

      <View style={styles.sectionHead}><AppText style={styles.sectionTitle} weight="bold">Explore astrology</AppText><AppText tone="accent" weight="bold" onPress={() => navigation.navigate('Tabs', {screen: 'Astrology'} as never)}>See all</AppText></View>
      <View style={styles.grid}>{astrologyTools.slice(0, 4).map((tool, index) => <AppCard key={tool.id} onPress={() => navigation.navigate('ToolInput', {toolId: tool.id})} style={[styles.tool, {width: gridCardWidth}]}>
        <View style={[styles.icon, {backgroundColor: index % 2 ? colors.soft : '#F7EEDD'}]}><AppText style={styles.symbol} tone="accent">{tool.symbol}</AppText></View>
        <AppText weight="bold">{tool.title}</AppText><AppText tone="muted" style={styles.subtitle}>{tool.subtitle}</AppText>
      </AppCard>)}</View>

      <View style={styles.sectionHead}><AppText style={styles.sectionTitle} weight="bold">Your next consultation</AppText><AppText tone="accent" weight="bold" onPress={() => navigation.navigate('Tabs', {screen: 'Consultations'} as never)}>All sessions</AppText></View>
      {session ? <AppCard style={styles.consult} onPress={() => navigation.navigate('ConsultationDetails', {consultationId: session.id})}><Avatar name={session.astrologerName} size={48} /><View style={styles.consultInfo}><AppText weight="bold">{session.astrologerName}</AppText><AppText tone="muted" style={styles.subtitle}>{session.specialty} · {session.status}</AppText></View><AppText tone="accent" style={styles.chevron}>›</AppText></AppCard> : <AppCard style={styles.consult} onPress={() => navigation.navigate('Tabs', {screen: 'Astrologers'} as never)}><View style={styles.avatar}><AppText style={styles.avatarText}>✧</AppText></View><View style={styles.consultInfo}><AppText weight="bold">Find your astrologer</AppText><AppText tone="muted" style={styles.subtitle}>Get thoughtful personal guidance</AppText></View><AppText tone="accent" style={styles.chevron}>›</AppText></AppCard>}

      <View style={styles.sectionHead}><AppText style={styles.sectionTitle} weight="bold">Astrologers online</AppText><AppText tone="accent" weight="bold" onPress={() => navigation.navigate('Tabs', {screen: 'Astrologers'} as never)}>View all</AppText></View>
      <View style={styles.grid}>{onlineExperts.map(person => <AppCard key={person.id} style={[styles.expert, {width: gridCardWidth}]} onPress={() => navigation.navigate('AstrologerProfile', {astrologerId: person.id})}><Avatar name={person.name} size={44} color={person.avatarColor} /><AppText style={styles.expertName} weight="bold">{person.name}</AppText><AppText tone="muted" style={styles.subtitle}>{person.specialty}</AppText><RatingStars rating={person.rating} /><AppText tone="accent" style={styles.expertRate} weight="bold">₹{person.pricePerMinute}/min</AppText></AppCard>)}</View>

      <View style={styles.sectionHead}><AppText style={styles.sectionTitle} weight="bold">Your wallet</AppText><AppText tone="accent" weight="bold" onPress={() => navigation.navigate('Wallet')}>Details</AppText></View>
      <AppCard style={styles.wallet} onPress={() => navigation.navigate('Wallet')}><View><AppText tone="muted">AVAILABLE BALANCE</AppText><AppText style={styles.amount} weight="bold">₹{balance.toLocaleString('en-IN')}</AppText></View><AppText tone="accent" weight="bold">＋ Add funds</AppText></AppCard>

      <View style={styles.sectionHead}><AppText style={styles.sectionTitle} weight="bold">Live sessions</AppText><AppText tone="accent" weight="bold" onPress={() => navigation.navigate('LiveSessions')}>View all</AppText></View>
      {liveSessions.slice(0, 1).map(item => <AppCard key={item.id} style={styles.live} onPress={() => navigation.navigate('LiveSessionDetails', {sessionId: item.id})}><View style={styles.liveIcon}><AppText tone="accent">◉</AppText></View><View style={styles.consultInfo}><AppText weight="bold">{item.title}</AppText><AppText tone="muted" style={styles.subtitle}>{item.isLive ? 'Live now' : item.astrologerName}</AppText></View><AppText tone="accent" style={styles.chevron}>›</AppText></AppCard>)}
    </ScrollView>
  </SafeAreaView>;
}
const styles = StyleSheet.create({
  safe: {flex: 1}, page: {paddingHorizontal: 20, paddingTop: 12, paddingBottom: 34, width: '100%', maxWidth: 760, alignSelf: 'center'},
  top: {flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 22},
  date: {fontSize: 11, letterSpacing: 0.3}, greeting: {fontSize: 25, marginTop: 5}, headerActions: {flexDirection: 'row', alignItems: 'center', gap: 8},
  headerIcon: {fontSize: 23, padding: 8}, badge: {fontSize: 11, fontWeight: '700'}, hero: {padding: 22, backgroundColor: '#34213F', borderColor: '#34213F'},
  heroTitle: {color: '#FFFFFF', fontSize: 23, lineHeight: 30, marginTop: 14}, heroBody: {color: '#DED3E4', marginTop: 8, lineHeight: 21},
  link: {marginTop: 18}, sectionHead: {flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 25, marginBottom: 13},
  sectionTitle: {fontSize: 17}, birth: {flexDirection: 'row', alignItems: 'center', padding: 14}, birthIcon: {width: 42, height: 42, borderRadius: 14, alignItems: 'center', justifyContent: 'center', backgroundColor: '#F7EEDD'},
  birthInfo: {flex: 1, marginLeft: 12}, birthMeta: {fontSize: 11, marginTop: 3}, chevron: {fontSize: 26},
  grid: {flexDirection: 'row', flexWrap: 'wrap', gap: 12}, tool: {minHeight: 135, padding: 14},
  icon: {height: 38, width: 38, borderRadius: 13, alignItems: 'center', justifyContent: 'center', marginBottom: 10},
  symbol: {fontSize: 20}, subtitle: {fontSize: 11, marginTop: 4}, consult: {flexDirection: 'row', alignItems: 'center', padding: 14},
  avatar: {width: 48, height: 48, borderRadius: 16, backgroundColor: '#F0E9F2', alignItems: 'center', justifyContent: 'center'},
  avatarText: {fontSize: 23, color: '#4C315F'}, consultInfo: {flex: 1, marginLeft: 12}, expert: {padding: 14, minHeight: 145},
  expertName: {marginTop: 10}, expertRate: {fontSize: 12, marginTop: 7}, wallet: {flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'},
  amount: {fontSize: 24, marginTop: 5}, live: {flexDirection: 'row', alignItems: 'center', padding: 14}, liveIcon: {width: 42, height: 42, borderRadius: 14, alignItems: 'center', justifyContent: 'center', backgroundColor: '#F0E9F2'},
});

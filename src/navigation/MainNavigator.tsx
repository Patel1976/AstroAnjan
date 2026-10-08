import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {View, StyleSheet} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {HomeScreen} from '../screens/HomeScreen';
import {ToolsScreen} from '../screens/ToolsScreen';
import {AstrologerDirectoryScreen} from '../screens/AstrologerDirectoryScreen';
import {ConsultationsScreen} from '../screens/ConsultationsScreen';
import {ProfileScreen} from '../screens/ProfileScreen';
import {useThemeStore} from '../store/theme/themeStore';
import {darkColors, lightColors} from '../theme';
import {MainTabParamList} from './types';
const Tab = createBottomTabNavigator<MainTabParamList>();
const labels: Record<keyof MainTabParamList, string> = {Home: 'Home', Astrology: 'Astrology', Astrologers: 'Experts', Consultations: 'Sessions', Profile: 'Profile'};
const HomeIcon = ({color, focused}: {color: string; focused: boolean}) => <TabIcon kind="Home" color={color} focused={focused} />;
const AstrologyIcon = ({color, focused}: {color: string; focused: boolean}) => <TabIcon kind="Astrology" color={color} focused={focused} />;
const ExpertsIcon = ({color, focused}: {color: string; focused: boolean}) => <TabIcon kind="Experts" color={color} focused={focused} />;
const SessionsIcon = ({color, focused}: {color: string; focused: boolean}) => <TabIcon kind="Sessions" color={color} focused={focused} />;
const ProfileIcon = ({color, focused}: {color: string; focused: boolean}) => <TabIcon kind="Profile" color={color} focused={focused} />;

export function MainNavigator() {
  const dark = useThemeStore(state => state.mode === 'dark');
  const colors = dark ? darkColors : lightColors;
  const insets = useSafeAreaInsets();
  return <Tab.Navigator screenOptions={{
    headerShown: false,
    tabBarActiveTintColor: colors.primary,
    tabBarInactiveTintColor: colors.muted,
    tabBarStyle: {
      height: 72 + insets.bottom,
      paddingTop: 7,
      paddingBottom: insets.bottom + 8,
      backgroundColor: colors.surface,
      borderTopColor: colors.border,
      borderTopWidth: StyleSheet.hairlineWidth,
      elevation: 12,
    },
    tabBarItemStyle: {paddingTop: 2},
    tabBarLabelStyle: {fontSize: 10, fontWeight: '600', marginTop: 2},
  }}>
    <Tab.Screen name="Home" component={HomeScreen} options={{tabBarLabel: labels.Home, tabBarIcon: HomeIcon}} />
    <Tab.Screen name="Astrology" component={ToolsScreen} options={{tabBarLabel: labels.Astrology, tabBarIcon: AstrologyIcon}} />
    <Tab.Screen name="Astrologers" component={AstrologerDirectoryScreen} options={{tabBarLabel: labels.Astrologers, tabBarIcon: ExpertsIcon}} />
    <Tab.Screen name="Consultations" component={ConsultationsScreen} options={{tabBarLabel: labels.Consultations, tabBarIcon: SessionsIcon}} />
    <Tab.Screen name="Profile" component={ProfileScreen} options={{tabBarLabel: labels.Profile, tabBarIcon: ProfileIcon}} />
  </Tab.Navigator>;
}

type TabIconProps = {kind: 'Home' | 'Astrology' | 'Experts' | 'Sessions' | 'Profile'; color: string; focused: boolean};

function TabIcon({kind, color, focused}: TabIconProps) {
  const dark = useThemeStore(state => state.mode === 'dark');
  const activeBackground = dark ? darkColors.warmSoft : lightColors.warmSoft;
  return (
    <View style={[styles.iconWrap, focused && {backgroundColor: activeBackground}]}>
      {kind === 'Home' && <HomeGlyph color={color} />}
      {kind === 'Astrology' && <AstrologyGlyph color={color} />}
      {kind === 'Experts' && <ExpertsGlyph color={color} />}
      {kind === 'Sessions' && <SessionsGlyph color={color} />}
      {kind === 'Profile' && <ProfileGlyph color={color} />}
    </View>
  );
}

function HomeGlyph({color}: {color: string}) {
  return <View style={styles.glyph}>
    <View style={[styles.roofLeft, {backgroundColor: color}]} />
    <View style={[styles.roofRight, {backgroundColor: color}]} />
    <View style={[styles.house, {borderColor: color}]} />
    <View style={[styles.door, {backgroundColor: color}]} />
  </View>;
}

function AstrologyGlyph({color}: {color: string}) {
  return <View style={styles.glyph}>
    <View style={[styles.starVertical, {backgroundColor: color}]} />
    <View style={[styles.starHorizontal, {backgroundColor: color}]} />
    <View style={[styles.starDiagonalA, {backgroundColor: color}]} />
    <View style={[styles.starDiagonalB, {backgroundColor: color}]} />
  </View>;
}

function ExpertsGlyph({color}: {color: string}) {
  return <View style={styles.glyph}>
    <View style={[styles.expertHead, styles.expertHeadLeft, {borderColor: color}]} />
    <View style={[styles.expertHead, styles.expertHeadRight, {borderColor: color}]} />
    <View style={[styles.expertBody, styles.expertBodyLeft, {borderColor: color}]} />
    <View style={[styles.expertBody, styles.expertBodyRight, {borderColor: color}]} />
  </View>;
}

function SessionsGlyph({color}: {color: string}) {
  return <View style={styles.glyph}>
    <View style={[styles.messageBox, {borderColor: color}]} />
    <View style={[styles.messageTail, {borderColor: color}]} />
    <View style={[styles.messageDot, styles.messageDotOne, {backgroundColor: color}]} />
    <View style={[styles.messageDot, styles.messageDotTwo, {backgroundColor: color}]} />
    <View style={[styles.messageDot, styles.messageDotThree, {backgroundColor: color}]} />
  </View>;
}

function ProfileGlyph({color}: {color: string}) {
  return <View style={styles.glyph}>
    <View style={[styles.profileHead, {borderColor: color}]} />
    <View style={[styles.profileShoulders, {borderColor: color}]} />
  </View>;
}

const styles = StyleSheet.create({
  iconWrap: {width: 42, height: 30, borderRadius: 15, alignItems: 'center', justifyContent: 'center'},
  glyph: {width: 22, height: 22, alignItems: 'center', justifyContent: 'center'},
  roofLeft: {position: 'absolute', width: 12, height: 2, left: 2, top: 6, borderRadius: 1, transform: [{rotate: '-42deg'}]},
  roofRight: {position: 'absolute', width: 12, height: 2, right: 2, top: 6, borderRadius: 1, transform: [{rotate: '42deg'}]},
  house: {position: 'absolute', width: 14, height: 11, top: 9, borderWidth: 1.8, borderTopWidth: 0, borderBottomLeftRadius: 2, borderBottomRightRadius: 2},
  door: {position: 'absolute', width: 4, height: 7, top: 13, borderTopLeftRadius: 2, borderTopRightRadius: 2},
  starVertical: {position: 'absolute', width: 2, height: 18, borderRadius: 1},
  starHorizontal: {position: 'absolute', width: 18, height: 2, borderRadius: 1},
  starDiagonalA: {position: 'absolute', width: 2, height: 15, borderRadius: 1, transform: [{rotate: '45deg'}]},
  starDiagonalB: {position: 'absolute', width: 2, height: 15, borderRadius: 1, transform: [{rotate: '-45deg'}]},
  expertHead: {position: 'absolute', width: 8, height: 8, borderRadius: 4, borderWidth: 1.7, top: 2},
  expertHeadLeft: {left: 3},
  expertHeadRight: {right: 3},
  expertBody: {position: 'absolute', width: 11, height: 8, borderWidth: 1.7, borderBottomWidth: 0, borderTopLeftRadius: 7, borderTopRightRadius: 7, bottom: 2},
  expertBodyLeft: {left: 0},
  expertBodyRight: {right: 0},
  messageBox: {position: 'absolute', width: 18, height: 14, borderWidth: 1.8, borderRadius: 5, top: 2},
  messageTail: {position: 'absolute', width: 6, height: 6, left: 5, top: 13, borderLeftWidth: 1.8, borderBottomWidth: 1.8, transform: [{rotate: '-15deg'}]},
  messageDot: {position: 'absolute', width: 2.5, height: 2.5, borderRadius: 2, top: 8},
  messageDotOne: {left: 6},
  messageDotTwo: {left: 10},
  messageDotThree: {left: 14},
  profileHead: {position: 'absolute', width: 8, height: 8, borderRadius: 4, borderWidth: 1.8, top: 1},
  profileShoulders: {position: 'absolute', width: 17, height: 9, borderWidth: 1.8, borderBottomWidth: 0, borderTopLeftRadius: 10, borderTopRightRadius: 10, bottom: 1},
});

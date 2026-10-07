import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Text, StyleSheet} from 'react-native';
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
const symbols: Record<keyof MainTabParamList, string> = {Home: 'H', Astrology: 'A', Astrologers: 'E', Consultations: 'C', Profile: 'P'};
const HomeIcon = ({color}: {color: string}) => <TabIcon label={symbols.Home} color={color} />;
const AstrologyIcon = ({color}: {color: string}) => <TabIcon label={symbols.Astrology} color={color} />;
const AstrologersIcon = ({color}: {color: string}) => <TabIcon label={symbols.Astrologers} color={color} />;
const ConsultationsIcon = ({color}: {color: string}) => <TabIcon label={symbols.Consultations} color={color} />;
const ProfileIcon = ({color}: {color: string}) => <TabIcon label={symbols.Profile} color={color} />;

export function MainNavigator() {
  const dark = useThemeStore(state => state.mode === 'dark');
  const colors = dark ? darkColors : lightColors;
  return <Tab.Navigator screenOptions={{
    headerShown: false, tabBarActiveTintColor: colors.primary, tabBarInactiveTintColor: colors.muted,
    tabBarStyle: {height: 66, paddingTop: 7, paddingBottom: 8, backgroundColor: colors.surface, borderTopColor: colors.border},
    tabBarLabelStyle: {fontSize: 10, fontWeight: '600'},
  }}>
    <Tab.Screen name="Home" component={HomeScreen} options={{tabBarLabel: labels.Home, tabBarIcon: HomeIcon}} />
    <Tab.Screen name="Astrology" component={ToolsScreen} options={{tabBarLabel: labels.Astrology, tabBarIcon: AstrologyIcon}} />
    <Tab.Screen name="Astrologers" component={AstrologerDirectoryScreen} options={{tabBarLabel: labels.Astrologers, tabBarIcon: AstrologersIcon}} />
    <Tab.Screen name="Consultations" component={ConsultationsScreen} options={{tabBarLabel: labels.Consultations, tabBarIcon: ConsultationsIcon}} />
    <Tab.Screen name="Profile" component={ProfileScreen} options={{tabBarLabel: labels.Profile, tabBarIcon: ProfileIcon}} />
  </Tab.Navigator>;
}
function TabIcon({label, color}: {label: string; color: string}) { return <Text style={[styles.icon, {color}]}>{label}</Text>; }
const styles = StyleSheet.create({icon: {fontSize: 14, fontWeight: '700'}});

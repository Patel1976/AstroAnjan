import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {AstrologerProfileScreen} from '../screens/AstrologerProfileScreen';
import {AstrologyResultScreen} from '../screens/AstrologyResultScreen';
import {BirthDetailsScreen} from '../screens/BirthDetailsScreen';
import {ConsultationChatScreen} from '../screens/ConsultationChatScreen';
import {ConsultationDetailsScreen} from '../screens/ConsultationDetailsScreen';
import {EditProfileScreen} from '../screens/EditProfileScreen';
import {LiveSessionDetailsScreen} from '../screens/LiveSessionDetailsScreen';
import {LiveSessionsScreen} from '../screens/LiveSessionsScreen';
import {LocationPickerScreen} from '../screens/LocationPickerScreen';
import {MainNavigator} from './MainNavigator';
import {MainStackParamList} from './types';
import {NotificationsScreen} from '../screens/NotificationsScreen';
import {ReviewFormScreen} from '../screens/ReviewFormScreen';
import {ReviewsScreen} from '../screens/ReviewsScreen';
import {ToolInputScreen} from '../screens/ToolInputScreen';
import {WalletScreen} from '../screens/WalletScreen';
const Stack = createNativeStackNavigator<MainStackParamList>();
export function MainStackNavigator() {
  return <Stack.Navigator screenOptions={{headerShown: false, animation: 'slide_from_right'}}>
    <Stack.Screen name="Tabs" component={MainNavigator} />
    <Stack.Screen name="EditProfile" component={EditProfileScreen} />
    <Stack.Screen name="BirthDetails" component={BirthDetailsScreen} />
    <Stack.Screen name="LocationPicker" component={LocationPickerScreen} />
    <Stack.Screen name="ToolInput" component={ToolInputScreen} />
    <Stack.Screen name="AstrologyResult" component={AstrologyResultScreen} />
    <Stack.Screen name="AstrologerProfile" component={AstrologerProfileScreen} />
    <Stack.Screen name="ConsultationDetails" component={ConsultationDetailsScreen} />
    <Stack.Screen name="ConsultationChat" component={ConsultationChatScreen} />
    <Stack.Screen name="Wallet" component={WalletScreen} />
    <Stack.Screen name="ReviewForm" component={ReviewFormScreen} />
    <Stack.Screen name="Reviews" component={ReviewsScreen} />
    <Stack.Screen name="Notifications" component={NotificationsScreen} />
    <Stack.Screen name="LiveSessions" component={LiveSessionsScreen} />
    <Stack.Screen name="LiveSessionDetails" component={LiveSessionDetailsScreen} />
  </Stack.Navigator>;
}

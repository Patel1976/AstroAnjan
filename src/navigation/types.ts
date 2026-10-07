export type AuthStackParamList = {
  Splash: undefined;
  Login: undefined;
  Register: undefined;
  PhoneOtp: undefined;
  ForgotPassword: undefined;
};
export type MainTabParamList = {
  Home: undefined;
  Astrology: undefined;
  Astrologers: undefined;
  Consultations: undefined;
  Profile: undefined;
};

import {NavigatorScreenParams} from '@react-navigation/native';
export type MainStackParamList = {
  Tabs: NavigatorScreenParams<MainTabParamList> | undefined;
  EditProfile: undefined;
  BirthDetails: undefined;
  LocationPicker: undefined;
  ToolInput: {toolId: string};
  AstrologyResult: {toolId: string};
  AstrologerProfile: {astrologerId: string};
  ConsultationDetails: {consultationId: string};
  ConsultationChat: {consultationId: string};
  Wallet: undefined;
  ReviewForm: {consultationId: string};
  Reviews: undefined;
  Notifications: undefined;
  LiveSessions: undefined;
  LiveSessionDetails: {sessionId: string};
  Settings: undefined;
};

import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {LoginScreen} from '../screens/LoginScreen';
import {RegisterScreen} from '../screens/RegisterScreen';
import {PhoneOtpScreen} from '../screens/PhoneOtpScreen';
import {ForgotPasswordScreen} from '../screens/ForgotPasswordScreen';
import {SplashScreen} from '../screens/SplashScreen';
import {AuthStackParamList} from './types';
const Stack = createNativeStackNavigator<AuthStackParamList>();
export function AuthNavigator() {
  return <Stack.Navigator initialRouteName="Login" screenOptions={{headerShown: false, animation: 'fade'}}>
    <Stack.Screen name="Splash" component={SplashScreen} />
    <Stack.Screen name="Login" component={LoginScreen} />
    <Stack.Screen name="Register" component={RegisterScreen} />
    <Stack.Screen name="PhoneOtp" component={PhoneOtpScreen} />
    <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
  </Stack.Navigator>;
}

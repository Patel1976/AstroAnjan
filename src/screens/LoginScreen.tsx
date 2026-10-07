import React, {useState} from 'react';
import {Alert, KeyboardAvoidingView, Platform, Pressable, StyleSheet, View} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {AppButton, AppInput, AppText} from '../components';
import {useAuthStore} from '../store/auth/authStore';
import {useThemeStore} from '../store/theme/themeStore';
import {darkColors, lightColors} from '../theme';
import {SafeAreaView} from 'react-native-safe-area-context';
import {AuthStackParamList} from '../navigation/types';
type Props = NativeStackScreenProps<AuthStackParamList, 'Login'>;
export function LoginScreen({navigation}: Props) {
  const [email, setEmail] = useState('anjan@example.com');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(true);
  const login = useAuthStore(state => state.login);
  const loginWithGoogle = useAuthStore(state => state.loginWithGoogle);
  const [error, setError] = useState('');
  const dark = useThemeStore(state => state.mode === 'dark');
  const colors = dark ? darkColors : lightColors;
  return <SafeAreaView style={[styles.page, {backgroundColor: colors.background}]}><KeyboardAvoidingView style={styles.keyboard} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
    <View style={styles.content}>
      <AppText tone="accent" style={styles.mark}>✦</AppText>
      <AppText style={styles.title} weight="bold">Welcome back</AppText>
      <AppText tone="muted" style={styles.intro}>Your path to clarity starts here.</AppText>
      <AppText style={styles.label} weight="bold">Email address</AppText>
      <AppInput value={email} onChangeText={setEmail} autoCapitalize="none" keyboardType="email-address" placeholder="you@example.com" />
      <AppText style={styles.label} weight="bold">Password</AppText>
      <AppInput value={password} onChangeText={setPassword} secureTextEntry placeholder="Enter your password" />
      <View style={styles.options}><Pressable onPress={() => setRemember(value => !value)} style={styles.remember}><View style={[styles.checkbox, {borderColor: colors.primary, backgroundColor: remember ? colors.primary : 'transparent'}]} /> <AppText tone="muted">Remember me</AppText></Pressable><AppText tone="accent" onPress={() => navigation.navigate('ForgotPassword')}>Forgot password?</AppText></View>
      {error ? <AppText tone="accent" accessibilityRole="alert">{error}</AppText> : null}
      <AppButton title="Continue" onPress={async () => {if (!password.trim()) {setError('Enter your password to continue.'); return;} try {const accepted = await login(email, password, remember); setError(accepted ? '' : 'That password does not match this local account. Use Forgot password to reset it.');} catch {setError('Secure sign-in is unavailable on this device. Please try again.');}}} />
      <View style={styles.google}><AppButton title="Continue with Google" secondary onPress={() => {Alert.alert('Demo sign-in', 'No Google account is connected. Continuing with a local demo session.'); loginWithGoogle(email, remember);}} /></View>
      <AppText style={styles.register} tone="muted">New here? <AppText tone="accent" weight="bold" onPress={() => navigation.navigate('Register')}>Create an account</AppText></AppText>
      <AppText style={styles.otp} tone="muted" onPress={() => navigation.navigate('PhoneOtp')}>Continue with phone number</AppText>
    </View>
  </KeyboardAvoidingView></SafeAreaView>;
}
const styles = StyleSheet.create({page: {flex: 1}, keyboard: {flex: 1, justifyContent: 'center'}, content: {paddingHorizontal: 26}, mark: {fontSize: 38, marginBottom: 16}, title: {fontSize: 32, letterSpacing: -0.8}, intro: {marginTop: 8, marginBottom: 20}, label: {marginBottom: 8, marginTop: 14}, options: {flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginVertical: 17}, remember: {flexDirection: 'row', alignItems: 'center', gap: 8}, checkbox: {width: 17, height: 17, borderWidth: 1, borderRadius: 5}, google: {marginTop: 10}, register: {textAlign: 'center', marginTop: 24}, otp: {textAlign: 'center', marginTop: 18}});

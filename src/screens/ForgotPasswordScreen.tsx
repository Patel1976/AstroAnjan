import React, {useState} from 'react';
import {Alert, StyleSheet, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {AppButton, AppHeader, AppInput, AppText} from '../components';
import {useAuthStore} from '../store/auth/authStore';
import {useThemeStore} from '../store/theme/themeStore';
import {darkColors, lightColors} from '../theme';
export function ForgotPasswordScreen() {
  const [email, setEmail] = useState('');
  const requestReset = useAuthStore(state => state.requestPasswordReset);
  const dark = useThemeStore(state => state.mode === 'dark'); const colors = dark ? darkColors : lightColors;
  const submit = () => Alert.alert(requestReset(email.trim()) ? 'Demo reset ready' : 'Enter a valid email', requestReset(email.trim()) ? 'A real reset email is not sent in this demo.' : 'Check the email address and try again.');
  return <SafeAreaView edges={['top']} style={[styles.safe, {backgroundColor: colors.background}]}><View style={styles.page}>
    <AppHeader title="Reset password" />
    <AppText style={styles.title} weight="bold">Forgot your password?</AppText><AppText tone="muted" style={styles.subtitle}>Enter your account email to continue with the local reset flow.</AppText>
    <AppText style={styles.label} weight="bold">Email address</AppText><AppInput value={email} onChangeText={setEmail} autoCapitalize="none" keyboardType="email-address" placeholder="you@example.com" />
    <View style={styles.button}><AppButton title="Continue" onPress={submit} /></View>
    <AppText tone="muted" style={styles.note}>No email is sent by this demo app.</AppText>
  </View></SafeAreaView>;
}
const styles = StyleSheet.create({safe: {flex: 1}, page: {flex: 1, padding: 22, justifyContent: 'center'}, title: {fontSize: 27, marginTop: 14}, subtitle: {marginTop: 7, lineHeight: 21}, label: {marginTop: 24, marginBottom: 8}, button: {marginTop: 24}, note: {textAlign: 'center', marginTop: 18, fontSize: 12}});

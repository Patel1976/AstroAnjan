import React, {useState} from 'react';
import {Alert, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, View} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {SafeAreaView} from 'react-native-safe-area-context';
import {AppButton, AppHeader, AppInput, AppText} from '../components';
import {AuthStackParamList} from '../navigation/types';
import {useAuthStore} from '../store/auth/authStore';
import {useThemeStore} from '../store/theme/themeStore';
import {darkColors, lightColors} from '../theme';

type Props = NativeStackScreenProps<AuthStackParamList, 'ForgotPassword'>;

export function ForgotPasswordScreen({navigation}: Props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [stage, setStage] = useState<'email' | 'newPassword'>('email');
  const [busy, setBusy] = useState(false);
  const resetPassword = useAuthStore(state => state.resetPassword);
  const requestPasswordReset = useAuthStore(state => state.requestPasswordReset);
  const dark = useThemeStore(state => state.mode === 'dark');
  const colors = dark ? darkColors : lightColors;

  const continueReset = () => {
    const normalized = email.trim();
    if (!requestPasswordReset(normalized) || !normalized.includes('.')) {
      Alert.alert('Check your email', 'Enter a valid account email to continue.');
      return;
    }
    setEmail(normalized);
    setStage('newPassword');
  };

  const savePassword = async () => {
    if (password.length < 6) {
      Alert.alert('Password too short', 'Use at least 6 characters.');
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert('Passwords do not match', 'Enter the same password in both fields.');
      return;
    }
    setBusy(true);
    try {
      const saved = await resetPassword(email, password);
      if (!saved) throw new Error('Password could not be saved securely on this device.');
      Alert.alert('Password updated', 'Your local demo password has been changed. You can now sign in with it.', [
        {text: 'Continue to sign in', onPress: () => navigation.navigate('Login')},
      ]);
    } catch (error) {
      Alert.alert('Could not update password', error instanceof Error ? error.message : 'Please try again.');
    } finally {
      setBusy(false);
    }
  };

  return <SafeAreaView edges={['top']} style={[styles.safe, {backgroundColor: colors.background}]}>
    <KeyboardAvoidingView style={styles.safe} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <ScrollView contentContainerStyle={styles.page} keyboardShouldPersistTaps="handled">
        <AppHeader title="Reset password" />
        <AppText style={styles.title} weight="bold">{stage === 'email' ? 'Forgot your password?' : 'Choose a new password'}</AppText>
        <AppText tone="muted" style={styles.subtitle}>{stage === 'email' ? 'Enter your account email to continue with the local reset flow.' : `Set a new password for ${email}.`}</AppText>
        {stage === 'email' ? <>
          <AppText style={styles.label} weight="bold">Email address</AppText>
          <AppInput value={email} onChangeText={setEmail} autoCapitalize="none" keyboardType="email-address" autoComplete="email" placeholder="you@example.com" />
          <View style={styles.button}><AppButton title="Continue" onPress={continueReset} /></View>
        </> : <>
          <AppText style={styles.label} weight="bold">New password</AppText>
          <AppInput value={password} onChangeText={setPassword} secureTextEntry autoComplete="new-password" placeholder="At least 6 characters" />
          <AppText style={styles.label} weight="bold">Confirm new password</AppText>
          <AppInput value={confirmPassword} onChangeText={setConfirmPassword} secureTextEntry autoComplete="new-password" placeholder="Enter it again" />
          <View style={styles.button}><AppButton title={busy ? 'Saving…' : 'Save new password'} onPress={savePassword} disabled={busy} /></View>
          <AppText tone="accent" style={styles.back} onPress={() => setStage('email')}>Use a different email</AppText>
        </>}
        <AppText tone="muted" style={styles.note}>This mock flow stores credentials in the device secure store. No email or server request is used.</AppText>
      </ScrollView>
    </KeyboardAvoidingView>
  </SafeAreaView>;
}

const styles = StyleSheet.create({safe: {flex: 1}, page: {flexGrow: 1, padding: 22, justifyContent: 'center'}, title: {fontSize: 27, marginTop: 14}, subtitle: {marginTop: 7, lineHeight: 21}, label: {marginTop: 24, marginBottom: 8}, button: {marginTop: 24}, back: {textAlign: 'center', marginTop: 18}, note: {textAlign: 'center', marginTop: 24, fontSize: 12, lineHeight: 18}});

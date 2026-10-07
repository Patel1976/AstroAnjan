import React, {useState} from 'react';
import {Alert, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {AppButton, AppHeader, AppInput, AppText} from '../components';
import {useAuthStore} from '../store/auth/authStore';
import {useThemeStore} from '../store/theme/themeStore';
import {darkColors, lightColors} from '../theme';
export function RegisterScreen() {
  const [name, setName] = useState(''); const [email, setEmail] = useState('');
  const [phone, setPhone] = useState(''); const [password, setPassword] = useState('');
  const register = useAuthStore(state => state.register);
  const dark = useThemeStore(state => state.mode === 'dark'); const colors = dark ? darkColors : lightColors;
  const submit = () => {
    if (!name.trim() || !email.includes('@') || password.length < 6) {
      Alert.alert('Check your details', 'Enter your name, a valid email, and a password with at least 6 characters.');
      return;
    }
    register(name, email, phone, password, true);
  };
  return <SafeAreaView edges={['top']} style={[styles.safe, {backgroundColor: colors.background}]}><KeyboardAvoidingView style={styles.safe} behavior={Platform.OS === 'ios' ? 'padding' : undefined}><ScrollView contentContainerStyle={styles.page} keyboardShouldPersistTaps="handled">
    <AppHeader title="Create account" />
    <AppText style={styles.title} weight="bold">Begin your journey</AppText><AppText tone="muted" style={styles.subtitle}>Create your free Astro Anjan account.</AppText>
    <AppText style={styles.label} weight="bold">Full name</AppText><AppInput value={name} onChangeText={setName} placeholder="Your name" />
    <AppText style={styles.label} weight="bold">Email address</AppText><AppInput value={email} onChangeText={setEmail} placeholder="you@example.com" autoCapitalize="none" keyboardType="email-address" />
    <AppText style={styles.label} weight="bold">Phone (optional)</AppText><AppInput value={phone} onChangeText={setPhone} placeholder="+91" keyboardType="phone-pad" />
    <AppText style={styles.label} weight="bold">Password</AppText><AppInput value={password} onChangeText={setPassword} placeholder="At least 6 characters" secureTextEntry />
    <View style={styles.button}><AppButton title="Create account" onPress={submit} /></View>
    <AppText tone="muted" style={styles.legal}>Demo account only. Your details stay on this device.</AppText>
  </ScrollView></KeyboardAvoidingView></SafeAreaView>;
}
const styles = StyleSheet.create({safe: {flex: 1}, page: {padding: 22, paddingBottom: 32}, title: {fontSize: 27, marginTop: 10}, subtitle: {marginTop: 6}, label: {marginTop: 17, marginBottom: 7}, button: {marginTop: 25}, legal: {textAlign: 'center', marginTop: 18, fontSize: 12}});

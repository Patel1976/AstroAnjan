import React, {useState} from 'react';
import {Alert, StyleSheet, View} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {SafeAreaView} from 'react-native-safe-area-context';
import {AppButton, AppHeader, AppInput, AppText} from '../components';
import {AuthStackParamList} from '../navigation/types';
import {useAuthStore} from '../store/auth/authStore';
import {useThemeStore} from '../store/theme/themeStore';
import {darkColors, lightColors} from '../theme';
type Props = NativeStackScreenProps<AuthStackParamList, 'PhoneOtp'>;
export function PhoneOtpScreen({navigation}: Props) {
  const [phone, setPhone] = useState(''); const [code, setCode] = useState(''); const [sent, setSent] = useState(false);
  const verifyPhone = useAuthStore(state => state.verifyPhone);
  const dark = useThemeStore(state => state.mode === 'dark'); const colors = dark ? darkColors : lightColors;
  const verify = () => {
    if (!verifyPhone(phone, code, true)) {Alert.alert('Code not recognized', 'Use 123456 for this local demo.');}
  };
  return <SafeAreaView edges={['top']} style={[styles.safe, {backgroundColor: colors.background}]}><View style={styles.page}>
    <AppHeader title="Phone sign in" />
    <AppText style={styles.title} weight="bold">{sent ? 'Enter your code' : 'Continue with phone'}</AppText>
    <AppText tone="muted" style={styles.subtitle}>{sent ? 'A demo code is shown here; no SMS is sent.' : 'We will use a local demo verification flow.'}</AppText>
    <AppText style={styles.label} weight="bold">Phone number</AppText><AppInput value={phone} onChangeText={setPhone} keyboardType="phone-pad" placeholder="+91 98765 43210" editable={!sent} />
    {sent ? <><AppText style={styles.label} weight="bold">Verification code</AppText><AppInput value={code} onChangeText={setCode} keyboardType="number-pad" placeholder="123456" maxLength={6} /><AppText tone="accent" style={styles.demoCode}>Demo code: 123456</AppText></> : null}
    <View style={styles.button}><AppButton title={sent ? 'Verify and continue' : 'Send demo code'} onPress={() => {if (!phone.trim()) {Alert.alert('Phone required', 'Enter a phone number to continue.'); return;} if (sent) verify(); else setSent(true);}} /></View>
    {sent ? <AppText tone="muted" style={styles.resend} onPress={() => {setCode(''); setSent(false);}}>Change phone number</AppText> : null}
    <AppText tone="muted" style={styles.back} onPress={() => navigation.navigate('Login')}>Back to email sign in</AppText>
  </View></SafeAreaView>;
}
const styles = StyleSheet.create({safe: {flex: 1}, page: {flex: 1, padding: 22, justifyContent: 'center'}, title: {fontSize: 27, marginTop: 14}, subtitle: {marginTop: 7, lineHeight: 21}, label: {marginTop: 20, marginBottom: 8}, demoCode: {marginTop: 10}, button: {marginTop: 26}, resend: {textAlign: 'center', marginTop: 18}, back: {textAlign: 'center', marginTop: 25}});

import React, {useState} from 'react';
import {Alert, ScrollView, StyleSheet, View} from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker';
import {SafeAreaView} from 'react-native-safe-area-context';
import {AppButton, AppCard, AppHeader, AppInput, AppText, Avatar} from '../components';
import {useProfileStore} from '../store/profile/profileStore';
import {useThemeStore} from '../store/theme/themeStore';
import {darkColors, lightColors} from '../theme';
export function EditProfileScreen() {
  const profile = useProfileStore(state => state.profile);
  const updateProfile = useProfileStore(state => state.updateProfile);
  const removeImage = useProfileStore(state => state.removeImage);
  const [name, setName] = useState(profile.name);
  const [email, setEmail] = useState(profile.email);
  const [phone, setPhone] = useState(profile.phone);
  const [gender, setGender] = useState(profile.gender ?? 'other');
  const dark = useThemeStore(state => state.mode === 'dark');
  const colors = dark ? darkColors : lightColors;
  const choosePhoto = async () => {
    const result = await launchImageLibrary({mediaType: 'photo', selectionLimit: 1});
    const uri = result.assets?.[0]?.uri;
    if (uri) updateProfile({imageUri: uri});
  };
  const save = () => {
    if (!name.trim() || !email.includes('@')) {
      Alert.alert('Check your details', 'Enter a name and a valid email address.');
      return;
    }
    updateProfile({name: name.trim(), email: email.trim(), phone: phone.trim(), gender});
      Alert.alert('Profile updated', 'Your demo profile has been saved.');
  };
  return <SafeAreaView edges={['top']} style={[styles.safe, {backgroundColor: colors.background}]}><ScrollView contentContainerStyle={styles.page}>
    <AppHeader title="Edit profile" />
    <AppCard style={styles.photoCard}>
      <Avatar name={name || 'A'} uri={profile.imageUri} size={72} />
      <View style={styles.photoInfo}>
        <AppText weight="bold" style={styles.photoName}>{name || 'Your name'}</AppText>
        <View style={styles.photoActions}>
          <AppText tone="accent" weight="bold" onPress={choosePhoto}>Choose photo</AppText>
          {profile.imageUri ? <AppText style={styles.remove} tone="muted" onPress={removeImage}>Remove</AppText> : null}
        </View>
      </View>
    </AppCard>
    <AppText style={styles.label} weight="bold">Full name</AppText><AppInput value={name} onChangeText={setName} placeholder="Your name" />
    <AppText style={styles.label} weight="bold">Email</AppText><AppInput value={email} onChangeText={setEmail} autoCapitalize="none" keyboardType="email-address" placeholder="you@example.com" />
    <AppText style={styles.label} weight="bold">Phone</AppText><AppInput value={phone} onChangeText={setPhone} keyboardType="phone-pad" placeholder="Phone number" />
    <AppText style={styles.label} weight="bold">Gender</AppText><View style={styles.genders}>{(['female', 'male', 'other'] as const).map(item => <AppText key={item} onPress={() => setGender(item)} style={[styles.gender, {backgroundColor: gender === item ? colors.soft : colors.surface, color: gender === item ? colors.primary : colors.muted}]}>{item[0].toUpperCase() + item.slice(1)}</AppText>)}</View>
    <View style={styles.button}><AppButton title="Save changes" onPress={save} /></View>
  </ScrollView></SafeAreaView>;
}
const styles = StyleSheet.create({safe: {flex: 1}, page: {paddingHorizontal: 20, paddingTop: 12, paddingBottom: 36, width: '100%', maxWidth: 760, alignSelf: 'center'}, photoCard: {flexDirection: 'row', alignItems: 'center', gap: 16, padding: 16, marginBottom: 4}, photoInfo: {flex: 1}, photoName: {fontSize: 17}, photoActions: {flexDirection: 'row', gap: 14, marginTop: 8}, remove: {fontSize: 13}, label: {marginTop: 18, marginBottom: 8}, genders: {flexDirection: 'row', gap: 10}, gender: {paddingVertical: 12, paddingHorizontal: 18, overflow: 'hidden', borderRadius: 14}, button: {marginTop: 28}});

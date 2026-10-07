import React, {useMemo, useState} from 'react';
import {KeyboardAvoidingView, Platform, ScrollView, StyleSheet, View} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {SafeAreaView} from 'react-native-safe-area-context';
import {AppButton, AppHeader, AppInput, AppText, EmptyState, MessageBubble} from '../components';
import {MainStackParamList} from '../navigation/types';
import {useConsultationStore} from '../store/consultations/consultationStore';
import {useThemeStore} from '../store/theme/themeStore';
import {darkColors, lightColors} from '../theme';
type Props = NativeStackScreenProps<MainStackParamList, 'ConsultationChat'>;
export function ConsultationChatScreen({route}: Props) {
  const consultation = useConsultationStore(state => state.getById(route.params.consultationId));
  const allMessages = useConsultationStore(state => state.messages);
  const sendMessage = useConsultationStore(state => state.sendMessage);
  const [text, setText] = useState('');
  const dark = useThemeStore(state => state.mode === 'dark'); const colors = dark ? darkColors : lightColors;
  const messages = useMemo(() => allMessages.filter(item => item.consultationId === route.params.consultationId), [allMessages, route.params.consultationId]);
  const send = () => {if (text.trim()) {sendMessage(route.params.consultationId, text.trim()); setText('');}};
  return <SafeAreaView edges={['top']} style={[styles.safe, {backgroundColor: colors.background}]}><KeyboardAvoidingView style={styles.safe} behavior={Platform.OS === 'ios' ? 'padding' : undefined} keyboardVerticalOffset={12}>
    <View style={styles.header}><AppHeader title={consultation?.astrologerName ?? 'Chat'} right={<AppText style={[styles.live, {color: colors.success}]}>● {consultation?.status === 'active' ? 'Active' : 'History'}</AppText>} /></View>
    <ScrollView contentContainerStyle={styles.messages} keyboardShouldPersistTaps="handled">{messages.map(message => <MessageBubble key={message.id} message={message} />)}{messages.length === 0 ? <EmptyState title="Start the conversation" message="Send your first message to begin this demo chat." /> : null}</ScrollView>
    <View style={[styles.composer, {borderColor: colors.border, backgroundColor: colors.surface}]}><AppInput value={text} onChangeText={setText} placeholder="Write a message..." style={styles.input} onSubmitEditing={send} returnKeyType="send" /><View style={styles.send}><AppButton title="Send" onPress={send} /></View></View>
  </KeyboardAvoidingView></SafeAreaView>;
}
const styles = StyleSheet.create({safe: {flex: 1}, header: {paddingHorizontal: 20, paddingTop: 8}, live: {fontSize: 11}, messages: {paddingHorizontal: 18, paddingBottom: 20, flexGrow: 1, justifyContent: 'flex-end'}, composer: {borderTopWidth: StyleSheet.hairlineWidth, flexDirection: 'row', alignItems: 'center', paddingHorizontal: 12, paddingVertical: 10}, input: {flex: 1}, send: {width: 80, marginLeft: 9}});

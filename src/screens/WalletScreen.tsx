import React, {useState} from 'react';
import {Alert, ScrollView, StyleSheet, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {AppButton, AppCard, AppHeader, AppText, EmptyState} from '../components';
import {useWalletStore} from '../store/wallet/walletStore';
import {useThemeStore} from '../store/theme/themeStore';
import {darkColors, lightColors} from '../theme';
const presets = [100, 250, 500, 1000];
export function WalletScreen() {
  const balance = useWalletStore(state => state.balance);
  const transactions = useWalletStore(state => state.transactions);
  const createOrder = useWalletStore(state => state.createOrder);
  const [amount, setAmount] = useState(500);
  const dark = useThemeStore(state => state.mode === 'dark'); const colors = dark ? darkColors : lightColors;
  const order = () => {createOrder(amount); Alert.alert('Order created', 'A mock payment order was created. No payment was processed.');};
  return <SafeAreaView edges={['top']} style={[styles.safe, {backgroundColor: colors.background}]}><ScrollView contentContainerStyle={styles.page}>
    <AppHeader title="My wallet" />
    <AppCard style={styles.balance}><AppText tone="muted">AVAILABLE BALANCE</AppText><AppText style={styles.amount} weight="bold">₹{balance.toLocaleString('en-IN')}</AppText><AppText tone="muted" style={styles.caption}>Use your balance for demo consultations</AppText></AppCard>
    <AppText style={styles.heading} weight="bold">Add money</AppText><AppText tone="muted" style={styles.subtitle}>Choose an amount to create a payment order.</AppText>
    <View style={styles.presets}>{presets.map(value => <AppText key={value} onPress={() => setAmount(value)} style={[styles.preset, {borderColor: amount === value ? colors.primary : colors.border, color: amount === value ? colors.primary : colors.text, backgroundColor: amount === value ? colors.soft : colors.surface}]}>₹{value}</AppText>)}</View>
    <AppText tone="muted" style={styles.disclaimer}>Demo only. No payment gateway is connected and the balance will not change.</AppText>
    <AppButton title={'Create ₹' + amount + ' order'} onPress={order} />
    <AppText style={styles.heading} weight="bold">Transactions</AppText>
    {transactions.map(item => <AppCard key={item.id} style={styles.transaction}><View style={[styles.transIcon, {backgroundColor: colors.soft}]}><AppText tone="accent">{item.type === 'credit' ? '+' : '−'}</AppText></View><View style={styles.transInfo}><AppText weight="bold">{item.description}</AppText><AppText tone="muted" style={styles.transDate}>{new Date(item.createdAt).toLocaleDateString()} · {item.status}</AppText></View><AppText style={styles.transAmount} tone={item.type === 'credit' ? 'accent' : 'primary'} weight="bold">{item.type === 'credit' ? '+' : '-'}₹{item.amount}</AppText></AppCard>)}
    {transactions.length === 0 ? <EmptyState title="No transactions yet" message="Your wallet activity will appear here." /> : null}
  </ScrollView></SafeAreaView>;
}
const styles = StyleSheet.create({safe: {flex: 1}, page: {padding: 20, paddingBottom: 32}, balance: {padding: 22, backgroundColor: '#34213F', borderColor: '#34213F'}, amount: {fontSize: 35, color: '#FFFFFF', marginTop: 8}, caption: {color: '#DED3E4', marginTop: 6}, heading: {fontSize: 19, marginTop: 25}, subtitle: {fontSize: 13, marginTop: 4}, presets: {flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginTop: 15}, preset: {width: '47%', paddingVertical: 15, textAlign: 'center', overflow: 'hidden', borderRadius: 14, borderWidth: 1, fontWeight: '700'}, disclaimer: {fontSize: 12, lineHeight: 18, marginTop: 15, marginBottom: 16}, transaction: {flexDirection: 'row', alignItems: 'center', marginTop: 9, padding: 13}, transIcon: {width: 38, height: 38, borderRadius: 13, alignItems: 'center', justifyContent: 'center'}, transInfo: {flex: 1, marginLeft: 11}, transDate: {fontSize: 11, marginTop: 3}, transAmount: {fontSize: 14}});

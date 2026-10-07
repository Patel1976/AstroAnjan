import React from 'react';
import {StyleSheet, View} from 'react-native';
import {AppText} from './AppText';
export function EmptyState({title, message}: {title: string; message: string}) {
  return <View style={styles.wrap}><AppText style={styles.icon} tone="accent">✧</AppText><AppText weight="bold">{title}</AppText><AppText tone="muted" style={styles.message}>{message}</AppText></View>;
}
const styles = StyleSheet.create({wrap: {padding: 28, alignItems: 'center', justifyContent: 'center'}, icon: {fontSize: 34, marginBottom: 10}, message: {textAlign: 'center', marginTop: 6, lineHeight: 20}});

import React from 'react';
import {StyleSheet, View} from 'react-native';
import {AppButton} from './AppButton';
import {AppText} from './AppText';

export function ErrorState({title = 'Something went wrong', message, onRetry}: {title?: string; message: string; onRetry?: () => void}) {
  return <View style={styles.wrap} accessibilityRole="alert">
    <AppText tone="accent" style={styles.icon}>!</AppText>
    <AppText weight="bold">{title}</AppText>
    <AppText tone="muted" style={styles.message}>{message}</AppText>
    {onRetry ? <AppButton title="Try again" onPress={onRetry} secondary /> : null}
  </View>;
}

const styles = StyleSheet.create({wrap: {flex: 1, minHeight: 180, alignItems: 'center', justifyContent: 'center', padding: 24}, icon: {fontSize: 30, marginBottom: 10}, message: {textAlign: 'center', lineHeight: 20, marginTop: 6, marginBottom: 16}});

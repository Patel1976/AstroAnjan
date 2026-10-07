import React from 'react';
import {Image, StyleSheet, View} from 'react-native';
import {AppText} from './AppText';
export function Avatar({name, uri, size = 56, color = '#EAD8BE'}: {name: string; uri?: string | null; size?: number; color?: string}) {
  const initials = name.split(' ').map(part => part[0]).slice(0, 2).join('').toUpperCase();
  if (uri) return <Image source={{uri}} style={{width: size, height: size, borderRadius: size / 2}} />;
  return <View style={[styles.avatar, {width: size, height: size, borderRadius: size / 2, backgroundColor: color}]}><AppText style={{fontSize: size * 0.3, color: '#4C315F'}} weight="bold">{initials}</AppText></View>;
}
const styles = StyleSheet.create({avatar: {alignItems: 'center', justifyContent: 'center'}});

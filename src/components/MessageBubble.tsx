import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Message} from '../types';
import {AppText} from './AppText';
export function MessageBubble({message}: {message: Message}) {
  const own = message.sender === 'user';
  return <View style={[styles.row, own ? styles.ownRow : styles.otherRow]}><View style={[styles.bubble, own ? styles.own : styles.other]}><AppText style={own ? styles.ownText : undefined}>{message.text}</AppText><AppText style={[styles.time, own && styles.ownTime]}>{new Date(message.createdAt).toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'})}</AppText></View></View>;
}
const styles = StyleSheet.create({row: {width: '100%', marginVertical: 5}, ownRow: {alignItems: 'flex-end'}, otherRow: {alignItems: 'flex-start'}, bubble: {maxWidth: '82%', paddingHorizontal: 14, paddingVertical: 10, borderRadius: 17}, own: {backgroundColor: '#4C315F', borderBottomRightRadius: 5}, other: {backgroundColor: '#FFFFFF', borderBottomLeftRadius: 5}, ownText: {color: '#FFFFFF', lineHeight: 20}, time: {fontSize: 10, color: '#827987', textAlign: 'right', marginTop: 5}, ownTime: {color: '#DED3E4'}});

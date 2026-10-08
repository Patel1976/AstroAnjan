import React from 'react';
import {StyleSheet, View} from 'react-native';
import {AppText} from './AppText';

export function RatingStars({rating}: {rating: number}) {
  return <View style={styles.row} accessibilityLabel={`Rated ${rating.toFixed(1)} out of 5`}>
    <AppText style={styles.stars} tone="accent">{String.fromCharCode(9733).repeat(5)}</AppText>
    <AppText style={styles.rating} weight="bold">{rating.toFixed(1)}</AppText>
  </View>;
}

const styles = StyleSheet.create({row: {flexDirection: 'row', alignItems: 'center'}, stars: {fontSize: 13, letterSpacing: 1}, rating: {marginLeft: 6, fontSize: 12}});

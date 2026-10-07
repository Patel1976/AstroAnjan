import React from 'react';
import {View} from 'react-native';
import {AppText} from './AppText';
export function RatingStars({rating}: {rating: number}) { return <View style={{flexDirection: 'row', alignItems: 'center'}}><AppText tone="accent">★★★★★</AppText><AppText style={{marginLeft: 6, fontSize: 13}} weight="bold">{rating.toFixed(1)}</AppText></View>; }

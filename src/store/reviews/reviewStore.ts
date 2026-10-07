import AsyncStorage from '@react-native-async-storage/async-storage';
import {create} from 'zustand';
import {createJSONStorage, persist} from 'zustand/middleware';
import {getInitialReviews} from '../../services/reviewService';
import {Review} from '../../types';
interface ReviewState {reviews: Review[]; submit: (review: Omit<Review, 'id' | 'createdAt'>) => void;}
export const useReviewStore = create<ReviewState>()(persist(
  set => ({
    reviews: getInitialReviews(),
    submit: review => set(state => ({reviews: [{...review, id: 'review-' + Date.now(), createdAt: new Date().toISOString()}, ...state.reviews]})),
  }),
  {name: 'astroanjan-reviews', storage: createJSONStorage(() => AsyncStorage)},
));

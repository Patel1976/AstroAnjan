import {Review} from '../types';
export const mockReviews: Review[] = [
  {id: 'review-1', astrologerId: 'astro-1', consultationId: 'consult-1', customerName: 'Priya S.', rating: 5, comment: 'A thoughtful reading and very clear advice. I left feeling positive.', createdAt: '2026-10-02'},
  {id: 'review-2', astrologerId: 'astro-2', consultationId: 'consult-old', customerName: 'Rahul M.', rating: 5, comment: 'Kind, patient, and insightful.', createdAt: '2026-09-28'},
  {id: 'review-3', astrologerId: 'astro-1', consultationId: 'consult-old-2', customerName: 'Nisha K.', rating: 4, comment: 'Helpful perspective and a warm conversation.', createdAt: '2026-09-24'},
];

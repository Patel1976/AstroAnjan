import {Consultation, Message} from '../types';
export const mockConsultations: Consultation[] = [
  {id: 'consult-1', astrologerId: 'astro-1', astrologerName: 'Aarav Joshi', specialty: 'Vedic Astrology', status: 'completed', mode: 'chat', createdAt: '2026-10-03T10:30:00Z', durationMinutes: 18, pricePerMinute: 32},
  {id: 'consult-2', astrologerId: 'astro-2', astrologerName: 'Meera Kapoor', specialty: 'Tarot Reading', status: 'accepted', mode: 'chat', createdAt: '2026-10-09T12:00:00Z', durationMinutes: 0, pricePerMinute: 28},
  {id: 'consult-3', astrologerId: 'astro-4', astrologerName: 'Kavita Sharma', specialty: 'Vedic Astrology', status: 'cancelled', mode: 'chat', createdAt: '2026-09-20T08:00:00Z', durationMinutes: 0, pricePerMinute: 35},
];
export const mockMessages: Message[] = [
  {id: 'message-1', consultationId: 'consult-1', sender: 'astrologer', text: 'Welcome, Anjan. What would you like guidance with today?', createdAt: '2026-10-03T10:31:00Z'},
  {id: 'message-2', consultationId: 'consult-1', sender: 'user', text: 'I would like to talk about a career change.', createdAt: '2026-10-03T10:32:00Z'},
  {id: 'message-3', consultationId: 'consult-1', sender: 'astrologer', text: 'Let’s look at the opportunities ahead and what feels most aligned for you.', createdAt: '2026-10-03T10:33:00Z'},
];

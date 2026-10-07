import {NotificationItem} from '../types';
export const mockNotifications: NotificationItem[] = [
  {id: 'notice-1', title: 'Session reminder', body: 'Your chat with Meera Kapoor is coming up soon.', type: 'consultation', createdAt: '2026-10-07T08:00:00Z', isRead: false},
  {id: 'notice-2', title: 'Your daily horoscope', body: 'A fresh reading is ready for you today.', type: 'astrology', createdAt: '2026-10-07T05:30:00Z', isRead: false},
  {id: 'notice-3', title: 'Wallet updated', body: 'Your demo wallet is ready to use.', type: 'wallet', createdAt: '2026-10-06T09:00:00Z', isRead: true},
];

export type ThemeMode = 'light' | 'dark' | 'system';
export interface User { id: string; name: string; email: string; phone: string; }
export interface Profile extends User {
  gender: 'female' | 'male' | 'other' | null; dateOfBirth: string | null;
  timeOfBirth: string | null; birthLocation: string | null; latitude: number | null;
  longitude: number | null; timeZone: string | null; imageUri: string | null;
}
export interface AstrologyTool { id: string; title: string; subtitle: string; symbol: string; category: 'Vedic' | 'Horoscope' | 'Self discovery' | 'Compatibility'; }

export type ConsultationStatus = 'pending' | 'accepted' | 'active' | 'completed' | 'cancelled';
export interface Astrologer {
  id: string; name: string; specialty: string; languages: string[];
  rating: number; reviewCount: number; experienceYears: number;
  pricePerMinute: number; isOnline: boolean; bio: string; avatarColor: string;
}
export interface Review {
  id: string; astrologerId: string; consultationId: string; customerName: string;
  rating: number; comment: string; createdAt: string;
}
export interface Message {
  id: string; consultationId: string; sender: 'user' | 'astrologer';
  text: string; createdAt: string;
}
export interface Consultation {
  id: string; astrologerId: string; astrologerName: string; specialty: string;
  status: ConsultationStatus; mode: 'chat' | 'call'; createdAt: string;
  durationMinutes: number; pricePerMinute: number;
}
export interface WalletTransaction {
  id: string; type: 'credit' | 'debit'; amount: number; description: string;
  status: 'completed' | 'pending'; createdAt: string;
}
export interface NotificationItem {
  id: string; title: string; body: string; type: 'consultation' | 'wallet' | 'astrology' | 'live';
  createdAt: string; isRead: boolean;
}
export interface LiveSession {
  id: string; astrologerId: string; astrologerName: string; title: string;
  description: string; startsAt: string; viewers: number; isLive: boolean;
}
export interface AstrologyResult {
  toolId: string; title: string; subtitle: string; summary: string;
  sections: {title: string; body: string}[];
}
export interface Location {
  id: string; city: string; region: string; country: string;
  latitude: number; longitude: number; timeZone: string;
}

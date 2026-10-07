import AsyncStorage from '@react-native-async-storage/async-storage';
import {create} from 'zustand';
import {createJSONStorage, persist} from 'zustand/middleware';
import {getInitialConsultations, getInitialMessages} from '../../services/consultationService';
import {Consultation, ConsultationStatus, Message} from '../../types';
interface ConsultationState {consultations: Consultation[]; messages: Message[]; request: (astrologer: {astrologerId: string; astrologerName: string; specialty: string; pricePerMinute: number}) => string; updateStatus: (id: string, status: ConsultationStatus) => void; sendMessage: (consultationId: string, text: string) => void; getById: (id: string) => Consultation | undefined;}
export const useConsultationStore = create<ConsultationState>()(persist(
  (set, get) => ({
    consultations: getInitialConsultations(), messages: getInitialMessages(),
    request: astrologer => {
      const id = 'consult-' + Date.now();
      const consultation: Consultation = {...astrologer, id, status: 'pending', mode: 'chat', createdAt: new Date().toISOString(), durationMinutes: 0};
      set(state => ({consultations: [consultation, ...state.consultations]}));
      return id;
    },
    updateStatus: (id, status) => set(state => ({consultations: state.consultations.map(item => item.id === id ? {...item, status} : item)})),
    sendMessage: (consultationId, text) => set(state => ({messages: [...state.messages, {id: 'message-' + Date.now(), consultationId, sender: 'user', text, createdAt: new Date().toISOString()}]})),
    getById: id => get().consultations.find(item => item.id === id),
  }),
  {name: 'astroanjan-consultations', storage: createJSONStorage(() => AsyncStorage)},
));

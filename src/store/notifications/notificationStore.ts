import AsyncStorage from '@react-native-async-storage/async-storage';
import {create} from 'zustand';
import {createJSONStorage, persist} from 'zustand/middleware';
import {getInitialNotifications} from '../../services/notificationService';
import {NotificationItem} from '../../types';
interface NotificationState {items: NotificationItem[]; markRead: (id: string) => void; markAllRead: () => void;}
export const useNotificationStore = create<NotificationState>()(persist(
  set => ({
    items: getInitialNotifications(),
    markRead: id => set(state => ({items: state.items.map(item => item.id === id ? {...item, isRead: true} : item)})),
    markAllRead: () => set(state => ({items: state.items.map(item => ({...item, isRead: true}))})),
  }),
  {name: 'astroanjan-notifications', storage: createJSONStorage(() => AsyncStorage)},
));

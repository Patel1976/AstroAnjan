import {create} from 'zustand';
import {getInitialLiveSessions} from '../../services/liveSessionService';
import {LiveSession} from '../../types';
interface LiveSessionState {sessions: LiveSession[]; getById: (id: string) => LiveSession | undefined;}
export const useLiveSessionStore = create<LiveSessionState>(() => ({
  sessions: getInitialLiveSessions(), getById: id => getInitialLiveSessions().find(item => item.id === id),
}));

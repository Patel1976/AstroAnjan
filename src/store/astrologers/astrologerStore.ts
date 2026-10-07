import {create} from 'zustand';
import {getInitialAstrologers} from '../../services/astrologerService';
import {Astrologer} from '../../types';
interface AstrologerState {astrologers: Astrologer[]; query: string; onlineOnly: boolean; specialty: string; setQuery: (query: string) => void; setOnlineOnly: (online: boolean) => void; setSpecialty: (specialty: string) => void; getById: (id: string) => Astrologer | undefined;}
export const useAstrologerStore = create<AstrologerState>(set => ({
  astrologers: getInitialAstrologers(), query: '', onlineOnly: false, specialty: 'All',
  setQuery: query => set({query}), setOnlineOnly: onlineOnly => set({onlineOnly}),
  setSpecialty: specialty => set({specialty}),
  getById: id => getInitialAstrologers().find(astrologer => astrologer.id === id),
}));

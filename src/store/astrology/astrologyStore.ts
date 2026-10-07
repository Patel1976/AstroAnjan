import {create} from 'zustand';
import {createMockAstrologyResult} from '../../services/astrologyService';
import {AstrologyResult} from '../../types';
interface AstrologyState {
  results: Record<string, AstrologyResult>;
  status: 'idle' | 'loading' | 'success' | 'error';
  error: string | null;
  generate: (toolId: string, name: string) => void;
}
export const useAstrologyStore = create<AstrologyState>(set => ({
  results: {},
  status: 'idle',
  error: null,
  generate: (toolId, name) => {
    set({status: 'loading', error: null});
    try {
      set(state => ({
        status: 'success',
        results: {...state.results, [toolId]: createMockAstrologyResult(toolId, name)},
      }));
    } catch {
      set({status: 'error', error: 'The demo reading could not be created. Please try again.'});
    }
  },
}));

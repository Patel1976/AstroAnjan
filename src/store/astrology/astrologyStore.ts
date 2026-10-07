import {create} from 'zustand';
import {createMockAstrologyResult} from '../../services/astrologyService';
import {AstrologyResult} from '../../types';
interface AstrologyState {
  results: Record<string, AstrologyResult>;
  status: 'idle' | 'loading' | 'success' | 'error';
  generate: (toolId: string, name: string) => void;
}
export const useAstrologyStore = create<AstrologyState>(set => ({
  results: {},
  status: 'idle',
  generate: (toolId, name) => {
    set({status: 'loading'});
    set(state => ({
      status: 'success',
      results: {...state.results, [toolId]: createMockAstrologyResult(toolId, name)},
    }));
  },
}));

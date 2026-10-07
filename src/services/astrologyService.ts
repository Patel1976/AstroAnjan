import {mockAstrologyResults} from '../mock/astrologyResults';
import {AstrologyResult} from '../types';
export const createMockAstrologyResult = (toolId: string, name: string): AstrologyResult => {
  const template = mockAstrologyResults[toolId] ?? mockAstrologyResults.horoscope;
  return {
    toolId,
    title: toolId === 'personal' ? 'Personal Horoscope' : toolId[0].toUpperCase() + toolId.slice(1),
    subtitle: 'A reading for ' + (name || 'you'),
    summary: template.summary,
    sections: template.sections,
  };
};

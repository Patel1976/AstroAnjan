export const lightColors = {
  background: '#F7F5F2', surface: '#FFFFFF', surfaceElevated: '#FFFFFF', primary: '#4C315F', primaryLight: '#F0E9F2', accent: '#C58A43',
  text: '#261E2B', textPrimary: '#261E2B', muted: '#827987', textSecondary: '#827987', textMuted: '#9A929E', border: '#E9E2EA', soft: '#F0E9F2', success: '#38876A',
  secondary: '#6E8796', card: '#FFFFFF', warning: '#B7791F', error: '#B94B52', errorSoft: '#F8EDEC', info: '#4D89A2',
  onPrimary: '#FFFFFF', iconText: '#4C315F', warmSoft: '#F7EEDD',
  cosmic: '#34213F', onCosmic: '#FFFFFF', cosmicMuted: '#DED3E4', cosmicOverlay: 'rgba(255,255,255,0.08)', live: '#D87979',
  statusPending: '#C58A43', statusAccepted: '#4D89A2', statusActive: '#38876A', statusCompleted: '#6D6480', statusCancelled: '#A26767',
};
export const darkColors = {
  background: '#17131B', surface: '#241E29', surfaceElevated: '#2D2533', primary: '#C5A4D8', primaryLight: '#33283A', accent: '#E3B36D',
  text: '#F6F0F7', textPrimary: '#F6F0F7', muted: '#B1A7B5', textSecondary: '#B1A7B5', textMuted: '#928797', border: '#3A303F', soft: '#33283A', success: '#78C5A4',
  secondary: '#A7BAC5', card: '#241E29', warning: '#E3B36D', error: '#E58B91', errorSoft: '#482D35', info: '#7EB5CA',
  onPrimary: '#201629', iconText: '#E4D0EF', warmSoft: '#3A2F27',
  cosmic: '#302139', onCosmic: '#FFFFFF', cosmicMuted: '#DED3E4', cosmicOverlay: 'rgba(255,255,255,0.08)', live: '#E58B91',
  statusPending: '#E3B36D', statusAccepted: '#7EB5CA', statusActive: '#78C5A4', statusCompleted: '#B9A6CD', statusCancelled: '#D39B9B',
};
export type AppColors = typeof lightColors;

export const radius = {sm: 10, md: 14, lg: 18, xl: 24, pill: 999} as const;
export const elevation = {
  card: {shadowColor: '#281B30', shadowOpacity: 0.055, shadowRadius: 14, shadowOffset: {width: 0, height: 5}, elevation: 2},
  floating: {shadowColor: '#281B30', shadowOpacity: 0.12, shadowRadius: 20, shadowOffset: {width: 0, height: 8}, elevation: 5},
} as const;

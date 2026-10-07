import AsyncStorage from '@react-native-async-storage/async-storage';
import {create} from 'zustand';
import {createJSONStorage, persist} from 'zustand/middleware';
import {getInitialProfile} from '../../services/profileService';
import {Location, Profile} from '../../types';
interface ProfileState {profile: Profile; updateProfile: (changes: Partial<Profile>) => void; setBirthLocation: (location: Location) => void; removeImage: () => void;}
export const useProfileStore = create<ProfileState>()(persist(
  set => ({
    profile: getInitialProfile(),
    updateProfile: changes => set(state => ({profile: {...state.profile, ...changes}})),
    setBirthLocation: location => set(state => ({profile: {...state.profile, birthLocation: location.city + ', ' + location.region, latitude: location.latitude, longitude: location.longitude, timeZone: location.timeZone}})),
    removeImage: () => set(state => ({profile: {...state.profile, imageUri: null}})),
  }),
  {name: 'astroanjan-profile', storage: createJSONStorage(() => AsyncStorage)},
));

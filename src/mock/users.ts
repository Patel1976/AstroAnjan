import {Location, Profile, User} from '../types';
export const demoUser: User = {id: 'user-1', name: 'Anjan Sharma', email: 'anjan@example.com', phone: '+91 98765 43210'};
export const demoProfile: Profile = {
  ...demoUser, gender: 'male', dateOfBirth: '1994-08-18', timeOfBirth: '06:30',
  birthLocation: 'Jaipur, Rajasthan', latitude: 26.9124, longitude: 75.7873,
  timeZone: 'Asia/Kolkata', imageUri: null,
};
export const mockLocations: Location[] = [
  {id: 'jaipur', city: 'Jaipur', region: 'Rajasthan', country: 'India', latitude: 26.9124, longitude: 75.7873, timeZone: 'Asia/Kolkata'},
  {id: 'delhi', city: 'New Delhi', region: 'Delhi', country: 'India', latitude: 28.6139, longitude: 77.209, timeZone: 'Asia/Kolkata'},
  {id: 'mumbai', city: 'Mumbai', region: 'Maharashtra', country: 'India', latitude: 19.076, longitude: 72.8777, timeZone: 'Asia/Kolkata'},
  {id: 'kolkata', city: 'Kolkata', region: 'West Bengal', country: 'India', latitude: 22.5726, longitude: 88.3639, timeZone: 'Asia/Kolkata'},
  {id: 'bengaluru', city: 'Bengaluru', region: 'Karnataka', country: 'India', latitude: 12.9716, longitude: 77.5946, timeZone: 'Asia/Kolkata'},
];

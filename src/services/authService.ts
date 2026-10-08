import {demoUser} from '../mock/users';
import {User} from '../types';
import * as Keychain from 'react-native-keychain';
import {Buffer} from 'buffer';
const credentialService = (email: string) => `com.astroanjan.mock-auth.${email.trim().toLowerCase()}`;

export const signInWithMockAccount = (email: string): User => ({...demoUser, email: email.trim() || demoUser.email});
export const registerMockAccount = async (name: string, email: string, phone: string, password: string): Promise<User> => {
  const cleanEmail = email.trim();
  const stored = await Keychain.setGenericPassword(cleanEmail, password, {service: credentialService(cleanEmail)});
  if (!stored) throw new Error('Could not securely save this demo account on the device.');
  return {...demoUser, name: name.trim(), email: cleanEmail, phone: phone.trim()};
};
export const validateMockPassword = async (email: string, password: string): Promise<boolean> => {
  const cleanEmail = email.trim();
  if (!cleanEmail || !password) return false;
  const service = credentialService(cleanEmail);
  const existing = await Keychain.getGenericPassword({service});
  if (existing) {
    const storedUser = Buffer.from(existing.username.toLowerCase());
    const inputUser = Buffer.from(cleanEmail.toLowerCase());
    const storedPass = Buffer.from(existing.password);
    const inputPass = Buffer.from(password);
    const userMatch = storedUser.length === inputUser.length && storedUser.every((b, i) => b === inputUser[i]);
    const passMatch = storedPass.length === inputPass.length && storedPass.every((b, i) => b === inputPass[i]);
    return userMatch && passMatch;
  }
  return Boolean(await Keychain.setGenericPassword(cleanEmail, password, {service}));
};
export const verifyMockPhone = (phone: string, code: string): User | null => code === '123456' ? {...demoUser, phone: phone.trim() || demoUser.phone} : null;
export const isValidMockResetEmail = (email: string): boolean => email.includes('@');
export const resetMockPassword = async (email: string, password: string): Promise<boolean> => {
  const cleanEmail = email.trim();
  if (!isValidMockResetEmail(cleanEmail) || password.length < 6) return false;
  return Boolean(await Keychain.setGenericPassword(cleanEmail, password, {service: credentialService(cleanEmail)}));
};

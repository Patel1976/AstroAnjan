import {demoUser} from '../mock/users';
import {User} from '../types';
export const signInWithMockAccount = (email: string): User => ({...demoUser, email: email.trim() || demoUser.email});
export const registerMockAccount = (name: string, email: string, phone: string): User => ({...demoUser, name: name.trim(), email: email.trim(), phone: phone.trim()});
export const verifyMockPhone = (phone: string, code: string): User | null => code === '123456' ? {...demoUser, phone: phone.trim() || demoUser.phone} : null;
export const isValidMockResetEmail = (email: string): boolean => email.includes('@');

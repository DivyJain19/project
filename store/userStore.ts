import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface UserState {
  isLoggedIn: boolean;
  isFirstTime: boolean;
  phoneNumber: string;
  userId: string | null;
  fullName: string;
  email: string;
  
  // Actions
  setLoggedIn: (status: boolean) => void;
  setFirstTime: (status: boolean) => void;
  setPhoneNumber: (phone: string) => void;
  setUserId: (id: string) => void;
  setUserInfo: (name: string, email: string) => void;
  logout: () => void;
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      isLoggedIn: false,
      isFirstTime: true,
      phoneNumber: '',
      userId: null,
      fullName: '',
      email: '',
      
      setLoggedIn: (status) => set({ isLoggedIn: status }),
      setFirstTime: (status) => set({ isFirstTime: status }),
      setPhoneNumber: (phone) => set({ phoneNumber: phone }),
      setUserId: (id) => set({ userId: id }),
      setUserInfo: (name, email) => set({ fullName: name, email: email }),
      logout: () => set({
        isLoggedIn: false,
        userId: null,
        phoneNumber: '',
        fullName: '',
        email: ''
      }),
    }),
    {
      name: 'user-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
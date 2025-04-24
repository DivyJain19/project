import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

export type ShoppingPreference =
  | 'just-me'
  | 'me-and-partner'
  | 'family-with-kids'
  | 'elders-at-home'
  | 'pets';
export type DietaryPreference =
  | 'vegetarian'
  | 'vegan'
  | 'gluten-free'
  | 'just-eat-whats-right'
  | 'high-protein'
  | 'keto';
export type AllergyType =
  | 'lactose'
  | 'gluten'
  | 'nuts'
  | 'refined-sugar'
  | 'soy'
  | 'none';
export interface UserState {
  isLoggedIn: boolean;
  isFirstTime: boolean;
  phoneNumber: string;
  userId: string | null;
  fullName: string;
  email: string;
  currentStep: number;
  totalSteps: number;
  shoppingPreferences: ShoppingPreference[];
  dietaryPreferences: DietaryPreference[];
  allergies: AllergyType[];

  // Actions
  setLoggedIn: (status: boolean) => void;
  setFirstTime: (status: boolean) => void;
  setPhoneNumber: (phone: string) => void;
  setUserId: (id: string) => void;
  setUserInfo: (name: string, email: string) => void;
  setCurrentStep: (step: number) => void;
  nextStep: () => void;
  previousStep: () => void;
  toggleShoppingPreference: (preference: ShoppingPreference) => void;
  toggleDietaryPreference: (preference: DietaryPreference) => void;
  toggleAllergy: (allergy: AllergyType) => void;
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
      currentStep: 0,
      totalSteps: 3,
      shoppingPreferences: [],
      dietaryPreferences: [],
      allergies: [],

      setLoggedIn: (status) => set({ isLoggedIn: status }),
      setFirstTime: (status) => set({ isFirstTime: status }),
      setPhoneNumber: (phone) => set({ phoneNumber: phone }),
      setUserId: (id) => set({ userId: id }),
      setUserInfo: (name, email) => set({ fullName: name, email: email }),
      setCurrentStep: (step) => set({ currentStep: step }),
      nextStep: () =>
        set((state) => ({
          currentStep: Math.min(state.currentStep + 1, state.totalSteps),
        })),
      previousStep: () =>
        set((state) => ({
          currentStep: Math.max(state.currentStep - 1, 0),
        })),
      toggleShoppingPreference: (preference) =>
        set((state) => {
          if (state.shoppingPreferences.includes(preference)) {
            return {
              shoppingPreferences: state.shoppingPreferences.filter(
                (p) => p !== preference
              ),
            };
          } else {
            return {
              shoppingPreferences: [...state.shoppingPreferences, preference],
            };
          }
        }),
      toggleDietaryPreference: (preference) =>
        set((state) => {
          if (state.dietaryPreferences.includes(preference)) {
            return {
              dietaryPreferences: state.dietaryPreferences.filter(
                (p) => p !== preference
              ),
            };
          } else {
            return {
              dietaryPreferences: [...state.dietaryPreferences, preference],
            };
          }
        }),
      toggleAllergy: (allergy) =>
        set((state) => {
          if (allergy === 'none') {
            return { allergies: ['none'] };
          }

          // If selecting a specific allergy and 'none' was selected, remove 'none'
          let updatedAllergies = state.allergies.includes('none')
            ? state.allergies.filter((a) => a !== 'none')
            : [...state.allergies];

          if (updatedAllergies.includes(allergy)) {
            updatedAllergies = updatedAllergies.filter((a) => a !== allergy);
          } else {
            updatedAllergies.push(allergy);
          }

          return { allergies: updatedAllergies };
        }),
      logout: () =>
        set({
          isLoggedIn: false,
          userId: null,
          phoneNumber: '',
          fullName: '',
          email: '',
          currentStep: 0,
          totalSteps: 3,
          shoppingPreferences: [],
          dietaryPreferences: [],
          allergies: [],
        }),
    }),
    {
      name: 'user-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);

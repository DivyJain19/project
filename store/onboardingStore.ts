import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

export type OnboardingStep = 
  | 'welcome'
  | 'phone'
  | 'otp'
  | 'location'
  | 'userInfo'
  | 'samples'
  | 'completed';

interface OnboardingState {
  currentStep: OnboardingStep;
  completedSteps: OnboardingStep[];
  onboardingCompleted: boolean;
  
  // Actions
  setCurrentStep: (step: OnboardingStep) => void;
  completeStep: (step: OnboardingStep) => void;
  resetOnboarding: () => void;
  completeOnboarding: () => void;
  isStepCompleted: (step: OnboardingStep) => boolean;
}

export const useOnboardingStore = create<OnboardingState>()(
  persist(
    (set, get) => ({
      currentStep: 'welcome',
      completedSteps: [],
      onboardingCompleted: false,
      
      setCurrentStep: (step) => set({ currentStep: step }),
      
      completeStep: (step) => set((state) => ({
        completedSteps: state.completedSteps.includes(step) 
          ? state.completedSteps 
          : [...state.completedSteps, step]
      })),
      
      resetOnboarding: () => set({
        currentStep: 'welcome',
        completedSteps: [],
        onboardingCompleted: false
      }),
      
      completeOnboarding: () => set({
        onboardingCompleted: true
      }),
      
      isStepCompleted: (step) => {
        return get().completedSteps.includes(step);
      }
    }),
    {
      name: 'onboarding-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
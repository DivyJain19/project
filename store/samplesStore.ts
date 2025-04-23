import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface Sample {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  category: string;
}

interface SamplesState {
  availableSamples: Sample[];
  selectedSamples: string[]; // Array of sample IDs
  maxSelection: number;
  
  // Actions
  setAvailableSamples: (samples: Sample[]) => void;
  toggleSampleSelection: (sampleId: string) => void;
  clearSelectedSamples: () => void;
  setMaxSelection: (max: number) => void;
  isSelected: (sampleId: string) => boolean;
  canSelectMore: () => boolean;
}

// Sample data
const dummySamples: Sample[] = [
  {
    id: '1',
    name: 'Organic Coffee',
    description: 'Premium single-origin coffee sample',
    imageUrl: 'https://images.pexels.com/photos/312418/pexels-photo-312418.jpeg',
    category: 'Beverages'
  },
  {
    id: '2',
    name: 'Natural Face Cream',
    description: 'Handcrafted moisturizing face cream',
    imageUrl: 'https://images.pexels.com/photos/3321416/pexels-photo-3321416.jpeg',
    category: 'Beauty'
  },
  {
    id: '3',
    name: 'Organic Tea',
    description: 'Herbal tea blend with natural ingredients',
    imageUrl: 'https://images.pexels.com/photos/1417945/pexels-photo-1417945.jpeg',
    category: 'Beverages'
  },
  {
    id: '4',
    name: 'Trail Mix',
    description: 'Healthy mix of nuts and dried fruits',
    imageUrl: 'https://images.pexels.com/photos/6659165/pexels-photo-6659165.jpeg',
    category: 'Snacks'
  },
  {
    id: '5',
    name: 'Hand Sanitizer',
    description: 'Travel-size sanitizer with aloe vera',
    imageUrl: 'https://images.pexels.com/photos/3987152/pexels-photo-3987152.jpeg',
    category: 'Health'
  },
  {
    id: '6',
    name: 'Protein Bar',
    description: 'Plant-based protein snack bar',
    imageUrl: 'https://images.pexels.com/photos/8105034/pexels-photo-8105034.jpeg',
    category: 'Snacks'
  }
];

export const useSamplesStore = create<SamplesState>()(
  persist(
    (set, get) => ({
      availableSamples: dummySamples,
      selectedSamples: [],
      maxSelection: 3,
      
      setAvailableSamples: (samples) => set({ availableSamples: samples }),
      
      toggleSampleSelection: (sampleId) => set((state) => {
        if (state.selectedSamples.includes(sampleId)) {
          return {
            selectedSamples: state.selectedSamples.filter(id => id !== sampleId)
          };
        } else {
          if (state.selectedSamples.length >= state.maxSelection) {
            return state; // Don't add if max selection reached
          }
          return {
            selectedSamples: [...state.selectedSamples, sampleId]
          };
        }
      }),
      
      clearSelectedSamples: () => set({ selectedSamples: [] }),
      
      setMaxSelection: (max) => set({ maxSelection: max }),
      
      isSelected: (sampleId) => {
        return get().selectedSamples.includes(sampleId);
      },
      
      canSelectMore: () => {
        return get().selectedSamples.length < get().maxSelection;
      }
    }),
    {
      name: 'samples-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
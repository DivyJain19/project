import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface Sample {
  id: string;
  name: string;
  desc: string;
  image: any;
  tag: string;
  details: string;
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
  setAvailableSamplesOrignal: () => void;
}

// Sample data
const dummySamples: Sample[] = [
  {
    id: '1',
    name: 'Organic Coffee',
    desc: 'Premium single-origin coffee sample',
    image: {
      uri: 'https://images.pexels.com/photos/312418/pexels-photo-312418.jpeg',
    },
    tag: 'Beverages',
    details: 'Organic Coffee is a premium single-origin coffee sample, perfect for beverage enthusiasts.',
  },
  {
    id: '2',
    name: 'Natural Face Cream',
    desc: 'Handcrafted moisturizing face cream',
    image: {
      uri: 'https://images.pexels.com/photos/3321416/pexels-photo-3321416.jpeg',
    },
    tag: 'Beauty',
    details: 'Natural Face Cream is a handcrafted moisturizing cream, ideal for your beauty routine.',
  },
  {
    id: '3',
    name: 'Organic Tea',
    desc: 'Herbal tea blend with natural ingredients',
    image: {
      uri: 'https://images.pexels.com/photos/1417945/pexels-photo-1417945.jpeg',
    },
    tag: 'Beverages',
    details: 'Organic Tea is a herbal blend made with natural ingredients, great for a soothing beverage experience.',
  },
  {
    id: '4',
    name: 'Trail Mix',
    desc: 'Healthy mix of nuts and dried fruits',
    image: {
      uri: 'https://images.pexels.com/photos/6659165/pexels-photo-6659165.jpeg',
    },
    tag: 'Snacks',
    details: 'Trail Mix offers a healthy combination of nuts and dried fruits, making it a perfect snack on the go.',
  },
  {
    id: '5',
    name: 'Hand Sanitizer',
    desc: 'Travel-size sanitizer with aloe vera',
    image: {
      uri: 'https://images.pexels.com/photos/3987152/pexels-photo-3987152.jpeg',
    },
    tag: 'Health',
    details: 'Hand Sanitizer is a travel-size sanitizing solution infused with aloe vera, essential for everyday health.',
  },
  {
    id: '6',
    name: 'Protein Bar',
    desc: 'Plant-based protein snack bar',
    image: {
      uri: 'https://images.pexels.com/photos/8105034/pexels-photo-8105034.jpeg',
    },
    tag: 'Snacks',
    details: 'Protein Bar is a plant-based protein snack, designed to keep you energized and satisfied.',
  },
];


export const useSamplesStore = create<SamplesState>()(
  persist(
    (set, get) => ({
      availableSamples: dummySamples,
      selectedSamples: [],
      maxSelection: 3,

      setAvailableSamples: (samples) => set({ availableSamples: samples }),

      toggleSampleSelection: (sampleId) =>
        set((state) => {
          if (state.selectedSamples.includes(sampleId)) {
            return {
              selectedSamples: state.selectedSamples.filter(
                (id) => id !== sampleId
              ),
            };
          } else {
            if (state.selectedSamples.length >= state.maxSelection) {
              return state; // Don't add if max selection reached
            }
            return {
              selectedSamples: [...state.selectedSamples, sampleId],
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
      },

      setAvailableSamplesOrignal: () => set({ availableSamples: dummySamples }),

    }),
    {
      name: 'samples-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);

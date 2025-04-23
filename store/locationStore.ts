import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Location from 'expo-location';

export interface LocationCoordinates {
  latitude: number;
  longitude: number;
}

export interface AddressDetails {
  addressLine1: string;
  addressLine2?: string;
  landmark?: string;
  city: string;
  state: string;
  pincode: string;
  tag: 'Home' | 'Office' | 'Friends' | 'Others';
}

interface LocationState {
  hasLocationPermission: boolean | null;
  coordinates: LocationCoordinates | null;
  addresses: AddressDetails[];
  selectedAddressIndex: number;
  isAddressModalVisible: boolean;
  
  // Actions
  requestLocationPermission: () => Promise<boolean>;
  setCoordinates: (coords: LocationCoordinates) => void;
  addAddress: (address: AddressDetails) => void;
  updateAddress: (index: number, address: AddressDetails) => void;
  removeAddress: (index: number) => void;
  selectAddress: (index: number) => void;
  setAddressModalVisible: (visible: boolean) => void;
}

export const useLocationStore = create<LocationState>()(
  persist(
    (set, get) => ({
      hasLocationPermission: null,
      coordinates: null,
      addresses: [],
      selectedAddressIndex: -1,
      isAddressModalVisible: false,
      
      requestLocationPermission: async () => {
        try {
          const { status } = await Location.requestForegroundPermissionsAsync();
          const hasPermission = status === 'granted';
          set({ hasLocationPermission: hasPermission });
          
          if (hasPermission) {
            const location = await Location.getCurrentPositionAsync({});
            set({
              coordinates: {
                latitude: location.coords.latitude,
                longitude: location.coords.longitude
              }
            });
          }
          
          return hasPermission;
        } catch (error) {
          console.error('Error requesting location permission:', error);
          set({ hasLocationPermission: false });
          return false;
        }
      },
      
      setCoordinates: (coords) => set({ coordinates: coords }),
      
      addAddress: (address) => set((state) => ({
        addresses: [...state.addresses, address],
        selectedAddressIndex: state.addresses.length
      })),
      
      updateAddress: (index, address) => set((state) => ({
        addresses: state.addresses.map((addr, i) => 
          i === index ? address : addr
        )
      })),
      
      removeAddress: (index) => set((state) => ({
        addresses: state.addresses.filter((_, i) => i !== index),
        selectedAddressIndex: state.selectedAddressIndex === index 
          ? -1 
          : state.selectedAddressIndex > index 
            ? state.selectedAddressIndex - 1 
            : state.selectedAddressIndex
      })),
      
      selectAddress: (index) => set({ selectedAddressIndex: index }),
      
      setAddressModalVisible: (visible) => set({ isAddressModalVisible: visible })
    }),
    {
      name: 'location-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
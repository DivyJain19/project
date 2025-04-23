import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import Screen from '@/components/common/Screen';
import Header from '@/components/common/Header';
import LocationRequest from '@/components/onboarding/LocationRequest';
import { COLORS, SIZES } from '@/constants/theme';
import { useLocationStore } from '@/store/locationStore';
import { useOnboardingStore } from '@/store/onboardingStore';

export default function LocationScreen() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  
  const { requestLocationPermission } = useLocationStore();
  const { setCurrentStep, completeStep } = useOnboardingStore();
  
  // Set current step on mount
  React.useEffect(() => {
    setCurrentStep('location');
    handleLocationRequest();
  }, []);
  
  const handleLocationRequest = async () => {
    setLoading(true);
    
    try {
      const granted = await requestLocationPermission();
      
      // Mark this step as completed regardless of permission result
      completeStep('location');
      
      if (granted) {
        // If permission granted, go to address screen for additional details
        // router.push('/onboarding/address');
        router.push('/onboarding/address-map');
      } else {
        // If permission denied, skip to user info
        // router.push('/onboarding/user-info');
        router.push('/onboarding/address');
      }
    } catch (error) {
      console.error('Error requesting location:', error);
      // Handle error - in a real app, might show error message
      router.push('/onboarding/user-info');
    } finally {
      setLoading(false);
    }
  };
  
  const handleSkip = () => {
    // Mark this step as completed
    completeStep('location');
    
    // Navigate to user info directly
    router.push('/onboarding/address');
  };
  
  return (
    <Screen withPadding style={styles.container}>
      <View style={styles.content}>
        <LocationRequest 
          onLocationRequest={handleLocationRequest}
          onSkip={handleSkip}
          loading={loading}
        />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  content: {
    flex: 1,
  },
});
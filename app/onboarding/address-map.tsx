import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import Screen from '@/components/common/Screen';
import Header from '@/components/common/Header';
import { COLORS, SIZES } from '@/constants/theme';
import { useLocationStore, AddressDetails } from '@/store/locationStore';
import { useOnboardingStore } from '@/store/onboardingStore';
import MapSelector from '@/components/location/MapSelector';
export default function AddressMapScreen() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const { addAddress } = useLocationStore();
  const { setCurrentStep } = useOnboardingStore();

  //   Set current step on mount
  React.useEffect(() => {
    setCurrentStep('location'); // Still part of location step
  }, []);

  const handleSubmit = async (address: AddressDetails) => {
    setLoading(true);

    try {
      // Save the address
      addAddress(address);
      // Navigate to user info
      // router.push('/onboarding/user-info');
      router.push('/onboarding/shopping-preferences');
    } catch (error) {
      console.error('Error saving address:', error);
      // Handle error
    } finally {
      setLoading(false);
    }
  };

  return (
    <Screen scrollable withPadding={false} backgroundColor="#4E342E">
      <Header
        title="Choose Location"
        showBackButton
        backgroundColor="#4E342E"
      />
      <View style={styles.content}>
        <MapSelector onNext={handleSubmit} />
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
    backgroundColor: COLORS.background,
  },
});

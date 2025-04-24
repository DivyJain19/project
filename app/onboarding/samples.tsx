import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  ImageBackground,
  Dimensions,
} from 'react-native';
import { useRouter } from 'expo-router';
import SampleCarousel from '@/components/onboarding/SampleCarousel';
import { SIZES } from '@/constants/theme';
import { useUserStore } from '@/store/userStore';
import { useOnboardingStore } from '@/store/onboardingStore';
import { OnboardingHeader } from '@/components/common/OnboardingHeader';
import ButtonV2 from '@/components/common/ButtonV2';
export default function SamplesScreen() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const { setFirstTime } = useUserStore();
  const { setCurrentStep, completeStep, completeOnboarding } =
    useOnboardingStore();
  const { width, height } = Dimensions.get('window');

  React.useEffect(() => {
    setCurrentStep('samples');
  }, []);

  const handleComplete = async () => {
    setLoading(true);

    try {
      completeStep('samples');
      completeOnboarding();
      setFirstTime(false);
      router.push('/(tabs)');
    } catch (error) {
      console.error('Error completing onboarding:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ImageBackground
      source={require('@/assets/images/farm-bg.jpg')}
      style={styles.image}
      resizeMode="cover" // or "contain", "stretch", etc.
    >
      <SafeAreaView style={styles.container}>
        <OnboardingHeader
          title="The cleanest pantry you'll ever build."
          showSkip={true}
          onSkip={handleComplete}
        />
        <View style={styles.content}>
          <SampleCarousel />
        </View>
        <View style={styles.pad}>
          <ButtonV2
            title="Next"
            size="medium"
            onPress={handleComplete}
          ></ButtonV2>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  image: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  content: {
    paddingTop: SIZES.xlarge,
    // flex: 1,
  },
  pad: {
    // paddingHorizontal: 100,
    marginHorizontal: 100,
  },
});

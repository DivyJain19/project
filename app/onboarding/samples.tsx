import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import Screen from '@/components/common/Screen';
import Header from '@/components/common/Header';
import ProgressBar from '@/components/common/ProgressBar';
import SampleSelector from '@/components/onboarding/SampleSelector';
import { COLORS, SIZES } from '@/constants/theme';
import { useUserStore } from '@/store/userStore';
import { useOnboardingStore } from '@/store/onboardingStore';

export default function SamplesScreen() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  
  const { setFirstTime } = useUserStore();
  const { setCurrentStep, completeStep, completeOnboarding } = useOnboardingStore();
  
  // Set current step on mount
  React.useEffect(() => {
    setCurrentStep('samples');
  }, []);
  
  const handleComplete = async () => {
    setLoading(true);
    
    try {
      // Mark samples step as completed
      completeStep('samples');
      
      // Mark onboarding as complete
      completeOnboarding();
      
      // Mark user as not first-time
      setFirstTime(false);
      
      // Navigate to home tabs
      router.push('/(tabs)');
    } catch (error) {
      console.error('Error completing onboarding:', error);
      // Handle error
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <Screen withPadding style={styles.container}>
      <Header 
        title="Free Samples" 
        showBackButton 
      />
      
      <View style={styles.progressContainer}>
        <ProgressBar progress={0.85} />
      </View>
      
      <View style={styles.content}>
        <SampleSelector 
          onComplete={handleComplete}
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
  progressContainer: {
    paddingVertical: SIZES.medium,
  },
  content: {
    flex: 1,
  },
});
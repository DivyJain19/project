import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import Screen from '@/components/common/Screen';
import Header from '@/components/common/Header';
import ProgressBar from '@/components/common/ProgressBar';
import UserInfoForm from '@/components/onboarding/UserInfoForm';
import { COLORS, SIZES } from '@/constants/theme';
import { useUserStore } from '@/store/userStore';
import { useOnboardingStore } from '@/store/onboardingStore';

export default function UserInfoScreen() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  
  const { setUserInfo } = useUserStore();
  const { setCurrentStep, completeStep } = useOnboardingStore();
  
  // Set current step on mount
  React.useEffect(() => {
    setCurrentStep('userInfo');
  }, []);
  
  const handleSubmit = async (fullName: string, email: string) => {
    setLoading(true);
    
    try {
      // Save user info
      setUserInfo(fullName, email);
      
      // Mark this step as completed
      completeStep('userInfo');
      
      // Navigate to samples selection
      router.push('/onboarding/samples');
    } catch (error) {
      console.error('Error saving user info:', error);
      // Handle error
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <Screen withPadding style={styles.container}>
      <Header 
        title="User Profile" 
        showBackButton 
      />
      
      <View style={styles.progressContainer}>
        <ProgressBar progress={0.7} />
      </View>
      
      <View style={styles.content}>
        <UserInfoForm 
          onSubmit={handleSubmit}
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
    justifyContent: 'center',
  },
});
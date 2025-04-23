import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import Screen from '@/components/common/Screen';
import Header from '@/components/common/Header';
import OtpInput from '@/components/onboarding/OtpInput';
import { COLORS, SIZES } from '@/constants/theme';
import { useUserStore } from '@/store/userStore';
import { useOnboardingStore } from '@/store/onboardingStore';

export default function OtpScreen() {
  const router = useRouter();
  const { phone } = useLocalSearchParams<{ phone: string }>();
  const [loading, setLoading] = useState(false);
  
  const { setLoggedIn } = useUserStore();
  const { setCurrentStep, completeStep } = useOnboardingStore();
  
  // Set current step on mount
  React.useEffect(() => {
    setCurrentStep('otp');
  }, []);
  
  const handleVerifyOtp = async (otp: string) => {
    setLoading(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      setLoggedIn(true);
      completeStep('otp');
      router.push('/onboarding/location');
    } catch (error) {
      console.error('Error verifying OTP:', error);
    } finally {
      setLoading(false);
    }
  };
  
  const handleResendOtp = async () => {
    console.log('Resending OTP to', phone);
  };
  
  return (
    <Screen withPadding style={styles.container}>
      <Header 
        title="Verify OTP" 
        showBackButton 
      />
      
      <View style={styles.content}>
        <OtpInput 
          length={4}
          onSubmit={handleVerifyOtp}
          loading={loading}
          phoneNumber={phone || ''}
          resendOtp={handleResendOtp}
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
    paddingBottom: SIZES.xxlarge,
  },
});
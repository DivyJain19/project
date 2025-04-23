import React, { useState } from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import Screen from '@/components/common/Screen';
import Header from '@/components/common/Header';
import OtpInput from '@/components/onboarding/OtpInput';
import { COLORS, SIZES, FONTS } from '@/constants/theme';
import { useUserStore } from '@/store/userStore';
import { useOnboardingStore } from '@/store/onboardingStore';
import { ArrowLeft } from 'lucide-react-native';

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
      await new Promise((resolve) => setTimeout(resolve, 1500));
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

  const handleBackPress = () => {
    router.back();
  };

  return (
    <Screen withPadding style={styles.container}>
      <View>
        <View>
          <TouchableOpacity
            style={styles.backButton}
            onPress={handleBackPress}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <ArrowLeft color={COLORS.text} size={24} />
          </TouchableOpacity>
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.title}>Please enter the OTP</Text>
          <Text style={styles.infoText}>
            Enter the OTP sent to {phone}
          </Text>
        </View>
      </View>
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
  backButton: {
    marginRight: SIZES.base,
  },
  textContainer: {
    width: '100%',
    marginBottom: SIZES.xlarge,
    marginTop: SIZES.huge,
  },
  title: {
    ...FONTS.h1,
    color: COLORS.text,
    marginBottom: SIZES.small,
  },
  infoText: {
    ...FONTS.body,
    color: COLORS.textSecondary,
    marginBottom: SIZES.large,
  },
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  progressContainer: {
    paddingVertical: SIZES.medium,
  },
  content: {
    width: "100%",
    justifyContent: 'center',
    paddingBottom: SIZES.xxlarge,
  },
});

import React, { useState } from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import Screen from '@/components/common/Screen';
import Header from '@/components/common/Header';
import PhoneInput from '@/components/onboarding/PhoneInput';
import { COLORS, SIZES, FONTS } from '@/constants/theme';
import { useUserStore } from '@/store/userStore';
import { useOnboardingStore } from '@/store/onboardingStore';
import { ArrowLeft } from 'lucide-react-native';

export default function PhoneScreen() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const { setPhoneNumber } = useUserStore();
  const { setCurrentStep, completeStep } = useOnboardingStore();

  // Set current step on mount
  React.useEffect(() => {
    setCurrentStep('phone');
  }, []);

  const handleBackPress = () => {
    setCurrentStep('welcome');
    router.back();
  };

  const handleSubmit = async (phone: string) => {
    setLoading(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setPhoneNumber(phone);
      completeStep('phone');
      router.push({
        pathname: '/onboarding/otp',
        params: { phone },
      });
    } catch (error) {
      console.error('Error sending OTP:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Screen withPadding style={styles.container}>
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
        <Text style={styles.title}>
          Enter your mobile number to get OTP
        </Text>
      </View>
      <View style={styles.content}>
        <PhoneInput onSubmit={handleSubmit} loading={loading} />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  textContainer: {
    width: '100%',
    marginBottom: SIZES.xlarge,
    marginTop: SIZES.huge,
    alignItems: 'center',
  },
  title: {
    ...FONTS.h1,
    color: COLORS.text,
    marginBottom: SIZES.medium,
    // textAlign: 'center',
  },
  content: {
    justifyContent: 'center',
    paddingBottom: SIZES.xxlarge,
    height: '100%'
  },
  backButton: {
    marginRight: SIZES.base,
  },
});

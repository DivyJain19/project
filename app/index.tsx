import React, { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useRouter } from 'expo-router';
import { useFonts } from '@/hooks/useFonts';
import { useUserStore } from '@/store/userStore';
import { useOnboardingStore } from '@/store/onboardingStore';
import { ActivityIndicator } from 'react-native';
import { COLORS, FONTS } from '@/constants/theme';

export default function Index() {
  const router = useRouter();
  const fontsLoaded = useFonts();
  
  const { isLoggedIn, isFirstTime } = useUserStore();
  const { onboardingCompleted } = useOnboardingStore();

  useEffect(() => {
    if (!fontsLoaded) return;
    
    // Check login state and redirect accordingly
    const redirectTimeout = setTimeout(() => {
      if (!isLoggedIn) {
        router.replace('/onboarding/welcome');
      } else if (isFirstTime || !onboardingCompleted) {
        router.replace('/onboarding');
      } else {
        router.replace('/(tabs)');
      }
    }, 1000);

    return () => clearTimeout(redirectTimeout);
  }, [fontsLoaded, isLoggedIn, isFirstTime, onboardingCompleted]);

  if (!fontsLoaded) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={COLORS.primary} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Text style={styles.logo}>FirstClub</Text>
        <Text style={styles.tagline}>Essential Goods Delivered</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.background,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.background,
  },
  logoContainer: {
    alignItems: 'center',
  },
  logo: {
    ...FONTS.h2,
    color: COLORS.primary,
    marginBottom: 8,
  },
  tagline: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    color: COLORS.textSecondary,
  },
});
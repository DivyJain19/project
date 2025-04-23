import React, { useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Animated,
  Pressable,
} from 'react-native';
import { useRouter } from 'expo-router';
import Screen from '@/components/common/Screen';
import Button from '@/components/common/Button';
import { COLORS, FONTS, SIZES } from '@/constants/theme';
import { useOnboardingStore } from '@/store/onboardingStore';

export default function WelcomeScreen() {
  const router = useRouter();
  const { setCurrentStep, completeStep } = useOnboardingStore();

  const fadeAnim = React.useRef(new Animated.Value(0)).current;
  const slideAnim = React.useRef(new Animated.Value(50)).current;

  useEffect(() => {
    // Set current step
    setCurrentStep('welcome');

    // Run entrance animation
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const handleStart = () => {
    completeStep('welcome');
    router.push('/onboarding/phone');
  };

  return (
    <Screen withPadding style={styles.container}>
      <Animated.View
        style={[
          styles.content,
          {
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }],
          },
        ]}
      >
        <View style={styles.textContainer}>
          <Text style={styles.title}>
            Not just groceries. We bring you what matters.
          </Text>
        </View>

        <View style={styles.imageGrid}>
          <View style={styles.imageRow}>
            <Image
              source={{
                uri: 'https://images.pexels.com/photos/1092730/pexels-photo-1092730.jpeg',
              }}
              style={[styles.image, styles.image2]}
              resizeMode="cover"
            />
          </View>
        </View>

        <View style={styles.smallTextContainer}>
          <Text style={styles.description}>
            We're not a marketplace with a sea of choices. Every item is
            something we'd give our own families.
          </Text>
        </View>
        <View style={styles.buttonContainer}>
          <Pressable
            style={({ pressed }) => [
              styles.discoverButton,
              pressed && styles.discoverButtonPressed,
            ]}
            onPress={handleStart}
          >
            <Text style={styles.discoverButtonText}>Discover</Text>
          </Pressable>
        </View>
      </Animated.View>
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
    alignItems: 'center',
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: SIZES.xxlarge,
  },
  logo: {
    fontFamily: 'Inter-Bold',
    fontSize: 32,
    color: COLORS.primary,
    marginBottom: SIZES.base,
  },
  tagline: {
    fontFamily: 'Inter-Medium',
    fontSize: SIZES.font,
    color: COLORS.textSecondary,
  },
  imageGrid: {
    width: '100%',
    marginBottom: SIZES.xxlarge,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: SIZES.medium,
  },
  image: {
    borderRadius: SIZES.base,
    height: 380,
  },
  image1: {
    width: '80%',
  },
  image2: {
    width: '80%',
  },
  image3: {
    width: '80%',
  },
  image4: {
    width: '80%',
  },
  textContainer: {
    width: '80%',
    marginBottom: SIZES.xlarge,
    marginTop: SIZES.huge,
  },
  smallTextContainer: {
    width: '80%',
    marginBottom: SIZES.small,
    // marginTop: SIZES.small
  },
  title: {
    ...FONTS.h1,
    color: COLORS.text,
    marginBottom: SIZES.medium,
    textAlign: 'center',
  },
  description: {
    ...FONTS.body,
    color: COLORS.textSecondary,
    textAlign: 'center',
    lineHeight: SIZES.font * 1.5,
  },
  buttonContainer: {
    alignItems: 'center',
    marginTop: SIZES.large,
  },
  discoverButton: {
    backgroundColor: COLORS.black,
    paddingVertical: 14,
    paddingHorizontal: 62,
    borderRadius: 10,
  },
  discoverButtonPressed: {
    opacity: 0.8,
  },
  discoverButtonText: {
    color: COLORS.white,
    ...FONTS.h3,
    textAlign: 'center',
  },
});

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Image,
} from 'react-native';
import { OnboardingHeader } from '@/components/common/OnboardingHeader';
import { SelectionOption } from '@/components/common/SelectionOption';
import { NavigationButtons } from '@/components/common/NavigationButtons';
import { useRouter } from 'expo-router';
import ProgressBar from '@/components/common/ProgressBar';
import {
  useOnboardingStore,
  //   DietaryPreference,
} from '../../store/onboardingStore';
import { useUserStore } from '@/store/userStore';
import { COLORS, FONTS, SIZES } from '@/constants/theme';

export default function ShoppingPreference() {
  const router = useRouter();
  const { currentStep, totalSteps } = useUserStore();
  const { setCurrentStep, shoppingPreferences, toggleShoppingPreference } =
    useUserStore();

  const { setCurrentStep: setCurrentOnboardingStep, completeStep } =
    useOnboardingStore();

  React.useEffect(() => {
    setCurrentStep(1);
    setCurrentOnboardingStep('userInfo');
  }, []);

  const handleSkip = () => {
    completeStep('userInfo');
    // Navigate to samples selection
    router.push('/onboarding/samples');
  };

  const handleNext = () => {
    router.push('/onboarding/dietary-preferences');
  };

  const handleBack = () => {
    router.back();
  };

  return (
    <>
      <SafeAreaView style={styles.container}>
        <OnboardingHeader
          title="Fresh means today, not last week."
          showSkip={true}
          onSkip={handleSkip}
        />
        <View style={styles.infoContent}>
          <View style={styles.imageContainer}>
            <Image
              source={{
                uri: 'https://images.pexels.com/photos/8105034/pexels-photo-8105034.jpeg',
              }}
              style={styles.image}
              resizeMode="cover"
            />
          </View>

          <Text style={styles.description}>
            Our produce doesn't sit in warehouses. It's sourced with care and
            delivered with speed — so your kitchen stays fresh, always.
          </Text>
        </View>
        <ProgressBar
          progressColor={COLORS.lightBlack}
          height={1.5}
          progress={totalSteps > 0 ? currentStep / totalSteps : 0}
        />
      </SafeAreaView>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.question}>Who are you usually shopping for?</Text>
        <View style={styles.optionsContainer}>
          <View style={styles.pillRow}>
            <View>
              <SelectionOption
                label="Just me"
                selected={shoppingPreferences.includes('just-me')}
                onPress={() => toggleShoppingPreference('just-me')}
                pill={true}
                style={styles.pillOption}
              />
            </View>

            <View>
              <SelectionOption
                label="Me & my partner"
                selected={shoppingPreferences.includes('me-and-partner')}
                onPress={() => toggleShoppingPreference('me-and-partner')}
                pill={true}
                style={styles.pillOption}
              />
            </View>

            <View>
              <SelectionOption
                label="Family with kids"
                selected={shoppingPreferences.includes('family-with-kids')}
                onPress={() => toggleShoppingPreference('family-with-kids')}
                pill={true}
                style={styles.pillOption}
              />
            </View>

            <View>
              <SelectionOption
                label="Elders at home"
                selected={shoppingPreferences.includes('elders-at-home')}
                onPress={() => toggleShoppingPreference('elders-at-home')}
                pill={true}
                style={styles.pillOption}
              />
            </View>

            <View>
              <SelectionOption
                label="Pets"
                selected={shoppingPreferences.includes('pets')}
                onPress={() => toggleShoppingPreference('pets')}
                pill={true}
                style={styles.pillOption}
              />
            </View>
          </View>
        </View>
      </ScrollView>

      <NavigationButtons
        nextDisabled={shoppingPreferences.length === 0}
        onNext={handleNext}
        onBack={handleBack}
      />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    backgroundColor: COLORS.background,
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 30,
    paddingHorizontal: 20,
    paddingTop: SIZES.large,
    backgroundColor: COLORS.white,
  },
  infoContent: {
    paddingHorizontal: 20,
  },
  imageContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 20,
  },
  image: {
    width: 160,
    height: 160,
    borderRadius: 80,
  },
  description: {
    ...FONTS.h4,
    marginBottom: SIZES.xxlarge,
    marginTop: SIZES.xlarge,
    textAlign: 'center',
    paddingHorizontal: 25,
  },
  question: {
    ...FONTS.h3,
    marginBottom: 20,
    fontWeight: '400',
  },
  optionsContainer: {
    marginBottom: 20,
  },
  pillRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 16,
  },
  pillOption: {
    marginRight: 8,
    marginBottom: 8,
  },
});

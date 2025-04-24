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

export default function DietaryPreferences() {
  const router = useRouter();
  const { currentStep, totalSteps } = useUserStore();
  const { setCurrentStep, dietaryPreferences, toggleDietaryPreference } =
    useUserStore();

  const { setCurrentStep: setCurrentOnboardingStep, completeStep } =
    useOnboardingStore();

  React.useEffect(() => {
    setCurrentStep(2);
    setCurrentOnboardingStep('userInfo');
  }, []);

  const handleSkip = () => {
    completeStep('userInfo');
    // Navigate to samples selection
    router.push('/onboarding/samples');
  };

  const handleNext = () => {
    router.push('/onboarding/allergies');
  };

  const handleBack = () => {
    setCurrentStep(1);
    router.back();
  };

  return (
    <>
      <SafeAreaView style={styles.container}>
        <OnboardingHeader
          title="Better-for-you doesn't mean expensive."
          showSkip={true}
          onSkip={handleSkip}
        />
        <View style={styles.infoContent}>
          <View style={styles.imageContainer}>
            <Image
              source={{
                uri: 'https://images.pexels.com/photos/2255935/pexels-photo-2255935.jpeg',
              }}
              style={styles.image}
              resizeMode="cover"
            />
          </View>

          <Text style={styles.description}>
            We source ethically from trusted partners—so you get premium quality
            ingredients at prices that make sense, not margins.
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
        <Text style={styles.question}>
          Do you follow any specific food preferences or dietary choices?
        </Text>
        <View style={styles.optionsContainer}>
          <View style={styles.pillRow}>
            <View>
              <SelectionOption
                label="Vegetarian"
                selected={dietaryPreferences.includes('vegetarian')}
                onPress={() => toggleDietaryPreference('vegetarian')}
                pill={true}
                style={styles.pillOption}
              />
            </View>

            <View>
              <SelectionOption
                label="Vegan"
                selected={dietaryPreferences.includes('vegan')}
                onPress={() => toggleDietaryPreference('vegan')}
                pill={true}
                style={styles.pillOption}
              />
            </View>

            <View>
              <SelectionOption
                label="Gluten-Free"
                selected={dietaryPreferences.includes('gluten-free')}
                onPress={() => toggleDietaryPreference('gluten-free')}
                pill={true}
                style={styles.pillOption}
              />
            </View>

            <View>
              <SelectionOption
                label="Just eat what feels right"
                selected={dietaryPreferences.includes('just-eat-whats-right')}
                onPress={() => toggleDietaryPreference('just-eat-whats-right')}
                pill={true}
                style={styles.pillOption}
              />
            </View>

            <View>
              <SelectionOption
                label="High-Protein"
                selected={dietaryPreferences.includes('high-protein')}
                onPress={() => toggleDietaryPreference('high-protein')}
                pill={true}
                style={styles.pillOption}
              />
            </View>

            <View>
              <SelectionOption
                label="Keto"
                selected={dietaryPreferences.includes('keto')}
                onPress={() => toggleDietaryPreference('keto')}
                pill={true}
                style={styles.pillOption}
              />
            </View>
          </View>
        </View>
      </ScrollView>

      <NavigationButtons
        nextDisabled={dietaryPreferences.length === 0}
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

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

export default function Allergies() {
  const router = useRouter();
  const { currentStep, totalSteps } = useUserStore();
  const { setCurrentStep, allergies, toggleAllergy } = useUserStore();

  const { setCurrentStep: setCurrentOnboardingStep, completeStep } =
    useOnboardingStore();

  React.useEffect(() => {
    setCurrentStep(3);
    setCurrentOnboardingStep('userInfo');
  }, []);

  const handleSkip = () => {
    completeStep('userInfo');
    // Navigate to samples selection
    router.push('/onboarding/samples');
  };

  const handleNext = () => {
    completeStep('userInfo');
    router.push('/onboarding/samples');
  };

  const handleBack = () => {
    setCurrentStep(2);
    router.back();
  };

  return (
    <>
      <SafeAreaView style={styles.container}>
        <OnboardingHeader
          title="We decode labels so you don't have to."
          showSkip={true}
          onSkip={handleSkip}
        />
        <View style={styles.infoContent}>
          <View style={styles.imageContainer}>
            <Image
              source={{
                uri: 'https://images.pexels.com/photos/5945646/pexels-photo-5945646.jpeg',
              }}
              style={styles.image}
              resizeMode="cover"
            />
          </View>

          <Text style={styles.description}>
            Every product is tested, verified, and transparently labeled.
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
                label="Lactose"
                selected={allergies.includes('lactose')}
                onPress={() => toggleAllergy('lactose')}
                pill={true}
                style={styles.pillOption}
              />
            </View>

            <View>
              <SelectionOption
                label="Gluten"
                selected={allergies.includes('gluten')}
                onPress={() => toggleAllergy('gluten')}
                pill={true}
                style={styles.pillOption}
              />
            </View>

            <View>
              <SelectionOption
                label="Nuts"
                selected={allergies.includes('nuts')}
                onPress={() => toggleAllergy('nuts')}
                pill={true}
                style={styles.pillOption}
              />
            </View>

            <View>
              <SelectionOption
                label="Refined sugar"
                selected={allergies.includes('refined-sugar')}
                onPress={() => toggleAllergy('refined-sugar')}
                pill={true}
                style={styles.pillOption}
              />
            </View>

            <View>
              <SelectionOption
                label="Soy"
                selected={allergies.includes('soy')}
                onPress={() => toggleAllergy('soy')}
                pill={true}
                style={styles.pillOption}
              />
            </View>

            <View>
              <SelectionOption
                label="Nope, all good!"
                selected={allergies.includes('none')}
                onPress={() => toggleAllergy('none')}
                pill={true}
                style={styles.pillOption}
              />
            </View>
          </View>
        </View>
      </ScrollView>

      <NavigationButtons
        nextDisabled={allergies.length === 0}
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
    paddingHorizontal: 30,
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

import React from 'react';
import { View, StyleSheet } from 'react-native';
import Button from './Button';
import { useUserStore } from '@/store/userStore';
import { COLORS } from '@/constants/theme';
import ButtonV2 from './ButtonV2';

interface NavigationButtonsProps {
  onNext?: () => void;
  onBack?: () => void;
  nextDisabled?: boolean;
  nextLabel?: string;
  backLabel?: string;
  showBack?: boolean;
}

export const NavigationButtons: React.FC<NavigationButtonsProps> = ({
  onNext,
  onBack,
  nextDisabled = false,
  nextLabel = 'Next',
  backLabel = 'Back',
  showBack = true,
}) => {
  const { nextStep, previousStep } = useUserStore();

  const handleNext = () => {
    if (onNext) {
      onNext();
    } else {
      nextStep();
    }
  };

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      previousStep();
    }
  };

  return (
    <View style={styles.container}>
      {showBack ? (
        <ButtonV2
          size="smallMedium"
          title={backLabel}
          onPress={handleBack}
          variant="text"
          style={styles.backButton}
        />
      ) : (
        <View style={styles.backButtonPlaceholder} />
      )}
      <ButtonV2
        size="smallMedium"
        title={nextLabel}
        onPress={handleNext}
        disabled={nextDisabled}
        style={styles.nextButton}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 45,
    backgroundColor: COLORS.white,
  },
  backButton: {
    flex: 1,
    marginRight: 8,
  },
  backButtonPlaceholder: {
    flex: 1,
    marginRight: 8,
  },
  nextButton: {
    flex: 1,
    marginLeft: 8,
  },
});

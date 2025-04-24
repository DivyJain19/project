import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useUserStore } from '@/store/userStore';
import { SIZES, FONTS, COLORS } from '@/constants/theme';
// import { ProgressBar } from './ProgressBar';

interface OnboardingHeaderProps {
  title: string;
  subtitle?: string;
  showSkip?: boolean;
  onSkip?: () => void;
}

export const OnboardingHeader: React.FC<OnboardingHeaderProps> = ({
  title,
  subtitle,
  showSkip = true,
  onSkip,
}) => {

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        {showSkip && (
          <TouchableOpacity onPress={onSkip} style={styles.skipButton}>
            <Text style={styles.skipText}>Skip</Text>
          </TouchableOpacity>
        )}
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.title}>{title}</Text>
        {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 0,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginBottom: 20,
  },
  skipButton: {
    padding: 8,
  },
  skipText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#000000',
  },
  textContainer: {
    width: '100%',
    paddingHorizontal: 40,
  },
  title: {
    ...FONTS.h1,
        color: COLORS.text,
        marginBottom: SIZES.medium,
        textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#6B6B6B',
    lineHeight: 24,
    marginTop: 8,
  },
});

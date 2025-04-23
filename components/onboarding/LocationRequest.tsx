import React, { useState } from 'react';
import { View, StyleSheet, Text, Image, Platform } from 'react-native';
import ButtonV2 from '@/components/common/ButtonV2';
import { COLORS, FONTS, SIZES } from '@/constants/theme';

interface LocationRequestProps {
  onLocationRequest: () => void;
  onSkip: () => void;
  loading?: boolean;
}

const LocationRequest = ({
  onLocationRequest,
  onSkip,
  loading = false,
}: LocationRequestProps) => {
  return (
    <View style={styles.container}>
      
      
      <View style={styles.contentContainer}>
        <Text style={styles.title}>Where should we deliver your essentials?</Text>
        <Text style={styles.description}>
          We need your location to show available products
        </Text>
      </View>
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: 'https://images.pexels.com/photos/1051077/pexels-photo-1051077.jpeg' }}
          style={styles.image}
          resizeMode="cover"
        />
      </View>
      <View style={styles.buttonContainer}>
        <ButtonV2
          title="Continue"
          size="medium"
          loading={loading}
          onPress={onLocationRequest}
        />
      </View>
      
      <Text style={styles.manualText} onPress={onSkip}>
        Enter location manually
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageContainer: {
    height: SIZES.height * 0.55,
    width: '100%',
    marginBottom: SIZES.xxlarge,
    borderRadius: SIZES.base,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  contentContainer: {
    marginBottom: SIZES.xlarge,
  },
  title: {
    ...FONTS.h1,
    color: COLORS.text,
    marginBottom: SIZES.small,
  },
  description: {
    ...FONTS.body,
    color: COLORS.textSecondary,
    marginBottom: SIZES.large,
  },
  infoBox: {
    backgroundColor: Platform.OS === 'ios' ? COLORS.veryLightGray : COLORS.white,
    padding: SIZES.medium,
    borderRadius: SIZES.base,
    ...Platform.select({
      ios: {
        shadowColor: COLORS.black,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 2,
        borderWidth: 1,
        borderColor: COLORS.veryLightGray,
      },
    }),
  },
  infoTitle: {
    color: COLORS.text,
    marginBottom: SIZES.base,
  },
  infoDescription: {
    ...FONTS.caption,
    color: COLORS.textSecondary,
  },
  buttonContainer: {
    alignItems: 'center',
    marginBottom: SIZES.xlarge,
  },
  secondaryButton: {
    marginTop: SIZES.medium,
  },
  textButton: {
    marginTop: SIZES.medium,
  },
  manualText: {
    ...FONTS.body,
    color: COLORS.black,
    textAlign: 'center',
    textDecorationLine: 'underline',
  },
});

export default LocationRequest;
import React, { useState } from 'react';
import { View, StyleSheet, Text, Image, Platform } from 'react-native';
import Button from '@/components/common/Button';
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
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: 'https://images.pexels.com/photos/1051077/pexels-photo-1051077.jpeg' }}
          style={styles.image}
          resizeMode="cover"
        />
      </View>
      
      <View style={styles.contentContainer}>
        <Text style={styles.title}>Where should we deliver your essentials?</Text>
        <Text style={styles.description}>
          We need your location to show available products and delivery options in your area.
        </Text>
        
        <View style={styles.infoBox}>
          <Text style={styles.infoTitle}>
            Allow "Weather" to access your location while you are using the app?
          </Text>
          <Text style={styles.infoDescription}>
            App explanation for 'While Use App': "Your location is used to show local weather."
          </Text>
        </View>
      </View>
      
      <View style={styles.buttonContainer}>
        <Button
          title="Allow While Using App"
          size="large"
          onPress={onLocationRequest}
          loading={loading}
        />
        <Button
          title="Allow Once"
          variant="outline"
          size="large"
          onPress={onLocationRequest}
          style={styles.secondaryButton}
        />
        <Button
          title="Don't Allow"
          variant="text"
          size="large"
          onPress={onSkip}
          style={styles.textButton}
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
    height: SIZES.height * 0.25,
    width: '100%',
    marginBottom: SIZES.large,
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
    ...FONTS.h2,
    color: COLORS.text,
    marginBottom: SIZES.medium,
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
    ...FONTS.medium,
    color: COLORS.text,
    marginBottom: SIZES.base,
  },
  infoDescription: {
    ...FONTS.caption,
    color: COLORS.textSecondary,
  },
  buttonContainer: {
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
    color: COLORS.primary,
    textAlign: 'center',
    textDecorationLine: 'underline',
  },
});

export default LocationRequest;
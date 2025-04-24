import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { COLORS, FONTS, SIZES } from '@/constants/theme';
import ButtonV2 from './ButtonV2';

interface HeaderProps {
  mainAddress: string;
  subAddress: string;
  borderColor?: string;
  onNext: () => void;
}

const AddressBar = ({
  mainAddress,
  subAddress,
  borderColor = COLORS.background,
  onNext,
}: HeaderProps) => {
  return (
    <View style={[styles.container, { borderColor }]}>
      <Text style={styles.heading}>Selected Location</Text>
      <Text style={styles.title}>{mainAddress}</Text>
      <Text style={styles.subTitle}>{subAddress}</Text>
      <ButtonV2
        variant="outline"
        title="Next"
        style={{ borderColor: '#5F8B4C', borderWidth: 2 }}
        size="large"
        onPress={onNext}
      ></ButtonV2>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 2,
    borderRadius: 8,
    padding: SIZES.medium,
    backgroundColor: COLORS.background,
  },
  leftContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  backButton: {
    marginRight: SIZES.base,
  },
  heading: {
    ...FONTS.h3,
    opacity: 0.6,
    borderBottomWidth: 1,
    paddingBottom: 10,
    marginBottom: 8
  },
  title: {
    ...FONTS.h3,
    color: COLORS.black,
    flex: 1,
    marginBottom: SIZES.xsmall,
  },
  subTitle: {
    ...FONTS.h4,
    color: COLORS.lightGray,
    flex: 1,
    marginBottom: SIZES.medium,
  },
  rightContainer: {
    marginLeft: SIZES.base,
  },
});

export default AddressBar;

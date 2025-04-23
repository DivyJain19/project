import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS, FONTS } from '@/constants/theme';

export default function WishlistScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Wishlist Screen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.background,
  },
  text: {
    ...FONTS.h2,
    color: COLORS.text,
  },
});
import React from 'react';
import { StyleSheet } from 'react-native';
import { Stack } from 'expo-router';
import { useFrameworkReady } from '@/hooks/useFrameworkReady';

export default function OnboardingLayout() {
  useFrameworkReady();
  
  return (
    <Stack 
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
      }}
    >
      <Stack.Screen name="welcome" />
      <Stack.Screen name="phone" />
      <Stack.Screen name="otp" />
      <Stack.Screen name="location" />
      <Stack.Screen name="address" />
      <Stack.Screen name="address-map" />
      <Stack.Screen name="shopping-preferences" />
      <Stack.Screen name="dietary-preferences" />
      <Stack.Screen name="allergies" />
      <Stack.Screen name="user-info" />
      <Stack.Screen name="samples" />
    </Stack>
  );
}
import { useEffect, useState } from 'react';
import * as Font from 'expo-font';
import {
  Inter_300Light,
  Inter_400Regular,
  Inter_500Medium,
  Inter_700Bold,
} from '@expo-google-fonts/inter';
import * as SplashScreen from 'expo-splash-screen';

// Prevent the splash screen from automatically hiding
SplashScreen.preventAutoHideAsync();

export const useFonts = () => {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    const loadFonts = async () => {
      try {
        await Font.loadAsync({
          'Inter-Light': Inter_300Light,
          'Inter-Regular': Inter_400Regular,
          'Inter-Medium': Inter_500Medium,
          'Inter-Bold': Inter_700Bold,
        });
        setFontsLoaded(true);
      } catch (error) {
        console.error('Error loading fonts:', error);
      } finally {
        // Hide the splash screen once fonts are loaded
        await SplashScreen.hideAsync();
      }
    };

    loadFonts();
  }, []);

  return fontsLoaded;
};
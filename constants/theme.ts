import { Dimensions } from 'react-native';

export const { width, height } = Dimensions.get('window');

export const COLORS = {
  // Base colors
  primary: '#3B82F6', // Blue
  primaryLight: '#93C5FD',
  primaryDark: '#1D4ED8',
  
  // Secondary colors
  secondary: '#14B8A6', // Teal
  secondaryLight: '#5EEAD4',
  secondaryDark: '#0F766E',
  
  // Accent colors
  accent: '#F97316', // Orange
  accentLight: '#FDBA74',
  accentDark: '#C2410C',
  
  // Feedback colors
  success: '#10B981', // Green
  successLight: '#A7F3D0',
  successDark: '#047857',
  
  warning: '#F59E0B', // Amber
  warningLight: '#FCD34D',
  warningDark: '#B45309',
  
  error: '#EF4444', // Red
  errorLight: '#FCA5A5',
  errorDark: '#B91C1C',
  
  // Neutrals
  black: '#1E293B',
  lightBlack: '#222222',
  darkGray: '#334155',
  mediumGray: '#64748B',
  lightGray: '#94A3B8',
  veryLightGray: '#E2E8F0',
  white: '#FFFFFF',
  
  // Background
  background: '#F5F3E9',
  card: '#FFFFFF',
  header: '#4E342E',
  
  // Text
  text: '#1E293B',
  textSecondary: '#64748B',
  textDisabled: '#94A3B8',
};

export const SIZES = {
  // Global sizes
  base: 8,
  xsmall: 8,
  small: 12,
  font: 14,
  medium: 16,
  large: 18,
  xlarge: 24,
  xxlarge: 32,
  huge: 50,
  
  // Screen dimensions
  width,
  height,
};

export const SHADOWS = {
  small: {
    shadowColor: COLORS.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 2,
  },
  medium: {
    shadowColor: COLORS.black,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4.65,
    elevation: 4,
  },
  large: {
    shadowColor: COLORS.black,
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.15,
    shadowRadius: 6.68,
    elevation: 6,
  },
};

export const FONTS = {
  regular: 'Georgia',
  medium: 'Georgia',
  bold: 'Georgia',
  light: 'Georgia',
  
  h1: {
    fontFamily: 'Georgia',
    fontSize: SIZES.xxlarge,
    lineHeight: SIZES.xxlarge * 1.2,
  },
  h2: {
    fontFamily: 'Georgia',
    fontSize: SIZES.xlarge,
    lineHeight: SIZES.xlarge * 1.2,
  },
  h3: {
    fontFamily: 'Georgia',
    fontSize: SIZES.large,
    lineHeight: SIZES.large * 1.2,
  },
  h4: {
    fontFamily: 'Georgia',
    fontSize: SIZES.medium,
    lineHeight: SIZES.large,
  },
  body: {
    fontFamily: 'Georgia',
    fontSize: SIZES.font,
    lineHeight: SIZES.font * 1.5,
  },
  bodySmall: {
    fontFamily: 'Georgia',
    fontSize: SIZES.small,
    lineHeight: SIZES.small * 1.5,
  },
  button: {
    fontFamily: 'Georgia',
    fontSize: SIZES.font,
    lineHeight: SIZES.font * 1.2,
  },
  caption: {
    fontFamily: 'Georgia',
    fontSize: SIZES.small,
    lineHeight: SIZES.small * 1.5,
  },
};


export const theme = { COLORS, SIZES, FONTS, SHADOWS };
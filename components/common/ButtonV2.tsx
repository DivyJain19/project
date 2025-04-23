import React from 'react';
import {
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import { COLORS, FONTS, SIZES, SHADOWS } from '@/constants/theme';

interface ButtonProps extends TouchableOpacityProps {
  title: string;
  variant?: 'primary' | 'secondary' | 'outline' | 'text';
  size?: 'small' | 'medium' | 'large';
  loading?: boolean;
  disabled?: boolean;
}

const ButtonV2 = ({
  title,
  variant = 'primary',
  size = 'medium',
  loading = false,
  disabled = false,
  style,
  ...rest
}: ButtonProps) => {
  const buttonStyles = getButtonStyles(variant, size, disabled);
  const textStyles = getTextStyles(variant, size);

  return (
    <TouchableOpacity
      style={[buttonStyles, style]}
      disabled={disabled || loading}
      activeOpacity={0.7}
      {...rest}
    >
      {loading ? (
        <ActivityIndicator
          color={
            variant === 'outline' || variant === 'text'
              ? COLORS.primary
              : COLORS.white
          }
          size={size === 'small' ? 'small' : 'small'}
        />
      ) : (
        <Text style={textStyles}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};

const getButtonStyles = (
  variant: 'primary' | 'secondary' | 'outline' | 'text',
  size: 'small' | 'medium' | 'large',
  disabled: boolean
) => {
  // Base styles
  const baseStyle = {
    borderRadius: SIZES.base,
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
  };

  // Size variations
  const sizeStyles = {
    small: {
      paddingVertical: SIZES.base,
      paddingHorizontal: SIZES.medium,
      minWidth: SIZES.width * 0.25,
    },
    medium: {
      paddingVertical: SIZES.medium,
      paddingHorizontal: SIZES.large,
      minWidth: SIZES.width * 0.5,
    },
    large: {
      paddingVertical: SIZES.medium,
      paddingHorizontal: SIZES.large,
      width: '100%',
    },
  };

  // Variant styles
  const variantStyles = {
    primary: {
      backgroundColor: disabled ? COLORS.lightGray : COLORS.black,
      ...SHADOWS.small,
    },
    secondary: {
      backgroundColor: disabled ? COLORS.secondaryLight : COLORS.secondary,
      ...SHADOWS.small,
    },
    outline: {
      backgroundColor: 'transparent',
      borderWidth: 1,
      borderColor: disabled ? COLORS.primaryLight : COLORS.primary,
    },
    text: {
      backgroundColor: 'transparent',
    },
  };

  return {
    ...baseStyle,
    ...sizeStyles[size],
    ...variantStyles[variant],
  };
};

const getTextStyles = (
  variant: 'primary' | 'secondary' | 'outline' | 'text',
  size: 'small' | 'medium' | 'large'
) => {
  // Base text styles
  const baseTextStyle = {
    ...FONTS.button,
    textAlign: 'center' as const,
  };

  // Size variations
  const sizeTextStyles = {
    small: {
      fontSize: SIZES.small,
    },
    medium: {
      fontSize: SIZES.font,
    },
    large: {
      ...FONTS.h3,
    },
  };

  // Variant text styles
  const variantTextStyles = {
    primary: {
      color: COLORS.white,
    },
    secondary: {
      color: COLORS.white,
    },
    outline: {
      color: COLORS.primary,
    },
    text: {
      color: COLORS.primary,
    },
  };

  return {
    ...baseTextStyle,
    ...sizeTextStyles[size],
    ...variantTextStyles[variant],
  };
};

export default ButtonV2;

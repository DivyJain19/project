import React, { useState } from 'react';
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  TextInputProps,
  TouchableOpacity,
} from 'react-native';
import { COLORS, FONTS, SIZES } from '@/constants/theme';
import { Eye, EyeOff } from 'lucide-react-native';

interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  isPassword?: boolean;
  containerStyle?: object;
}

const Input = ({
  label,
  error,
  leftIcon,
  rightIcon,
  isPassword = false,
  containerStyle,
  style,
  ...rest
}: InputProps) => {
  const [isFocused, setIsFocused] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  return (
    <View style={[styles.container, containerStyle]}>
      {label && <Text style={styles.label}>{label}</Text>}
      
      <View
        style={[
          styles.inputContainer,
          error && styles.errorInput,
        ]}
      >
        {leftIcon && <View style={styles.leftIconContainer}>{leftIcon}</View>}
        
        <TextInput
          style={[
            styles.input,
            leftIcon && styles.inputWithLeftIcon,
            rightIcon && styles.inputWithRightIcon,
            isPassword && !rightIcon && styles.inputWithRightIcon,
            style,
          ]}
          placeholderTextColor={COLORS.textDisabled}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          secureTextEntry={isPassword && !isPasswordVisible}
          {...rest}
        />
        
        {isPassword ? (
          <TouchableOpacity
            style={styles.rightIconContainer}
            onPress={togglePasswordVisibility}
          >
            {isPasswordVisible ? (
              <EyeOff size={20} color={COLORS.mediumGray} />
            ) : (
              <Eye size={20} color={COLORS.mediumGray} />
            )}
          </TouchableOpacity>
        ) : (
          rightIcon && <View style={styles.rightIconContainer}>{rightIcon}</View>
        )}
      </View>
      
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: SIZES.medium,
  },
  label: {
    ...FONTS.body,
    color: COLORS.text,
    marginBottom: SIZES.base / 2,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 0,
    borderRadius: SIZES.base,
  },
  focusedInput: {
    // borderColor: COLORS.primary,
  },
  errorInput: {
    borderColor: COLORS.error,
  },
  input: {
    ...FONTS.h3,
    flex: 1,
    color: COLORS.text,
    paddingVertical: SIZES.base * 1,
    paddingHorizontal: SIZES.medium,
  },
  inputWithLeftIcon: {
    paddingLeft: SIZES.base,
  },
  inputWithRightIcon: {
    paddingRight: SIZES.base,
  },
  leftIconContainer: {
    paddingLeft: SIZES.base * 1.5,
  },
  rightIconContainer: {
    paddingRight: SIZES.base * 1.5,
  },
  errorText: {
    ...FONTS.caption,
    color: COLORS.error,
    marginTop: SIZES.base / 2,
  },
});

export default Input;
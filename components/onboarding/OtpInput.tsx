import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  StyleSheet,
  TextInput,
  Text,
  Keyboard,
  Platform,
} from 'react-native';
import Button from '@/components/common/Button';
import { COLORS, FONTS, SIZES } from '@/constants/theme';
import ButtonV2 from '../common/ButtonV2';

interface OtpInputProps {
  length?: number;
  onSubmit: (otp: string) => void;
  loading?: boolean;
  phoneNumber: string;
  resendOtp?: () => void;
}

const OtpInput = ({
  length = 4,
  onSubmit,
  loading = false,
  phoneNumber,
  resendOtp,
}: OtpInputProps) => {
  const [otp, setOtp] = useState(Array(length).fill(''));
  const [activeIndex, setActiveIndex] = useState(0);
  const [countdown, setCountdown] = useState(30);
  const inputRefs = useRef<(TextInput | null)[]>([]);

  // Initialize input refs array
  useEffect(() => {
    inputRefs.current = inputRefs.current.slice(0, length);
  }, [length]);

  // Countdown timer
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  const handleResendOtp = () => {
    setCountdown(30);
    if (resendOtp) resendOtp();
  };

  const handleChange = (text: string, index: number) => {
    if (text.length > 1) {
      // Handle paste event
      const pastedOtp = text.split('').slice(0, length);
      const newOtp = [...otp];

      pastedOtp.forEach((digit, i) => {
        if (index + i < length) {
          newOtp[index + i] = digit;
        }
      });

      setOtp(newOtp);

      // Focus the last input or submit if complete
      const focusIndex = Math.min(index + pastedOtp.length, length - 1);
      inputRefs.current[focusIndex]?.focus();

      if (index + pastedOtp.length >= length) {
        Keyboard.dismiss();
        onSubmit(newOtp.join(''));
      }
    } else {
      // Handle single digit input
      const newOtp = [...otp];
      newOtp[index] = text;
      setOtp(newOtp);

      // Move to next input if a digit was entered
      if (text && index < length - 1) {
        inputRefs.current[index + 1]?.focus();
      } else if (!text && index > 0) {
        // If backspace with empty field, move to previous
        inputRefs.current[index - 1]?.focus();
      }

      // Check if OTP is complete
      if (text && index === length - 1) {
        Keyboard.dismiss();

        const isComplete = newOtp.every((digit) => digit);
        if (isComplete) {
          onSubmit(newOtp.join(''));
        }
      }
    }
  };

  const handleKeyPress = (e: any, index: number) => {
    // Handle backspace when input is empty
    if (e.nativeEvent.key === 'Backspace' && !otp[index] && index > 0) {
      // Clear previous digit and move focus back
      const newOtp = [...otp];
      newOtp[index - 1] = '';
      setOtp(newOtp);
      inputRefs.current[index - 1]?.focus();
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputsContainer}>
        {Array(length)
          .fill(0)
          .map((_, index) => (
            <TextInput
              key={index}
              ref={(ref) => (inputRefs.current[index] = ref)}
              style={[
                styles.input,
                activeIndex === index && styles.activeInput,
                otp[index] ? styles.filledInput : null,
              ]}
              maxLength={Platform.OS === 'ios' ? 1 : length}
              keyboardType="number-pad"
              value={otp[index]}
              onChangeText={(text) => handleChange(text, index)}
              onKeyPress={(e) => handleKeyPress(e, index)}
              onFocus={() => setActiveIndex(index)}
              onBlur={() => setActiveIndex(-1)}
              textContentType="oneTimeCode"
              autoComplete="sms-otp"
              selectTextOnFocus
            />
          ))}
      </View>

      <View style={styles.timerContainer}>
        <Text style={styles.timerText}>
          Didn't receive OTP? Retry in{' '}
          <Text style={styles.countdownText}>{countdown}s</Text>
        </Text>

        {countdown === 0 && (
          <Text style={styles.resendLink} onPress={handleResendOtp}>
            Resend OTP
          </Text>
        )}
      </View>

      <View style={styles.buttonContainer}>
        <ButtonV2
          title="Verify"
          size="medium"
          loading={loading}
          disabled={!otp.every((digit) => digit)}
          onPress={() => onSubmit(otp.join(''))}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  inputsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: SIZES.large,
  },
  input: {
    width: 60,
    height: 60,
    borderBottomWidth: 2,
    borderColor: COLORS.veryLightGray,
    paddingBottom: SIZES.small,
    textAlign: 'center',
    fontSize: SIZES.large,
    fontFamily: FONTS.medium,
    color: COLORS.text,
  },
  activeInput: {
    borderColor: COLORS.black,
    // borderWidth: 2,
  },
  filledInput: {
    // backgroundColor: COLORS.veryLightGray,
  },
  timerContainer: {
    alignItems: 'center',
    marginBottom: SIZES.large * 1.5,
  },
  timerText: {
    ...FONTS.caption,
    color: COLORS.textSecondary,
  },
  countdownText: {
    color: COLORS.primary,
    fontFamily: FONTS.medium,
  },
  resendLink: {
    fontFamily: FONTS.medium,
    color: COLORS.primary,
    marginTop: SIZES.base,
  },
  buttonContainer: {
    alignItems: 'center',
  },
});

export default OtpInput;

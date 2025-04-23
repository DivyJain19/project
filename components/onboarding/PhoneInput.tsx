import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Pressable,
} from 'react-native';
import Input from '@/components/common/Input';
import Button from '@/components/common/Button';
import { COLORS, FONTS, SIZES } from '@/constants/theme';
import { Check } from 'lucide-react-native';
import ButtonV2 from '../common/ButtonV2';

interface PhoneInputProps {
  onSubmit: (phoneNumber: string) => void;
  loading?: boolean;
}

const PhoneInput = ({ onSubmit, loading = false }: PhoneInputProps) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [error, setError] = useState('');
  const [countryCode, setCountryCode] = useState('(IN) +91'); // Default to India
  const [checked, setChecked] = useState(false);

  const validatePhoneNumber = (phone: string) => {
    // Simple validation - can be made more complex for specific country codes
    if (!phone.trim()) {
      setError('Phone number is required');
      return false;
    }

    // For India (+91), expect 10 digits
    if (countryCode === '(IN) +91' && !/^\d{10}$/.test(phone)) {
      setError('Please enter a valid 10-digit phone number');
      return false;
    }

    setError('');
    return true;
  };

  const handleSubmit = () => {
    if (validatePhoneNumber(phoneNumber)) {
      onSubmit(`${countryCode}${phoneNumber}`);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TouchableOpacity style={styles.countryCodeContainer}>
          <Text style={styles.countryCode}>{countryCode}</Text>
        </TouchableOpacity>

        <View style={styles.phoneInputWrapper}>
          <Input
            placeholder="Enter mobile number"
            keyboardType="phone-pad"
            value={phoneNumber}
            onChangeText={(text) => {
              setPhoneNumber(text);
              if (error) validatePhoneNumber(text);
            }}
            error={error}
            containerStyle={styles.phoneInput}
          />
        </View>
      </View>
      <View style={styles.bottomPart}>
        <Pressable
          onPress={() => setChecked(!checked)}
          style={styles.checkboxWrapper}
        >
          <View style={[styles.checkboxOuter, checked && styles.checkedOuter]}>
            <Check
              color={checked ? COLORS.white : COLORS.lightGray}
              size={12}
              strokeWidth={3}
            />
          </View>
          <View>
            <Text style={styles.termsText}>
              By continuing, you agree to our{' '}
              <Text style={styles.termsLink}>Terms</Text> and{' '}
              <Text style={styles.termsLink}>Privacy Policy</Text>
            </Text>
          </View>
        </Pressable>
        <View style={styles.buttonContainer}>
          <ButtonV2
            title="Continue"
            size="medium"
            loading={loading}
            disabled={!phoneNumber.trim() || !!error || !checked}
            onPress={handleSubmit}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between', // This is the key!
  },
  bottomPart: {
    // No need for marginTop: 'auto' anymore
    paddingBottom: SIZES.large * 12, // Add some padding at the very bottom
    paddingHorizontal: SIZES.medium,
  },
  inputContainer: {
    flexDirection: 'row',
    paddingBottom: SIZES.large,
    borderBottomWidth: 2,
    borderBottomColor: COLORS.veryLightGray,
    paddingHorizontal: SIZES.padding,
    paddingTop: SIZES.padding, // Add some padding at the top if needed
  },
  countryCodeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: SIZES.medium,
    borderRightWidth: 1,
    borderColor: COLORS.lightGray,
    marginRight: SIZES.base,
  },
  countryCode: {
    ...FONTS.h3,
    color: COLORS.text,
    marginRight: SIZES.base / 3,
  },
  phoneInputWrapper: {
    flex: 1,
  },
  phoneInput: {
    marginBottom: 0,
  },
  termsText: {
    ...FONTS.caption,
    color: COLORS.textSecondary,
    textAlign: 'center',
  },
  termsLink: {
    color: COLORS.primary,
  },
  checkboxOuter: {
    height: 18,
    width: 18,
    borderRadius: 12,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkedOuter: {
    backgroundColor: COLORS.black,
  },
  checkboxWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    justifyContent: 'center',
    marginBottom: SIZES.medium, // Adjust margin as needed
  },
  buttonContainer: {
    alignItems: 'center',
  },
});

export default PhoneInput;

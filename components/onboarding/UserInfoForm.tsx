import React, { useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import Input from '@/components/common/Input';
import Button from '@/components/common/Button';
import { COLORS, FONTS, SIZES } from '@/constants/theme';
import { Mail, User } from 'lucide-react-native';

interface UserInfoFormProps {
  onSubmit: (fullName: string, email: string) => void;
  initialValues?: { fullName?: string; email?: string };
  loading?: boolean;
}

const UserInfoForm = ({
  onSubmit,
  initialValues = {},
  loading = false,
}: UserInfoFormProps) => {
  const [fullName, setFullName] = useState(initialValues.fullName || '');
  const [email, setEmail] = useState(initialValues.email || '');
  const [errors, setErrors] = useState({ fullName: '', email: '' });

  const validateForm = () => {
    const newErrors = { fullName: '', email: '' };
    let isValid = true;

    if (!fullName.trim()) {
      newErrors.fullName = 'Name is required';
      isValid = false;
    }

    if (!email.trim()) {
      newErrors.email = 'Email is required';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Please enter a valid email address';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      onSubmit(fullName, email);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Let's get to know you</Text>
      <Text style={styles.subtitle}>
        Please provide your name and email address to personalize your experience
      </Text>
      
      <View style={styles.formContainer}>
        <Input
          label="Full Name"
          placeholder="Enter your full name"
          value={fullName}
          onChangeText={setFullName}
          error={errors.fullName}
          leftIcon={<User size={20} color={COLORS.mediumGray} />}
        />
        
        <Input
          label="Email Address"
          placeholder="Enter your email address"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          error={errors.email}
          leftIcon={<Mail size={20} color={COLORS.mediumGray} />}
        />
      </View>
      
      <Button
        title="Continue"
        size="large"
        loading={loading}
        onPress={handleSubmit}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    ...FONTS.h2,
    color: COLORS.text,
    marginBottom: SIZES.base,
  },
  subtitle: {
    ...FONTS.body,
    color: COLORS.textSecondary,
    marginBottom: SIZES.xlarge,
  },
  formContainer: {
    marginBottom: SIZES.xlarge,
  },
});

export default UserInfoForm;
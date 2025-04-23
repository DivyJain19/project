import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, Text } from 'react-native';
import Input from '@/components/common/Input';
import Button from '@/components/common/Button';
import { COLORS, FONTS, SIZES } from '@/constants/theme';
import { Home, Briefcase, Users, Tag } from 'lucide-react-native';
import { AddressDetails } from '@/store/locationStore';

interface AddressFormProps {
  onSubmit: (address: AddressDetails) => void;
  initialValues?: Partial<AddressDetails>;
  loading?: boolean;
}

type AddressTag = 'Home' | 'Office' | 'Friends' | 'Others';

const AddressForm = ({
  onSubmit,
  initialValues = {},
  loading = false,
}: AddressFormProps) => {
  const [addressLine1, setAddressLine1] = useState(initialValues.addressLine1 || '');
  const [addressLine2, setAddressLine2] = useState(initialValues.addressLine2 || '');
  const [landmark, setLandmark] = useState(initialValues.landmark || '');
  const [city, setCity] = useState(initialValues.city || '');
  const [state, setState] = useState(initialValues.state || '');
  const [pincode, setPincode] = useState(initialValues.pincode || '');
  const [tag, setTag] = useState<AddressTag>(initialValues.tag || 'Home');
  
  const [errors, setErrors] = useState<Partial<Record<keyof AddressDetails, string>>>({});

  const validateForm = () => {
    const newErrors: Partial<Record<keyof AddressDetails, string>> = {};
    let isValid = true;

    if (!addressLine1.trim()) {
      newErrors.addressLine1 = 'Address is required';
      isValid = false;
    }

    if (!city.trim()) {
      newErrors.city = 'City is required';
      isValid = false;
    }

    if (!state.trim()) {
      newErrors.state = 'State is required';
      isValid = false;
    }

    if (!pincode.trim()) {
      newErrors.pincode = 'Pincode is required';
      isValid = false;
    } else if (!/^\d{6}$/.test(pincode)) {
      newErrors.pincode = 'Please enter a valid 6-digit pincode';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      onSubmit({
        addressLine1,
        addressLine2,
        landmark,
        city,
        state,
        pincode,
        tag,
      });
    }
  };

  return (
    <ScrollView
      style={styles.container}
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps="handled"
    >
      <Input
        label="Address line 1*"
        placeholder="House/Flat No., Building Name"
        value={addressLine1}
        onChangeText={setAddressLine1}
        error={errors.addressLine1}
      />
      
      <Input
        label="Address line 2"
        placeholder="Street, Area, Locality"
        value={addressLine2}
        onChangeText={setAddressLine2}
      />
      
      <Input
        label="Landmark"
        placeholder="Nearby landmark (optional)"
        value={landmark}
        onChangeText={setLandmark}
      />
      
      <Input
        label="City*"
        placeholder="City"
        value={city}
        onChangeText={setCity}
        error={errors.city}
      />
      
      <Input
        label="State*"
        placeholder="State"
        value={state}
        onChangeText={setState}
        error={errors.state}
      />
      
      <Input
        label="Pincode*"
        placeholder="Enter Pincode"
        value={pincode}
        onChangeText={setPincode}
        keyboardType="number-pad"
        maxLength={6}
        error={errors.pincode}
      />
      
      <View style={styles.tagContainer}>
        <Text style={styles.tagLabel}>Address Tag*</Text>
        
        <View style={styles.tagOptions}>
          <TagOption
            label="Home"
            icon={<Home size={18} color={tag === 'Home' ? COLORS.primary : COLORS.mediumGray} />}
            selected={tag === 'Home'}
            onPress={() => setTag('Home')}
          />
          
          <TagOption
            label="Office"
            icon={<Briefcase size={18} color={tag === 'Office' ? COLORS.primary : COLORS.mediumGray} />}
            selected={tag === 'Office'}
            onPress={() => setTag('Office')}
          />
          
          <TagOption
            label="Friends"
            icon={<Users size={18} color={tag === 'Friends' ? COLORS.primary : COLORS.mediumGray} />}
            selected={tag === 'Friends'}
            onPress={() => setTag('Friends')}
          />
          
          <TagOption
            label="Others"
            icon={<Tag size={18} color={tag === 'Others' ? COLORS.primary : COLORS.mediumGray} />}
            selected={tag === 'Others'}
            onPress={() => setTag('Others')}
          />
        </View>
      </View>
      
      <Text style={styles.requiredNote}>*Compulsory fields</Text>
      
      <Button
        title="Next"
        size="large"
        loading={loading}
        onPress={handleSubmit}
        style={styles.submitButton}
      />
    </ScrollView>
  );
};

interface TagOptionProps {
  label: string;
  icon: React.ReactNode;
  selected: boolean;
  onPress: () => void;
}

const TagOption = ({ label, icon, selected, onPress }: TagOptionProps) => (
  <TouchableOpacity
    style={[
      styles.tagOption,
      selected && styles.selectedTagOption,
    ]}
    onPress={onPress}
  >
    {icon}
    <Text
      style={[
        styles.tagText,
        selected && styles.selectedTagText,
      ]}
    >
      {label}
    </Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tagContainer: {
    marginBottom: SIZES.medium,
  },
  tagLabel: {
    ...FONTS.body,
    color: COLORS.text,
    marginBottom: SIZES.base,
  },
  tagOptions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -SIZES.base / 2,
  },
  tagOption: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: SIZES.medium,
    paddingVertical: SIZES.base,
    borderWidth: 1,
    borderColor: COLORS.veryLightGray,
    borderRadius: SIZES.base,
    marginRight: SIZES.base,
    marginBottom: SIZES.base,
  },
  selectedTagOption: {
    borderColor: COLORS.primary,
    backgroundColor: COLORS.primaryLight + '20', // 20% opacity
  },
  tagText: {
    ...FONTS.body,
    color: COLORS.textSecondary,
    marginLeft: SIZES.base,
  },
  selectedTagText: {
    color: COLORS.primary,
    fontFamily: FONTS.medium,
  },
  requiredNote: {
    ...FONTS.caption,
    color: COLORS.textSecondary,
    marginBottom: SIZES.large,
  },
  submitButton: {
    marginBottom: SIZES.xxlarge,
  },
});

export default AddressForm;
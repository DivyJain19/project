import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Text,
} from 'react-native';
import Input from '@/components/common/Input';
import Button from '@/components/common/Button';
import { COLORS, FONTS, SIZES } from '@/constants/theme';
import { Home, Briefcase, Users, Tag } from 'lucide-react-native';
import { AddressDetails } from '@/store/locationStore';
import ButtonV2 from '../common/ButtonV2';

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
  const [addressLine1, setAddressLine1] = useState(
    initialValues.addressLine1 || ''
  );
  const [addressLine2, setAddressLine2] = useState(
    initialValues.addressLine2 || ''
  );
  const [landmark, setLandmark] = useState(initialValues.landmark || '');
  const [city, setCity] = useState(initialValues.city || '');
  const [state, setState] = useState(initialValues.state || '');
  const [pincode, setPincode] = useState(initialValues.pincode || '');
  const [tag, setTag] = useState<AddressTag>(initialValues.tag || 'Home');

  const [errors, setErrors] = useState<
    Partial<Record<keyof AddressDetails, string>>
  >({});

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
      <View style={styles.inputContainer}>
        <Text style={[styles.label, errors.addressLine1 && styles.errorText]}>Address line 1*</Text>
        <Input
          placeholder="Search Address"
          value={addressLine1}
          onChangeText={setAddressLine1}
          containerStyle={styles.input}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Address line 2</Text>
        <Input
          placeholder="Street, Area, Locality"
          value={addressLine2}
          onChangeText={setAddressLine2}
          containerStyle={styles.input}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Landmark</Text>
        <Input
          placeholder="Nearby landmark (optional)"
          value={landmark}
          onChangeText={setLandmark}
          containerStyle={styles.input}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={[styles.label, errors.city && styles.errorText]}>City*</Text>
        <Input
          placeholder="City"
          value={city}
          onChangeText={setCity}
          containerStyle={styles.input}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={[styles.label, errors.state && styles.errorText]}>State*</Text>
        <Input
          placeholder="State"
          value={state}
          onChangeText={setState}
          containerStyle={styles.input}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={[styles.label, errors.pincode && styles.errorText]}>Pincode*</Text>
        <Input
          placeholder="Enter Pincode"
          value={pincode}
          onChangeText={setPincode}
          keyboardType="number-pad"
          maxLength={6}
          containerStyle={styles.input}
        />
      </View>
      <View style={styles.tagContainer}>
        <Text style={styles.label}>Address Tag*</Text>

        <View style={styles.tagOptions}>
          <TagOption
            label="Home"
            selected={tag === 'Home'}
            onPress={() => setTag('Home')}
          />

          <TagOption
            label="Office"
            selected={tag === 'Office'}
            onPress={() => setTag('Office')}
          />

          <TagOption
            label="Friends"
            selected={tag === 'Friends'}
            onPress={() => setTag('Friends')}
          />

          <TagOption
            label="Others"
            selected={tag === 'Others'}
            onPress={() => setTag('Others')}
          />
        </View>
      </View>

      <Text style={styles.requiredNote}>*Compulsory fields</Text>

      <ButtonV2
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
  selected: boolean;
  onPress: () => void;
}

const TagOption = ({ label, selected, onPress }: TagOptionProps) => (
  <TouchableOpacity
    style={[styles.tagOption, selected && styles.selectedTagOption]}
    onPress={onPress}
  >
    <Text style={[styles.tagText, selected && styles.selectedTagText]}>
      {label}
    </Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  input: {
    backgroundColor: COLORS.white,
    borderRadius: 5,
    padding: 5,
    borderWidth: 0.2,
    borderColor: COLORS.lightGray,
  },
  inputContainer: {},
  errorText: {
    color: "red",
  },
  label: {
    ...FONTS.h3,
    marginBottom: SIZES.xsmall,
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
  },
  tagOption: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: SIZES.medium,
    paddingVertical: SIZES.base,
    borderWidth: 1,
    borderColor: COLORS.lightGray,
    borderRadius: SIZES.large,
    marginRight: SIZES.base,
  },
  selectedTagOption: {
    borderColor: COLORS.black,
    backgroundColor: COLORS.black + '20', // 20% opacity
  },
  tagText: {
    ...FONTS.body,
    color: COLORS.textSecondary,
  },
  selectedTagText: {
    color: COLORS.black,
    fontFamily: FONTS.medium,
  },
  requiredNote: {
    ...FONTS.caption,
    color: COLORS.textSecondary,
    marginBottom: SIZES.small,
  },
  submitButton: {
    marginBottom: SIZES.xxlarge,
  },
});

export default AddressForm;

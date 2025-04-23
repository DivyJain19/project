import React, { useEffect } from 'react';
import {
  View,
  StyleSheet,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  Animated,
} from 'react-native';
import Button from '@/components/common/Button';
import { COLORS, FONTS, SHADOWS, SIZES } from '@/constants/theme';
import { Check } from 'lucide-react-native';
import { Sample, useSamplesStore } from '@/store/samplesStore';

interface SampleSelectorProps {
  onComplete: () => void;
  loading?: boolean;
}

const SampleSelector = ({ onComplete, loading = false }: SampleSelectorProps) => {
  const {
    availableSamples,
    selectedSamples,
    maxSelection,
    toggleSampleSelection,
    isSelected,
    canSelectMore,
  } = useSamplesStore();

  const renderSampleItem = ({ item }: { item: Sample }) => {
    const selected = isSelected(item.id);
    const canSelect = canSelectMore() || selected;
    
    return (
      <SampleItem
        sample={item}
        selected={selected}
        disabled={!canSelect && !selected}
        onSelect={() => toggleSampleSelection(item.id)}
      />
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Choose your free samples</Text>
      <Text style={styles.subtitle}>
        Select up to {maxSelection} samples to receive with your first order
      </Text>
      
      <Text style={styles.selectionInfo}>
        Selected: {selectedSamples.length}/{maxSelection}
      </Text>
      
      <FlatList
        data={availableSamples}
        keyExtractor={(item) => item.id}
        renderItem={renderSampleItem}
        numColumns={2}
        columnWrapperStyle={styles.columnWrapper}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
      />
      
      <Button
        title={selectedSamples.length > 0 ? "Continue" : "Skip Samples"}
        size="large"
        loading={loading}
        onPress={onComplete}
      />
    </View>
  );
};

interface SampleItemProps {
  sample: Sample;
  selected: boolean;
  disabled: boolean;
  onSelect: () => void;
}

const SampleItem = ({ sample, selected, disabled, onSelect }: SampleItemProps) => {
  const scaleAnim = React.useRef(new Animated.Value(1)).current;
  
  const handlePress = () => {
    if (!disabled) {
      // Animate the press
      Animated.sequence([
        Animated.timing(scaleAnim, {
          toValue: 0.95,
          duration: 100,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: 100,
          useNativeDriver: true,
        }),
      ]).start();
      
      onSelect();
    }
  };
  
  return (
    <Animated.View
      style={[
        styles.itemContainer,
        {
          transform: [{ scale: scaleAnim }],
          opacity: disabled ? 0.6 : 1,
        },
      ]}
    >
      <TouchableOpacity
        style={[
          styles.item,
          selected && styles.selectedItem,
        ]}
        onPress={handlePress}
        activeOpacity={0.7}
        disabled={disabled}
      >
        <View style={styles.imageContainer}>
          <Image source={{ uri: sample.imageUrl }} style={styles.image} />
          {selected && (
            <View style={styles.checkmarkContainer}>
              <Check size={18} color={COLORS.white} />
            </View>
          )}
        </View>
        
        <View style={styles.textContainer}>
          <Text style={styles.itemName} numberOfLines={1}>
            {sample.name}
          </Text>
          <Text style={styles.itemDescription} numberOfLines={2}>
            {sample.description}
          </Text>
          <Text style={styles.itemCategory}>{sample.category}</Text>
        </View>
      </TouchableOpacity>
    </Animated.View>
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
    marginBottom: SIZES.medium,
  },
  selectionInfo: {
    ...FONTS.medium,
    color: COLORS.primary,
    marginBottom: SIZES.medium,
  },
  listContent: {
    paddingBottom: SIZES.large,
  },
  columnWrapper: {
    justifyContent: 'space-between',
    marginBottom: SIZES.medium,
  },
  itemContainer: {
    width: '48%',
  },
  item: {
    borderRadius: SIZES.base,
    backgroundColor: COLORS.white,
    overflow: 'hidden',
    ...SHADOWS.small,
  },
  selectedItem: {
    borderWidth: 2,
    borderColor: COLORS.primary,
  },
  imageContainer: {
    position: 'relative',
    height: 120,
    width: '100%',
  },
  image: {
    height: '100%',
    width: '100%',
    resizeMode: 'cover',
  },
  checkmarkContainer: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: COLORS.primary,
    borderRadius: 20,
    width: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textContainer: {
    padding: SIZES.base,
  },
  itemName: {
    ...FONTS.medium,
    color: COLORS.text,
    fontSize: SIZES.font,
    marginBottom: 2,
  },
  itemDescription: {
    ...FONTS.caption,
    color: COLORS.textSecondary,
    marginBottom: 4,
    height: 32, // Fixed height for 2 lines
  },
  itemCategory: {
    ...FONTS.caption,
    color: COLORS.primary,
    marginTop: 'auto',
  },
});

export default SampleSelector;
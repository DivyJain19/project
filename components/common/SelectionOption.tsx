import React from 'react';
import { 
  TouchableOpacity, 
  Text, 
  StyleSheet, 
  ViewStyle, 
  TextStyle,
  View
} from 'react-native';

import { Check } from 'lucide-react-native';

interface SelectionOptionProps {
  label: string;
  selected: boolean;
  onPress: () => void;
  style?: ViewStyle;
  labelStyle?: TextStyle;
  pill?: boolean;
}


export const SelectionOption: React.FC<SelectionOptionProps> = ({
  label,
  selected,
  onPress,
  style,
  labelStyle,
  pill = false,
}) => {
  
  return (
    <View
      style={[
        pill ? styles.pillContainer : styles.container,
        {
          backgroundColor: selected ? '#000000' : '#FFFFFF',
          borderColor: selected ? '#000000' : '#E5E5E5',
        },
        style,
      ]}
    >
      <TouchableOpacity
        onPress={onPress}
        style={styles.touchable}
        activeOpacity={0.8}
      >
        <View style={styles.contentContainer}>
          <Text
            style={[
              pill ? styles.pillLabel : styles.label,
              { color: selected ? '#FFFFFF' : '#000000' },
              labelStyle,
            ]}
          >
            {label}
          </Text>
          
          {selected && !pill && (
            <Check size={18} color="#FFFFFF" strokeWidth={2.5} />
          )}
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 8,
    borderWidth: 1,
    marginBottom: 12,
    overflow: 'hidden',
  },
  pillContainer: {
    borderRadius: 24,
    borderWidth: 1,
    marginRight: 8,
    marginBottom: 8,
    overflow: 'hidden',
  },
  touchable: {
    width: '100%',
    // minHeight: 48,
  },
  contentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 6,
    paddingHorizontal: 8,
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    flex: 1,
  },
  pillLabel: {
    fontSize: 14,
    fontWeight: '500',
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
});
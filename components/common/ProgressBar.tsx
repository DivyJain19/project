import React from 'react';
import { View, StyleSheet, Animated } from 'react-native';
import { COLORS, SIZES } from '@/constants/theme';

interface ProgressBarProps {
  progress: number; // Value between 0 and 1
  height?: number;
  backgroundColor?: string;
  progressColor?: string;
  animated?: boolean;
}

const ProgressBar = ({
  progress,
  height = 4,
  backgroundColor = COLORS.veryLightGray,
  progressColor = COLORS.primary,
  animated = true,
}: ProgressBarProps) => {
  // Ensure progress is between 0 and 1
  const validProgress = Math.min(Math.max(progress, 0), 1);
  
  // Animation value
  const [animation] = React.useState(new Animated.Value(0));

  React.useEffect(() => {
    if (animated) {
      Animated.timing(animation, {
        toValue: validProgress,
        duration: 300,
        useNativeDriver: false,
      }).start();
    } else {
      animation.setValue(validProgress);
    }
  }, [validProgress, animated, animation]);

  const width = animation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '100%'],
  });

  return (
    <View style={[styles.container, { height, backgroundColor }]}>
      <Animated.View
        style={[
          styles.progress,
          {
            width,
            backgroundColor: progressColor,
          },
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    borderRadius: SIZES.base,
    overflow: 'hidden',
  },
  progress: {
    height: '100%',
  },
});

export default ProgressBar;
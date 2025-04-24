import React, { ReactNode } from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  ViewStyle,
} from 'react-native';
import { COLORS } from '@/constants/theme';

interface ScreenProps {
  children: ReactNode;
  style?: ViewStyle;
  scrollable?: boolean;
  withPadding?: boolean;
  backgroundColor?: string;
  statusBarColor?: string;
  statusBarStyle?: 'dark-content' | 'light-content' | 'auto';
}

const Screen = ({
  children,
  style,
  scrollable = false,
  withPadding = true,
  backgroundColor = COLORS.background,
  statusBarColor = COLORS.background,
  statusBarStyle = 'dark-content',
}: ScreenProps) => {
  const Container = scrollable ? ScrollView : View;

  const containerProps = scrollable
    ? {
        showsVerticalScrollIndicator: false,
        contentContainerStyle: [
          styles.scrollContainer,
          withPadding && styles.padding,
          style,
        ],
      }
    : {
        style: [
          styles.container,
          { backgroundColor },
          withPadding && styles.padding,
          style,
        ],
      };

  return (
    <>
      <SafeAreaView style={[styles.topSafeArea, { backgroundColor }]} />
      <SafeAreaView style={styles.bottomSafeArea}>
        <StatusBar backgroundColor={statusBarColor} />
        <KeyboardAvoidingView
          style={styles.keyboardAvoid}
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 0}
        >
          <Container {...containerProps}>{children}</Container>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  topSafeArea: {
    flex: 0,
  },
  bottomSafeArea: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  keyboardAvoid: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
  },
  padding: {
    padding: 16,
  },
});

export default Screen;

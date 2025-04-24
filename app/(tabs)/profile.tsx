import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { COLORS, FONTS, SIZES } from '@/constants/theme';
import { useUserStore } from '@/store/userStore';
import { useOnboardingStore } from '@/store/onboardingStore';
import { useRouter } from 'expo-router';
import { LogOut, User, MapPin, ShoppingBag, Heart, Bell, Settings } from 'lucide-react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function ProfileScreen() {
  const router = useRouter();
  const { fullName, phoneNumber, logout } = useUserStore();
  const { resetOnboarding } = useOnboardingStore();

  const clearStorage = async () => {
    try {
      await AsyncStorage.clear();
      console.log('AsyncStorage cleared!');
    } catch (error) {
      console.error('Error clearing AsyncStorage:', error);
    }
  };
  const handleLogout = () => {
    Alert.alert(
      "Log Out",
      "Are you sure you want to log out?",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        { 
          text: "Log Out", 
          onPress: () => {
            logout();
            resetOnboarding();
            clearStorage();
            router.replace('/onboarding/welcome');
          },
          style: "destructive"
        }
      ]
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.userInfo}>
          <View style={styles.profileImage}>
            <Text style={styles.profileInitial}>
              {fullName ? fullName.charAt(0).toUpperCase() : "G"}
            </Text>
          </View>
          <View style={styles.userDetails}>
            <Text style={styles.userName}>{fullName || "Guest User"}</Text>
            <Text style={styles.userPhone}>{phoneNumber || "No phone number"}</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.editButton}>
          <Text style={styles.editButtonText}>Edit</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.menuContainer}>
        <MenuItem 
          icon={<User size={20} color={COLORS.mediumGray} />}
          title="Account Information"
        />
        <MenuItem 
          icon={<MapPin size={20} color={COLORS.mediumGray} />}
          title="Saved Addresses"
        />
        <MenuItem 
          icon={<ShoppingBag size={20} color={COLORS.mediumGray} />}
          title="Orders"
        />
        <MenuItem 
          icon={<Heart size={20} color={COLORS.mediumGray} />}
          title="Wishlist"
        />
        <MenuItem 
          icon={<Bell size={20} color={COLORS.mediumGray} />}
          title="Notifications"
        />
        <MenuItem 
          icon={<Settings size={20} color={COLORS.mediumGray} />}
          title="Settings"
        />
      </View>

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <LogOut size={20} color={COLORS.error} />
        <Text style={styles.logoutText}>Log Out</Text>
      </TouchableOpacity>

      <View style={styles.footer}>
        <Text style={styles.version}>Version 1.0.0</Text>
      </View>
    </View>
  );
}

interface MenuItemProps {
  icon: React.ReactNode;
  title: string;
}

const MenuItem = ({ icon, title }: MenuItemProps) => (
  <TouchableOpacity style={styles.menuItem}>
    <View style={styles.menuIconContainer}>{icon}</View>
    <Text style={styles.menuTitle}>{title}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    backgroundColor: COLORS.white,
    paddingTop: SIZES.xlarge * 1.5,
    paddingBottom: SIZES.large,
    paddingHorizontal: SIZES.medium,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: SIZES.medium,
  },
  profileInitial: {
    ...FONTS.h2,
    color: COLORS.white,
  },
  userDetails: {
    justifyContent: 'center',
  },
  userName: {
    ...FONTS.h3,
    color: COLORS.text,
    marginBottom: 4,
  },
  userPhone: {
    ...FONTS.body,
    color: COLORS.textSecondary,
  },
  editButton: {
    paddingHorizontal: SIZES.medium,
    paddingVertical: SIZES.base,
    borderRadius: SIZES.base,
    borderWidth: 1,
    borderColor: COLORS.primary,
  },
  editButtonText: {
    ...FONTS.medium,
    color: COLORS.primary,
  },
  menuContainer: {
    backgroundColor: COLORS.white,
    marginTop: SIZES.medium,
    marginBottom: 'auto',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: SIZES.medium,
    paddingHorizontal: SIZES.medium,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.veryLightGray,
  },
  menuIconContainer: {
    width: 40,
    alignItems: 'center',
    marginRight: SIZES.base,
  },
  menuTitle: {
    ...FONTS.body,
    color: COLORS.text,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: SIZES.medium,
    backgroundColor: COLORS.white,
    marginTop: SIZES.medium,
  },
  logoutText: {
    ...FONTS.medium,
    color: COLORS.error,
    marginLeft: SIZES.base,
  },
  footer: {
    alignItems: 'center',
    paddingVertical: SIZES.medium,
  },
  version: {
    ...FONTS.caption,
    color: COLORS.textSecondary,
  },
});
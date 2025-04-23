import React from 'react';
import { Tabs } from 'expo-router';
import { Home, Search, ShoppingCart, Heart, User } from 'lucide-react-native';
import { COLORS, FONTS } from '@/constants/theme';
import { useFrameworkReady } from '@/hooks/useFrameworkReady';

export default function TabLayout() {
  useFrameworkReady();
  
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: COLORS.primary,
        tabBarInactiveTintColor: COLORS.mediumGray,
        tabBarLabelStyle: {
          fontFamily: FONTS.regular,
          fontSize: 12,
        },
        tabBarStyle: {
          borderTopColor: COLORS.veryLightGray,
        },
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, size }) => <Home size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          title: 'Search',
          tabBarIcon: ({ color, size }) => <Search size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="cart"
        options={{
          title: 'Cart',
          tabBarIcon: ({ color, size }) => <ShoppingCart size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="wishlist"
        options={{
          title: 'Wishlist',
          tabBarIcon: ({ color, size }) => <Heart size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color, size }) => <User size={size} color={color} />,
        }}
      />
    </Tabs>
  );
}
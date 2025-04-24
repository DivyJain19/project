import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import { useSamplesStore } from '@/store/samplesStore';
import { useUserStore } from '@/store/userStore';
import { COLORS, FONTS, SHADOWS, SIZES } from '@/constants/theme';

export default function HomeScreen() {
  const { selectedSamples, availableSamples } = useSamplesStore();
  const { fullName } = useUserStore();
  
  // Get selected sample objects
  const selectedSampleItems = availableSamples.filter(
    sample => selectedSamples.includes(sample.id)
  );
  
  // Format name for greeting
  const firstName = fullName.split(' ')[0];
  
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>
            {firstName ? `Hi, ${firstName}!` : 'Welcome!'}
          </Text>
          <Text style={styles.subGreeting}>Ready to explore FirstClub?</Text>
        </View>
        
        <View style={styles.logoContainer}>
          <Text style={styles.logo}>FirstClub</Text>
        </View>
      </View>
      
      {selectedSampleItems.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Your free samples</Text>
          <Text style={styles.sectionSubtitle}>
            We've added your selected samples to your account
          </Text>
          
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.sampleList}
          >
            {selectedSampleItems.map(sample => (
              <View key={sample.id} style={styles.sampleCard}>
                <Image source={{ uri: sample.imageUrl }} style={styles.sampleImage} />
                <Text style={styles.sampleName}>{sample.name}</Text>
              </View>
            ))}
          </ScrollView>
        </View>
      )}
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Categories</Text>
        <View style={styles.categoryGrid}>
          <CategoryItem 
            title="Groceries" 
            imageUrl="https://images.pexels.com/photos/264636/pexels-photo-264636.jpeg" 
          />
          <CategoryItem 
            title="Home" 
            imageUrl="https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg" 
          />
          <CategoryItem 
            title="Personal Care" 
            imageUrl="https://images.pexels.com/photos/3321416/pexels-photo-3321416.jpeg" 
          />
          <CategoryItem 
            title="Baby" 
            imageUrl="https://images.pexels.com/photos/6964740/pexels-photo-6964740.jpeg" 
          />
        </View>
      </View>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Today's Essentials</Text>
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.productList}
        >
          <ProductItem 
            name="Organic Bananas" 
            price="₹60" 
            weight="500g" 
            imageUrl="https://images.pexels.com/photos/1093038/pexels-photo-1093038.jpeg" 
          />
          <ProductItem 
            name="Whole Wheat Bread" 
            price="₹45" 
            weight="400g" 
            imageUrl="https://images.pexels.com/photos/1756061/pexels-photo-1756061.jpeg" 
          />
          <ProductItem 
            name="Farm Fresh Eggs" 
            price="₹80" 
            weight="6 pcs" 
            imageUrl="https://images.pexels.com/photos/162712/egg-white-food-protein-162712.jpeg" 
          />
        </ScrollView>
      </View>
      
      <View style={styles.bannerContainer}>
        <Image 
          source={{ uri: 'https://images.pexels.com/photos/1028599/pexels-photo-1028599.jpeg' }} 
          style={styles.bannerImage} 
          resizeMode="cover"
        />
        <View style={styles.bannerOverlay}>
          <Text style={styles.bannerTitle}>Fresh Produce</Text>
          <Text style={styles.bannerSubtitle}>Delivered daily from local farms</Text>
          <TouchableOpacity style={styles.bannerButton}>
            <Text style={styles.bannerButtonText}>Shop Now</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

interface CategoryItemProps {
  title: string;
  imageUrl: string;
}

const CategoryItem = ({ title, imageUrl }: CategoryItemProps) => (
  <TouchableOpacity style={styles.categoryItem}>
    <Image source={{ uri: imageUrl }} style={styles.categoryImage} />
    <Text style={styles.categoryTitle}>{title}</Text>
  </TouchableOpacity>
);

interface ProductItemProps {
  name: string;
  price: string;
  weight: string;
  imageUrl: string;
}

const ProductItem = ({ name, price, weight, imageUrl }: ProductItemProps) => (
  <TouchableOpacity style={styles.productItem}>
    <Image source={{ uri: imageUrl }} style={styles.productImage} />
    <View style={styles.productInfo}>
      <Text style={styles.productName}>{name}</Text>
      <Text style={styles.productWeight}>{weight}</Text>
      <Text style={styles.productPrice}>{price}</Text>
    </View>
    <TouchableOpacity style={styles.addButton}>
      <Text style={styles.addButtonText}>+</Text>
    </TouchableOpacity>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: SIZES.medium,
    paddingTop: SIZES.xlarge * 1.5,
    paddingBottom: SIZES.medium,
    backgroundColor: COLORS.white,
  },
  greeting: {
    ...FONTS.h3,
    color: COLORS.text,
  },
  subGreeting: {
    ...FONTS.body,
    color: COLORS.textSecondary,
  },
  logoContainer: {
    alignItems: 'flex-end',
  },
  logo: {
    ...FONTS.h2,
    color: COLORS.primary,
  },
  section: {
    padding: SIZES.medium,
  },
  sectionTitle: {
    ...FONTS.h3,
    color: COLORS.text,
    marginBottom: SIZES.base,
  },
  sectionSubtitle: {
    ...FONTS.body,
    color: COLORS.textSecondary,
    marginBottom: SIZES.medium,
  },
  sampleList: {
    paddingVertical: SIZES.medium,
  },
  sampleCard: {
    width: 120,
    marginRight: SIZES.medium,
    borderRadius: SIZES.base,
    backgroundColor: COLORS.white,
    ...SHADOWS.small,
  },
  sampleImage: {
    width: '100%',
    height: 90,
    borderTopLeftRadius: SIZES.base,
    borderTopRightRadius: SIZES.base,
  },
  sampleName: {
    ...FONTS.body,
    color: COLORS.text,
    padding: SIZES.base,
  },
  categoryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: SIZES.base,
  },
  categoryItem: {
    width: '48%',
    aspectRatio: 1.5,
    marginBottom: SIZES.medium,
    borderRadius: SIZES.base,
    overflow: 'hidden',
    ...SHADOWS.small,
  },
  categoryImage: {
    width: '100%',
    height: '100%',
  },
  categoryTitle: {
    // ...FONTS.medium,
    color: COLORS.white,
    position: 'absolute',
    bottom: SIZES.base,
    left: SIZES.base,
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },
  productList: {
    paddingVertical: SIZES.medium,
  },
  productItem: {
    width: 150,
    marginRight: SIZES.medium,
    borderRadius: SIZES.base,
    backgroundColor: COLORS.white,
    ...SHADOWS.small,
    position: 'relative',
  },
  productImage: {
    width: '100%',
    height: 120,
    borderTopLeftRadius: SIZES.base,
    borderTopRightRadius: SIZES.base,
  },
  productInfo: {
    padding: SIZES.base,
  },
  productName: {
    // ...FONTS.medium,
    color: COLORS.text,
    marginBottom: SIZES.base / 2,
  },
  productWeight: {
    ...FONTS.caption,
    color: COLORS.textSecondary,
    marginBottom: SIZES.base / 2,
  },
  productPrice: {
    // ...FONTS.medium,
    color: COLORS.primary,
  },
  addButton: {
    position: 'absolute',
    bottom: SIZES.base,
    right: SIZES.base,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addButtonText: {
    // ...FONTS.medium,
    color: COLORS.white,
    fontSize: 16,
    lineHeight: 24,
  },
  bannerContainer: {
    margin: SIZES.medium,
    height: 150,
    borderRadius: SIZES.base,
    overflow: 'hidden',
    marginBottom: SIZES.xxlarge,
  },
  bannerImage: {
    width: '100%',
    height: '100%',
  },
  bannerOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: SIZES.medium,
    justifyContent: 'center',
  },
  bannerTitle: {
    ...FONTS.h2,
    color: COLORS.white,
    marginBottom: SIZES.base / 2,
  },
  bannerSubtitle: {
    ...FONTS.body,
    color: COLORS.white,
    marginBottom: SIZES.medium,
  },
  bannerButton: {
    backgroundColor: COLORS.white,
    paddingVertical: SIZES.base,
    paddingHorizontal: SIZES.medium,
    borderRadius: SIZES.base,
    alignSelf: 'flex-start',
  },
  bannerButtonText: {
    // ...FONTS.medium,
    color: COLORS.primary,
  },
});
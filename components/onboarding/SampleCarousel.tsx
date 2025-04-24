import { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ScrollView,
} from 'react-native';
import ProductCard from '../common/ProductCard';
import ProductFeature from '../common/ProductFeature';
import { Sample, useSamplesStore } from '@/store/samplesStore';
import { FONTS } from '@/constants/theme';

const { width } = Dimensions.get('window');
const CARD_WIDTH = width * 0.5;
const SPACING = 26;
interface SampleCarouselProps {
  onSelect?: (item: Sample) => void;
}

const SampleCarousel: React.FC<SampleCarouselProps> = ({ onSelect }) => {
  const { availableSamples, isSelected, setAvailableSamplesOrignal } =
    useSamplesStore();
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollRef = useRef<ScrollView>(null);
  const handleScroll = (event: any) => {
    const scrollPosition = event.nativeEvent.contentOffset.x;
    const index = Math.round(scrollPosition / (CARD_WIDTH + SPACING));
    setCurrentIndex(index);
  };
  const currentProduct = availableSamples[currentIndex];
  return (
    <View>
      <ScrollView
        ref={scrollRef}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollViewContent}
        snapToInterval={CARD_WIDTH + SPACING}
        decelerationRate="fast"
        onMomentumScrollEnd={handleScroll}
        scrollEventThrottle={16}
      >
        {availableSamples?.map((product, index) => (
          <ProductCard
            key={product.id}
            product={product}
            isActive={index === currentIndex}
          />
        ))}
      </ScrollView>
      <View style={styles.detailsContainer} key={currentProduct.id}>
        <Text style={styles.detailsText}>"{currentProduct.details}"</Text>
      </View>
      <View style={styles.featuresContainer}>
        <ProductFeature icon="pill-off" title="No Antibiotics" />
        <ProductFeature icon="leaf" title="Sustainably Sourced" />
        <ProductFeature icon="x-circle" title="No Hormones" />
      </View>
    </View>
  );
};

export default SampleCarousel;

const styles = StyleSheet.create({
  scrollViewContent: {
    paddingHorizontal: (width - CARD_WIDTH) / 2,
    paddingBottom: 20,
  },
  detailsContainer: {
    alignItems: 'center',
    paddingHorizontal: 60,
    marginTop: 10,
    marginBottom: 20,
  },
  detailsText: {
    ...FONTS.h4,
    color: '#3C4E31',
    textAlign: 'center',
    fontStyle: 'italic',
  },
  featuresContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 60,
    marginBottom: 25,
    marginTop: 20,
  },
});

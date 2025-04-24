import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { Sample, useSamplesStore } from '@/store/samplesStore';
import { Plus, Check } from 'lucide-react-native';

interface ProductCardProps {
  product: Sample;
  isActive: boolean;
  onSelect?: (product: Sample) => void;
}
const { width } = Dimensions.get('window');

export default function ProductCard({
  product,
  isActive,
  onSelect,
}: ProductCardProps) {
  const { toggleSampleSelection, isSelected, canSelectMore } =
    useSamplesStore();
  return (
    <View
      style={[
        styles.card,
        {
          opacity: isActive ? 1 : 0.7,
          transform: [{ scale: isActive ? 1 : 0.8 }],
        },
      ]}
    >
      {/* <Text style={styles.tag}>🌞 {item.tag}</Text> */}
      <View>
        <Image source={product.image} style={styles.image} resizeMode="cover" />
        <View style={styles.descriptionContainer}>
          <Text style={styles.name}>{product.name}</Text>
          <Text style={styles.desc}>{product.desc}</Text>
        </View>
      </View>
      <View style={styles.itemDetails}>
        <View style={styles.sampleRow}>
          <Text style={styles.sampleText}>Free Sample</Text>
          <Text style={styles.ml}>250ml</Text>
          <TouchableOpacity
            style={styles.addBtn}
            onPress={() => toggleSampleSelection(product?.id)}
          >
            <Text style={styles.addText}>
              {isSelected(product?.id) ? (
                <Check size={15} color="white" strokeWidth={3} />
              ) : (
                <Plus size={15} color="white" strokeWidth={3} />
              )}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: width * 0.52,
    marginRight: 16,
    borderRadius: 16,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  descriptionContainer: {
    position: 'absolute',
    bottom: 8,
    left: 8,
  },
  itemDetails: {
    padding: 12,
  },
  tag: {
    fontSize: 12,
    color: '#888',
    marginBottom: 8,
    // position: 'absolute',
    // marginTop: -5
  },
  image: {
    width: '100%',
    height: 260,
    marginBottom: 8,
    borderRadius: 16,
  },
  name: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#AEEA94',
  },
  desc: {
    fontSize: 12,
    marginBottom: 12,
    marginTop: 5,
    color: '#AEEA94',
  },
  sampleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  sampleText: {
    fontWeight: '600',
    fontSize: 14,
  },
  ml: {
    fontSize: 14,
    color: '#999',
  },
  addBtn: {
    backgroundColor: 'green',
    borderRadius: 20,
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addText: {
    fontSize: 18,
    color: 'white',
  },
});

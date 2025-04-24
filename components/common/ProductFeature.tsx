import { View, Text, StyleSheet } from 'react-native';
import { BellOff as PillOff, Leaf, Circle as XCircle, Droplets } from 'lucide-react-native';
import { FONTS } from '@/constants/theme';

interface ProductFeatureProps {
  icon: 'pill-off' | 'leaf' | 'x-circle' | 'droplets';
  title: string;
}

export default function ProductFeature({ icon, title }: ProductFeatureProps) {
  const getIcon = () => {
    switch (icon) {
      case 'pill-off':
        return <PillOff size={24} color="#8B5757" />;
      case 'leaf':
        return <Leaf size={24} color="#5C8B57" />;
      case 'x-circle':
        return <XCircle size={24} color="#8B5757" />;
      case 'droplets':
        return <Droplets size={24} color="#578B8B" />;
      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        {getIcon()}
      </View>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  iconContainer: {
    marginBottom: 8,
  },
  title: {
    ...FONTS.h4,
    fontSize: 12,
    color: '#3C4E31',
    textAlign: 'center',
    width:60
  },
});
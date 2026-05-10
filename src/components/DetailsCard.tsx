import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

import restaurants from '../data/Restaurants';
import { COLORS } from '../constants/colors';
import { TYPOGRAPHY } from '../constants/typography';

type Props = {
  restaurantId: string;
};

export default function DetailsCard({ restaurantId }: Props) {
  const restaurant = restaurants.find(
    item => item.id === restaurantId
  );

  if (!restaurant) {
    return <Text>Restaurant not found</Text>;
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{restaurant.title}</Text>

        <View style={styles.info}>
          <Text style={styles.address}>
            {restaurant.address}
          </Text>
          <TouchableOpacity style={styles.phoneButton}>
            <MaterialCommunityIcons
              name="phone-outline"
              size={14}
              color={COLORS.primary[400]}
            />
            <Text style={styles.phone}>
              {restaurant.phone}
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <Text style={styles.description}>
        {restaurant.description}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    gap: 24,
  },

  header: {
    gap: 16,
  },

  info: {
    gap: 8,
  },

  title: {
    ...TYPOGRAPHY.heading.h2,
    color: COLORS.grey[700],
  },

  address: {
    ...TYPOGRAPHY.body.m,
    color: COLORS.grey[500],
    lineHeight: 16,
  },

  phoneButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },

  phone: {
    ...TYPOGRAPHY.action.m,
    color: COLORS.primary[400],
  },

  description: {
    ...TYPOGRAPHY.body.m,
    color: COLORS.grey[500],
    lineHeight: 20,
  },
});
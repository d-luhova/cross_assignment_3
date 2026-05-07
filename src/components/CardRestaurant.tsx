import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  GestureResponderEvent,
} from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { COLORS } from '../constants/colors';
import { TYPOGRAPHY } from '../constants/typography';

type Props = {
  title: string;
  address: string;
  onPress: (e: GestureResponderEvent) => void;
};

export default function RestaurantCard({
  title,
  address,
  onPress,
}: Props) {
  return (
    <TouchableOpacity
      style={styles.card}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <View style={styles.content}>
        <View style={styles.info}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.address}>
            📍 {address}
          </Text>
        </View>

        <MaterialIcons
          name="keyboard-arrow-right"
          size={20}
          color={COLORS.grey[400]}
        />
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    width: '100%',
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: COLORS.secondary[200],
    backgroundColor: COLORS.white,
    justifyContent: 'center',
  },

  content: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },

  info: {
    flex: 1,
    gap: 4,
  },

  title: {
    ...TYPOGRAPHY.body.l,
    color: COLORS.grey[700],
  },

  address: {
    ...TYPOGRAPHY.caption.m,
    color: COLORS.primary[400],
  },
});
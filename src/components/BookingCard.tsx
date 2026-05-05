import React from 'react';
import { Text, StyleSheet, View, TouchableOpacity } from 'react-native';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

import { COLORS } from '../constants/colors';
import { TYPOGRAPHY } from '../constants/typography';   

type Props = {
  title: string;
  date: string;
  time: string;
  guests: string;
  onDelete?: () => void;
};

export default function BookingCard({
  title,
  date,
  time,
  guests,
  onDelete,
}: Props) {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.textBlock}>
          <Text style={styles.title}>{title}</Text>

          <View style={styles.meta}>
            <Text style={styles.metaText}>{date}</Text>
            <Text style={styles.metaText}>{time}</Text>
            <Text style={styles.metaText}>{guests}</Text>
          </View>
        </View>
        {onDelete && (
          <TouchableOpacity onPress={onDelete}>
            <MaterialCommunityIcons
              name="trash-can-outline"
              size={24}
              color={COLORS.error[400]}
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: COLORS.grey[200],
    borderRadius: 12,
    padding: 16,
    width: '100%',
  },

  content: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },

  textBlock: {
    flex: 1,
    gap: 4,
  },

  title: {
    ...TYPOGRAPHY.action.l,
    color: COLORS.grey[700],
  },

  meta: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 8,
  },

  metaText: {
    ...TYPOGRAPHY.body.s,
    color: COLORS.grey[500],
  },
});
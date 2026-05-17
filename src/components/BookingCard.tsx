import React from 'react';
import { Text, StyleSheet, View, TouchableOpacity } from 'react-native';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

import { COLORS } from '../constants/colors';
import { TYPOGRAPHY } from '../constants/typography';   
import useTheme from '../hooks/useTheme';

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
  const colors = useTheme().colors;  
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.textBlock}>
          <Text style={[styles.title, { color: colors.text }]}>{title}</Text>

          <View style={styles.meta}>
            <Text style={[styles.metaText, { color: colors.tetriaryText }]}>{date}</Text>
            <Text style={[styles.metaText, { color: colors.tetriaryText }]}>{time}</Text>
            <Text style={[styles.metaText, { color: colors.tetriaryText }]}>{guests}</Text>
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
    borderRadius: 16,
    borderColor: COLORS.secondary[200],
    padding: 16,
    width: '100%',
  },

  content: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  textBlock: {
    flex: 1,
    gap: 4,
  },

  title: {
    ...TYPOGRAPHY.action.l,
  },

  meta: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 8,
  },

  metaText: {
    ...TYPOGRAPHY.body.s,
  },
});
import React from 'react';
import { Text, StyleSheet, View, useWindowDimensions } from 'react-native';
import { COLORS } from '../constants/colors';
import { TYPOGRAPHY } from '../constants/typography';

type Props = {
  title: string;
  subtitle: string;
};

export default function TitleCard({ title, subtitle }: Props) {
  const { width } = useWindowDimensions();
  const isSmall = width < 375;
  return (
    <View style={[
    styles.container,
    { paddingHorizontal: isSmall ? 12 : 16 }
  ]}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.subtitle}>{subtitle}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    gap: 20,
  },

  title: {
    ...TYPOGRAPHY.heading.h2,
    color: COLORS.grey[700],
  },

  subtitle: {
    ...TYPOGRAPHY.body.m,
    color: COLORS.grey[500],
  },
});
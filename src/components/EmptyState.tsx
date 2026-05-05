import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { COLORS } from '../constants/colors';
import { TYPOGRAPHY } from '../constants/typography';

type Props = {
  title?: string;
  subtitle?: string;
  icon?: React.ReactNode;
};

export default function EmptyState({
  title,
  subtitle,
  icon,
}: Props) {
  return (
    <View style={styles.container}>
      {icon && <View style={styles.icon}>{icon}</View>}

      <View style={styles.textContainer}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subtitle}>{subtitle}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    width: '100%',
  },

  icon: {
    width: 120,
    height: 120,
    alignItems: 'center',
    justifyContent: 'center',
  },

  textContainer: {
    gap: 8,
    alignItems: 'center',
    paddingHorizontal: 16,
  },

  title: {
    ...TYPOGRAPHY.heading.h2,
    color: COLORS.grey[700],
    textAlign: 'center',
  },

  subtitle: {
    ...TYPOGRAPHY.body.m,
    color: COLORS.grey[500],
    textAlign: 'center',
  },
});
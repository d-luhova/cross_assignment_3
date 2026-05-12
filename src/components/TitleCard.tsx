import React from "react";
import { StyleSheet, Text, View, ViewStyle } from "react-native";
import { COLORS } from "../constants/colors";
import { TYPOGRAPHY } from "../constants/typography";

type Props = {
  title: string;
  subtitle: string;
  style?: ViewStyle;
};

export default function TitleCard({ title, subtitle, style }: Props) {
  return (
    <View style={[styles.container, style]}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.subtitle}>{subtitle}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
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

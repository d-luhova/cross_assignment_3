import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { COLORS } from "../constants/colors";
import { TYPOGRAPHY } from "../constants/typography";
import useTheme from "../hooks/useTheme";

export default function BookingsHero() {
  const colors = useTheme().colors;
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{"Your Tables"}</Text>

      <Text style={styles.subtitle}>
        Your upcoming bookings will appear here. You can cancel them up to 2
        hours before the reservation time.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    backgroundColor: COLORS.grey[100],
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    paddingHorizontal: 32,
    paddingTop: 32,
    paddingBottom: 24,
    gap: 16,
  },

  title: {
    ...TYPOGRAPHY.heading.h1,
    color: COLORS.grey[700],
    maxWidth: 240,
  },

  subtitle: {
    ...TYPOGRAPHY.body.m,
    color: COLORS.grey[500],
  },
});

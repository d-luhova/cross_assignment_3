import React from "react";
import { StyleSheet, Text, View, ViewStyle } from "react-native";
import { TYPOGRAPHY } from "../constants/typography";
import useTheme from "../hooks/useTheme";


type Props = {
  title: string;
  subtitle: string;
  style?: ViewStyle;
};

export default function TitleCard({ title, subtitle, style }: Props) {
  const { colors } = useTheme();  
  return (
    <View style={[styles.container, style]}>
      <Text style={[styles.title, { color: colors.text }]}>{title}</Text>
      <Text style={[styles.subtitle, { color: colors.tetriaryText }]}>{subtitle}</Text>
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
  },

  subtitle: {
    ...TYPOGRAPHY.body.m,
  },
});

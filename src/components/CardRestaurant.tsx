import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import AppIcon from "./AppIcon";
import { COLORS } from "../constants/colors";
import { SHADOWS } from "../constants/shadows";
import { TYPOGRAPHY } from "../constants/typography";
import useTheme from "../hooks/useTheme";

type Props = {
  id: string;
  title: string;
  address: string;
  onPress: (id: string) => void;
};

const CardRestaurant = ({ id, title, address, onPress }: Props) => {
  console.log("Render CardRestaurant:", id);

  const { colors } = useTheme();

  const handlePress = React.useCallback(() => {
    onPress(id);
  }, [onPress, id]);

  return (
    <Pressable
      style={({ pressed }) => [
        styles.card,
        {
          backgroundColor: colors.card,
          borderColor: colors.border,
        },
        pressed && styles.pressed,
      ]}
      onPress={handlePress}
    >
      <View style={styles.content}>
        <View style={styles.info}>
          <Text style={[styles.title, { color: colors.text }]}>{title}</Text>
          <Text style={styles.address}>📍 {address}</Text>
        </View>

        <AppIcon name="chevron-right" size={20} color={COLORS.grey[400]} />
      </View>
    </Pressable>
  );
};

export default React.memo(CardRestaurant);

const styles = StyleSheet.create({
  card: {
    width: "100%",
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    justifyContent: "center",
    ...SHADOWS.card,
  },

  pressed: {
    transform: [{ scale: 0.98 }],
    opacity: 0.92,
  },

  content: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },

  info: {
    flex: 1,
    gap: 4,
  },

  title: {
    ...TYPOGRAPHY.heading.h4,
  },

  address: {
    ...TYPOGRAPHY.caption.m,
    color: COLORS.primary[400],
  },
});

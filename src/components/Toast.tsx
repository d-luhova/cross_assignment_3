import React from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";

import AppIcon from "./AppIcon";
import { COLORS } from "../constants/colors";
import { SHADOWS } from "../constants/shadows";
import { TYPOGRAPHY } from "../constants/typography";

type Props = {
  title: string;
  description: string;
  onClose?: () => void;
};

export default function Toast({ title, description, onClose }: Props) {
  return (
    <View style={styles.toast}>
      <AppIcon name="check-circle" size={24} color={COLORS.primary[500]} />
      <View style={styles.content}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description}>{description}</Text>
      </View>

      {onClose && (
        <TouchableOpacity onPress={onClose}>
          <AppIcon name="close" size={16} color={COLORS.grey[500]} />
        </TouchableOpacity>
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  toast: {
    alignSelf: "stretch",
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    padding: 16,
    borderRadius: 12,
    backgroundColor: COLORS.primary[50],
    ...SHADOWS.soft,
  },

  content: {
    flex: 1,
    gap: 4,
  },

  title: {
    ...TYPOGRAPHY.action.l,
    color: COLORS.grey[700],
  },

  description: {
    ...TYPOGRAPHY.body.s,
    color: COLORS.grey[600],
  },
});

import React from "react";
import {
  Text,
  StyleSheet,
  Pressable,
  View,
  GestureResponderEvent,
  ViewStyle,
  useWindowDimensions,
} from "react-native";

import { COLORS } from "../constants/colors";
import { SHADOWS } from "../constants/shadows";
import { TYPOGRAPHY } from "../constants/typography";

type Props = {
  title: string;
  onPress: (e: GestureResponderEvent) => void;
  icon?: React.ReactNode;
  disabled?: boolean;
  style?: ViewStyle;
};

export default function ButtonPrimary({
  title,
  onPress,
  icon,
  disabled = false,
  style,
}: Props) {
  const { width } = useWindowDimensions();
  const isSmall = width < 375;
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={({ pressed }) => [
        styles.button,
        disabled && styles.disabled,
        !disabled && SHADOWS.primary,
        pressed && !disabled && styles.pressed,
        { paddingHorizontal: isSmall ? 12 : 16 },
        style,
      ]}
    >
      {icon ? <View style={styles.icon}>{icon}</View> : null}

      <Text style={styles.text}>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    height: 48,
    backgroundColor: COLORS.primary[400],
    borderRadius: 12,

    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 16,
  },

  text: {
    ...TYPOGRAPHY.action.l,
    color: COLORS.white,
  },

  icon: {
    marginRight: 8,
    alignItems: "center",
    justifyContent: "center",
  },

  disabled: {
    backgroundColor: COLORS.grey[300],
    elevation: 0,
    shadowOpacity: 0,
  },

  pressed: {
    transform: [{ scale: 0.98 }],
    opacity: 0.9,
  },
});

import React from "react";
import { View, StyleSheet, Pressable } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

import useTheme from "../hooks/useTheme";

export default function ThemeToggle() {
  const { theme, toggleTheme, colors } = useTheme();

  const isDark = theme === "dark";

  return (
    <View style={styles.container}>
      <Pressable
        onPress={toggleTheme}
        style={[
          styles.button,
          {
            backgroundColor: colors.card,
            borderColor: colors.border,
          },
        ]}
      >
        <MaterialIcons
          name={isDark ? "dark-mode" : "light-mode"}
          size={24}
          color={colors.primary}
        />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
  },

  button: {
    borderRadius: 12,
    padding: 12,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
  },
});
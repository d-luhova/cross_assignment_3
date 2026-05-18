import React from "react";
import { View, StyleSheet, Pressable, LayoutAnimation } from "react-native";
import AppIcon from "./AppIcon";
import useTheme from "../hooks/useTheme";

export default function ThemeToggle() {
  const { theme, toggleTheme, colors } = useTheme();

  const isDark = theme === "dark";

  const handleToggle = () => {
    LayoutAnimation.configureNext({
      duration: 1000,

      create: {
        type: LayoutAnimation.Types.easeInEaseOut,
        property: LayoutAnimation.Properties.opacity,
      },

      update: {
        type: LayoutAnimation.Types.spring,
        springDamping: 0.7,
      },

      delete: {
        type: LayoutAnimation.Types.easeInEaseOut,
        property: LayoutAnimation.Properties.opacity,
      },
    });

    toggleTheme();
  };

  return (
    <View style={styles.container}>
      <Pressable
        onPress={handleToggle}
        style={[
          styles.button,
          {
            backgroundColor: colors.card,
            borderColor: colors.border,
            padding: 16,
            borderRadius: isDark ? 12 : 28,
            borderBottomLeftRadius: 28,
          },
        ]}
      >
        <AppIcon
          name={isDark ? "moon" : "sun"}
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
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
  },
});

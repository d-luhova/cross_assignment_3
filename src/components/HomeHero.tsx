import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import AppIcon from "./AppIcon";
import { COLORS } from "../constants/colors";
import { TYPOGRAPHY } from "../constants/typography";
import useTheme from "../hooks/useTheme";

type Props = {
  onProfilePress?: () => void;
};

export default function HomeHero({ onProfilePress }: Props) {
  const { colors } = useTheme();
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{"Welcome \nto Wein & Brot"}</Text>

        <TouchableOpacity
          style={[
            styles.profileButton,
            {
              backgroundColor: colors.background,
            },
          ]}
          onPress={onProfilePress}
          accessibilityLabel="Open profile"
          activeOpacity={0.8}
        >
          <AppIcon name="user" size={24} color={colors.primary} />
        </TouchableOpacity>
      </View>

      <Text style={styles.subtitle}>
        Reserve a table in your preferred restaurant
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",

    backgroundColor: COLORS.secondary[200],

    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    paddingRight: 24,
    paddingLeft: 32,
    paddingTop: 32,
    paddingBottom: 24,
    gap: 16,
  },

  header: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    gap: 16,
  },

  title: {
    ...TYPOGRAPHY.heading.h1,
    color: COLORS.grey[700],
    flex: 1,
  },

  subtitle: {
    ...TYPOGRAPHY.body.m,
    color: COLORS.grey[500],
  },

  profileButton: {
    borderRadius: 28,
    padding: 16,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: COLORS.secondary[100],
  },
});

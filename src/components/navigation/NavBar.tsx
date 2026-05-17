import React from "react";

import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { COLORS } from "../../constants/colors";
import { TYPOGRAPHY } from "../../constants/typography";
import useTheme from "@/src/hooks/useTheme";

type Props = {
  title?: string;
  onBackPress?: () => void;
};

export default function NavBar({ title, onBackPress }: Props) {
  const { colors } = useTheme();
  return (
    <View style={styles.navBar}>
      
      <TouchableOpacity onPress={onBackPress} style={styles.backButton}>
        <MaterialIcons
          style={[styles.icons, { backgroundColor: colors.background }]}
          name="chevron-left"
          size={24}
          color={COLORS.primary[300]}
        />
      </TouchableOpacity>

      {title && (
        <Text style={[styles.title, { color: colors.text }]}>
          {title}
        </Text>
      )}

    </View>
  );
}
const styles = StyleSheet.create({
  navBar: {
    width: "100%",
    height: 56,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    marginTop: 8,
  },

  backButton: {
    position: "absolute",
    left: 24,
    zIndex: 10,
  },

  title: {
    ...TYPOGRAPHY.heading.h4,
  },
  icons: {  
    borderColor: COLORS.secondary[100], 
    borderWidth: 1, 
    borderRadius: 12, 
    padding: 12, 
  },
});
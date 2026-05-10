import React from "react";

import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { COLORS } from "../../constants/colors";
import { TYPOGRAPHY } from "../../constants/typography";

type Props = {
  title?: string;
  onBackPress?: () => void;
};

export default function NavBar({ title, onBackPress }: Props) {
  return (
    <View style={styles.navBar}>
      
      <TouchableOpacity onPress={onBackPress} style={styles.backButton}>
        <MaterialIcons
          style={styles.icons}
          name="chevron-left"
          size={24}
          color={COLORS.primary[300]}
        />
      </TouchableOpacity>

      {title && (
        <Text style={styles.title}>
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
    justifyContent: "center",
    position: "relative",
  },

  backButton: {
    position: "absolute",
    left: 24,
    zIndex: 10,
  },

  title: {
    position: "absolute",
    alignSelf: "center",
    ...TYPOGRAPHY.heading.h4,
    color: COLORS.grey[700],
  },
  icons: { 
    backgroundColor: COLORS.white, 
    borderColor: COLORS.secondary[200], 
    borderWidth: 1, 
    borderRadius: 12, 
    padding: 12, 
  },
});
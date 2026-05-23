import { TYPOGRAPHY } from "@/src/constants/typography";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import {
  LayoutAnimation,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import AppIcon, { AppIconName } from "../AppIcon";
import { COLORS } from "../../constants/colors";
import useTheme from "@/src/hooks/useTheme";
import { SHADOWS } from "@/src/constants/shadows";

export default function TabBar({ state, navigation }: BottomTabBarProps) {
  const { colors } = useTheme();
  return (
    <View style={[styles.tabBar, { backgroundColor: colors.tabBar }]}>
      {state.routes.map((route, index) => {
        const isFocused = state.index === index;

        const onPress = () => {
          if (isFocused) {
            return;
          }

          LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
          navigation.navigate(route.name);
        };

        const iconName: AppIconName =
          route.name === "Restaurants" ? "restaurant" : "calendar";

        const label =
          route.name === "Restaurants" ? "Restaurants" : "My Bookings";

        return (
          <Pressable
            key={route.key}
            onPress={onPress}
            style={({ pressed }) => [styles.tab, pressed && styles.tabPressed]}
          >
            <AppIcon
              name={iconName}
              size={20}
              color={isFocused ? COLORS.primary[400] : COLORS.grey[300]}
            />

            <Text
              style={[styles.text, isFocused ? styles.active : styles.inactive]}
            >
              {label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}
const styles = StyleSheet.create({
  tabBar: {
    height: 88,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    borderTopWidth: 1,
    borderTopColor: COLORS.secondary[100],
    ...SHADOWS.floating,
  },

  tab: {
    alignItems: "center",
    minWidth: 96,
    paddingVertical: 6,
  },

  tabPressed: {
    transform: [{ scale: 0.96 }],
    opacity: 0.8,
  },

  text: {
    marginTop: 8,
    ...TYPOGRAPHY.action.m,
  },

  active: {
    color: COLORS.grey[700],
  },

  inactive: {
    color: COLORS.grey[500],
  },
});

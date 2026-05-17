import { TYPOGRAPHY } from "@/src/constants/typography";
import { MaterialIcons } from "@expo/vector-icons";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { COLORS } from "../../constants/colors";
import useTheme from "@/src/hooks/useTheme";

export default function TabBar({ state, navigation }: BottomTabBarProps) {
  const { colors } = useTheme();
  return (
    <View style={[styles.tabBar, { backgroundColor: colors.tabBar }]}>
      {state.routes.map((route, index) => {
        const isFocused = state.index === index;

        const onPress = () => {
          navigation.navigate(route.name);
        };

        const iconName =
          route.name === "Restaurants" ? "restaurant" : "calendar-today";

        const label =
          route.name === "Restaurants" ? "Restaurants" : "My Bookings";

        return (
          <TouchableOpacity
            key={route.key}
            onPress={onPress}
            style={styles.tab}
          >
            <MaterialIcons
              name={iconName}
              size={20}
              color={isFocused ? COLORS.primary[400] : COLORS.grey[300]}
            />

            <Text
              style={[styles.text, isFocused ? styles.active : styles.inactive]}
            >
              {label}
            </Text>
          </TouchableOpacity>
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
  },

  tab: {
    alignItems: "center",
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

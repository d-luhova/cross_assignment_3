import React, { useMemo } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import AppIcon from "./AppIcon";
import restaurants from "../data/Restaurants";
import { COLORS } from "../constants/colors";
import { TYPOGRAPHY } from "../constants/typography";
import useTheme from "../hooks/useTheme";

type Props = {
  restaurantId: string;
};

function DetailsCard({ restaurantId }: Props) {
  console.log("Render DetailsCard");

  const { colors } = useTheme();

  const restaurant = useMemo(() => {
    return restaurants.find((item) => item.id === restaurantId);
  }, [restaurantId]);

  if (!restaurant) {
    return <Text>Restaurant not found</Text>;
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: colors.text }]}>
          {restaurant.title}
        </Text>

        <View style={styles.info}>
          <Text style={[styles.address, { color: colors.tetriaryText }]}>
            {restaurant.address}
          </Text>

          <TouchableOpacity style={styles.phoneButton}>
            <AppIcon
              name="phone"
              size={14}
              color={COLORS.primary[400]}
            />
            <Text style={styles.phone}>{restaurant.phone}</Text>
          </TouchableOpacity>
        </View>
      </View>

      <Text style={[styles.description, { color: colors.secondaryText }]}>
        {restaurant.description}
      </Text>
    </View>
  );
}

export default React.memo(DetailsCard);

const styles = StyleSheet.create({
  container: {
    width: "100%",
    gap: 24,
  },

  header: {
    gap: 16,
  },

  info: {
    gap: 8,
  },

  title: {
    ...TYPOGRAPHY.heading.h2,
  },

  address: {
    ...TYPOGRAPHY.body.m,
    lineHeight: 16,
  },

  phoneButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },

  phone: {
    ...TYPOGRAPHY.action.m,
    color: COLORS.primary[400],
  },

  description: {
    ...TYPOGRAPHY.body.m,
    lineHeight: 20,
  },
});

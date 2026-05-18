import { StyleSheet, View } from "react-native";
import AppIcon from "../components/AppIcon";
import ButtonPrimary from "../components/ButtonPrimary";
import DetailsCard from "../components/DetailsCard";
import NavBar from "../components/navigation/NavBar";
import NumberInput from "../components/NumberInput";
import { COLORS } from "../constants/colors";
import restaurants from "../data/Restaurants";
import React, { useCallback, useMemo, useState } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import useTheme from "../hooks/useTheme";
import RestaurantImage from "../components/RestaurantImage";

export default function DetailsScreen({ route, navigation }: any) {
  const { restaurantId } = route.params;
  const restaurant = restaurants.find((item) => item.id === restaurantId);
  const [guests, setGuests] = useState(1);
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  const handleNavigate = useCallback(() => {
    navigation.navigate("DateTime", {
      restaurantId,
      guests,
    });
  }, [navigation, restaurantId, guests]);
  return (
    <View
      style={[
        styles.container,
        { paddingTop: insets.top, backgroundColor: colors.background },
      ]}
    >
      <View style={styles.imageWrapper}>
        <RestaurantImage source={restaurant?.image ?? ""} />
        <View style={styles.navBar}>
          <NavBar onBackPress={() => navigation.goBack()} />
        </View>
      </View>

      <View style={styles.content}>
        <DetailsCard restaurantId={restaurantId} />
        <NumberInput guests={guests} onChange={setGuests} />
        <ButtonPrimary
          title="Find a table"
          icon={<AppIcon name="search" size={14} color={COLORS.white} />}
          onPress={handleNavigate}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  imageWrapper: {
    position: "relative",
  },

  image: {
    width: "100%",
    height: 361,
  },

  navBar: {
    position: "absolute",
    left: 0,
    right: 0,
    zIndex: 10,
  },

  content: {
    flex: 1,
    padding: 24,
    justifyContent: "space-between",
  },
});

import React from "react";
import { StyleSheet, View } from "react-native";
import CardRestaurant from "../components/CardRestaurant";
import HomeHero from "../components/HomeHero";
import { COLORS } from "../constants/colors";
import restaurants from "../data/Restaurants";

type Props = {
  navigation: any;
};

export default function HomeScreen({ navigation }: Props) {
  return (
    <View style={styles.container}>
      <HomeHero />

      <View style={styles.restaurantList}>
        {restaurants.map((item) => (
          <CardRestaurant
            key={item.id}
            title={item.title}
            address={item.address}
            onPress={() =>
              navigation.navigate("Details", {
                restaurantId: item.id,
              })
            }
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    backgroundColor: COLORS.white,
  },
  restaurantList: {
    padding: 24,
    paddingTop: 32,
    gap: 12,
    width: "100%",
  },
});

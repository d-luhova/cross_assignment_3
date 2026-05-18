import React, { useCallback } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import CardRestaurant from "../components/CardRestaurant";
import HomeHero from "../components/HomeHero";
import ThemeToggle from "../components/ThemeToggle";
import restaurants from "../data/Restaurants";
import useTheme from "../hooks/useTheme";

type Props = {
  navigation: any;
};

export default function HomeScreen({ navigation }: Props) {
  const { colors } = useTheme();

  const insets = useSafeAreaInsets();

  const handlePress = useCallback(
    (id: string) => {
      navigation.navigate("Details", {
        restaurantId: id,
      });
    },
    [navigation]
  );

  const renderRestaurant = useCallback(
    ({ item }: any) => (
      <CardRestaurant
        id={item.id}
        title={item.title}
        address={item.address}
        onPress={handlePress}
      />
    ),
    [handlePress]
  );

  return (
    <View
      style={[
        styles.container,
        {
          paddingTop: insets.top,
          backgroundColor: colors.background,
        },
      ]}
    >
      <HomeHero />
      <View style={styles.content}>
        <FlatList
          data={restaurants}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.restaurantList}
          renderItem={renderRestaurant}
        />
        <View style={styles.themeToggler}>
          <ThemeToggle />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
  },

  restaurantList: {
    padding: 24,
    paddingTop: 32,
    gap: 12,
    width: "100%",
  },

  content: {
    flex: 1,
    justifyContent: "space-between",
    width: "100%",
  },

  themeToggler: {
    width: "100%",
    alignItems: "flex-end",
    padding: 24,
  },
});

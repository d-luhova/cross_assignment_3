import React from "react";
import { StyleSheet } from "react-native";
import { Image } from "expo-image";

type Props = {
  source: string;
};

function RestaurantImage({ source }: Props) {
  console.log("Render RestaurantImage");
  return (
    <Image
      source={source}
      contentFit="cover"
      cachePolicy="memory-disk"
      transition={300}
      style={styles.image}
    />
  );
}

const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: 361,
  },
});

export default React.memo(RestaurantImage);

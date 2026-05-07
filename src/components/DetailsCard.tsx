import { Text, View } from "react-native";
import restaurants from "../data/Restaurants";

type Props = {
  restaurantId: string;
};

export default function DetailsCard({ restaurantId }: Props) {
  const restaurant = restaurants.find(
    item => item.id === restaurantId
  );

  return (
    <View>
      <Text>{restaurant?.title}</Text>
      <Text>{restaurant?.address}</Text>
      <Text>{restaurant?.description}</Text>
      <Text>{restaurant?.phone}</Text>
    </View>
  );
}
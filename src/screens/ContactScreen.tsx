import { View, Text, StyleSheet } from 'react-native';    
import ButtonPrimary from "../components/ButtonPrimary";
import { MaterialIcons } from "@expo/vector-icons";
import { COLORS } from '../constants/colors';
import TitleCard from '../components/TitleCard';
import { createBooking } from "../services/tablesApi";

export default function ContactScreen({
  route,
  navigation,
}: any) {
  const { restaurantId, guests, date, time } = route.params;
  const handleBooking = async () => {
  try {
    await createBooking({
      restaurantId,
      guests,
      date,
      time,
    });

    navigation.navigate("Bookings");} catch (error) {
    console.log(error);
  }};
  return (
    <View style={styles.container}>
        <TitleCard
                title="W&B - The Amber Room"
                subtitle="Leave your contact information so that the restaurant administration can call you if necessary."
              />
      <Text>Contact Screen</Text>
      <ButtonPrimary
              title="Find a table"
              icon={<MaterialIcons name="search" size={14} color={COLORS.white} />}
              onPress={handleBooking}
            />          
    </View>
  );
}   
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    },
});

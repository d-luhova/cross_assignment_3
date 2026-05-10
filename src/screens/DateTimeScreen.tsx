import { MaterialIcons } from "@expo/vector-icons";
import React, { useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import ButtonPrimary from "../components/ButtonPrimary";
import TitleCard from "../components/TitleCard";
import DateCalendar from "../components/dateTimePicker/DateCalendar";
import TimePicker from "../components/dateTimePicker/TimePicker";
import NavBar from "../components/navigation/NavBar";
import { COLORS } from "../constants/colors";
import restaurants from "../data/Restaurants";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function DateTimeScreen({
  route,
  navigation,
}: any) {
  const { restaurantId, guests } = route.params;
  const insets = useSafeAreaInsets();
  const [selectedTime, setSelectedTime] = useState("");
  const [selectedDate, setSelectedDate] = useState("");

  const restaurant = restaurants.find(
    item => item.id === restaurantId
  );

  return (
    <View style={[styles.container, { paddingTop: insets.top}]}>
      <View>
        <NavBar title="Date & time" onBackPress={() => navigation.goBack()} />
      </View>

      <ScrollView 
      nestedScrollEnabled
      keyboardShouldPersistTaps="handled"
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}>
        <TitleCard
          title={restaurant?.title || "Restaurant"}
          subtitle="Choose a date and time for your reservation."
        />
        <View>
          <DateCalendar onSelectDate={setSelectedDate} />
          <TimePicker
            selectedDate={selectedDate}
            onSelectTime={setSelectedTime}
          />
        </View>
        <ButtonPrimary
          title="Continue"
          icon={
            <MaterialIcons
              name="arrow-forward"
              size={14}
              color={COLORS.white}
            />
          }
          onPress={() =>
            navigation.navigate("Contact", {
              restaurantId,
              guests,
              date: selectedDate,
              time: selectedTime,
            })
          }
          disabled={!selectedDate || !selectedTime}
        />
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
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
    gap: 24,
  },
});

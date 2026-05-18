import React, { useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import AppIcon from "../components/AppIcon";
import ButtonPrimary from "../components/ButtonPrimary";
import TitleCard from "../components/TitleCard";
import DateCalendar from "../components/dateTimePicker/DateCalendar";
import TimePicker from "../components/dateTimePicker/TimePicker";
import NavBar from "../components/navigation/NavBar";
import { COLORS } from "../constants/colors";
import restaurants from "../data/Restaurants";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import useTheme from "../hooks/useTheme";

export default function DateTimeScreen({ route, navigation }: any) {
  const { restaurantId, guests } = route.params;
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  const [selectedTime, setSelectedTime] = useState("");
  const [selectedDate, setSelectedDate] = useState("");

  const restaurant = restaurants.find((item) => item.id === restaurantId);

  return (
    <View
      style={[
        styles.screen,
        { paddingTop: insets.top, backgroundColor: colors.background },
      ]}
    >
      <View>
        <NavBar title="Date & time" onBackPress={() => navigation.goBack()} />
      </View>

      <ScrollView
        nestedScrollEnabled
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        <TitleCard
          title={restaurant?.title || "Restaurant"}
          subtitle="Choose a date and time for your reservation."
        />
        <View style={styles.content}>
          <View>
            <DateCalendar onSelectDate={setSelectedDate} />
            <TimePicker
              selectedDate={selectedDate}
              onSelectTime={setSelectedTime}
            />
          </View>
          <ButtonPrimary
            title="Continue"
            icon={<AppIcon name="arrow-right" size={14} color={COLORS.white} />}
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
        </View>
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  navBar: {
    position: "absolute",
    left: 0,
    right: 0,
    zIndex: 10,
  },
  container: {
    flex: 1,
    padding: 24,
    gap: 32,
  },
  content: {
    flex: 1,
    justifyContent: "space-between",
  },
});

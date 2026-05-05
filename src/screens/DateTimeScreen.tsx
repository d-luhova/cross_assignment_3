import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import DateCalendar from "../components/dateTimePicker/DateCalendar";
import TimePicker from "../components/dateTimePicker/TimePicker";  
import { COLORS } from "../constants/colors";
import ButtonPrimary from "../components/ButtonPrimary";
import { MaterialIcons } from "@expo/vector-icons";
import TitleCard from "../components/TitleCard";


export default function DateTimeScreen() {
  const [selectedDate, setSelectedDate] = useState("");
  return (
    <View style={styles.container}>
        <TitleCard
                title="W&B – The Amber Room"
                subtitle="Leave your contact information so that the restaurant administration can call you if necessary."
              />
      <DateCalendar onSelectDate={setSelectedDate} />
      <TimePicker selectedDate={selectedDate} />
      <ButtonPrimary
              title="Find a table"
              icon={<MaterialIcons name="search" size={14} color={COLORS.white} />}
              onPress={() => {}}
              disabled={!selectedDate}
            />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    gap: 16,
    backgroundColor: "COLORS.white",
  },
});

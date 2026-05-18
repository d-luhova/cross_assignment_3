import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Calendar } from "react-native-calendars";
import { COLORS } from "../../constants/colors";
import useTheme from "@/src/hooks/useTheme";

type DateCalendarProps = {
  onSelectDate: (date: string) => void;
};

export default function DateCalendar({ onSelectDate }: DateCalendarProps) {
  const [selectedDate, setSelectedDate] = useState("");
  const colors = useTheme().colors;

  return (
    <View style={styles.calendar}>
      <Calendar
        onDayPress={(day) => {
          setSelectedDate(day.dateString);
          onSelectDate(day.dateString);
        }}
        markedDates={{
          [selectedDate]: {
            selected: true,
            selectedColor: COLORS.primary[400],
            selectedTextColor: COLORS.white,
          },
        }}
        theme={{
          backgroundColor: colors.background,
          calendarBackground: colors.background,
          todayTextColor: colors.primary,
          monthTextColor: colors.text,
          textMonthFontSize: 14,
          textMonthFontWeight: "700",
          textSectionTitleColor: colors.tetriaryText,
          dayTextColor: colors.text,
          arrowColor: colors.primary,
        }}
        monthFormat={"MMM yyyy"}
        hideExtraDays={true}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  calendar: {
    borderRadius: 12,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: COLORS.secondary[200],
    padding: 8,
  },
});

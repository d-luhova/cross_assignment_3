import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Calendar } from "react-native-calendars";
import { COLORS } from "../../constants/colors";

type DateCalendarProps = {
  onSelectDate: (date: string) => void;
}

export default function DateCalendar({ onSelectDate }: DateCalendarProps) {
  const [selectedDate, setSelectedDate] = useState("");  

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
          backgroundColor: COLORS.white,
          calendarBackground: COLORS.white,
          todayTextColor: COLORS.primary[400],
          monthTextColor: COLORS.grey[700],
          textMonthFontSize: 14,
          textMonthFontWeight: "700",
          textSectionTitleColor: COLORS.grey[400],
          dayTextColor: COLORS.grey[600],
          arrowColor: COLORS.grey[400],
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
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.secondary[200],
    padding: 16,
  },
});

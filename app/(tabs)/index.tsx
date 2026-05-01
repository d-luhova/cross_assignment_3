import { COLORS } from "@/src/constants/colors";
import { MaterialIcons } from "@expo/vector-icons";
import { useState } from "react";
import ButtonPrimary from "../../src/components/ButtonPrimary";
import DateCalendar from "../../src/components/dateTimePicker/DateCalendar";
import TimePicker from "../../src/components/dateTimePicker/TimePicker";
import TabBar from "../../src/components/navigation/TabBar";
import TitleCard from "../../src/components/TitleCard";

export default function Index() {
  const [selectedDate, setSelectedDate] = useState("");

  return (
    <>
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
      <TabBar />
    </>
  );
}

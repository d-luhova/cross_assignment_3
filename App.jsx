import { NavigationContainer } from '@react-navigation/native';
import StackNavigator from './src/navigation/StackNavigator';

export default function App() {
  return (
    <NavigationContainer>
      <StackNavigator />
    </NavigationContainer>
  );
}

import { COLORS } from "@/src/constants/colors";
import { MaterialIcons } from "@expo/vector-icons";
import { useState } from "react";
import ButtonPrimary from "../../src/components/ButtonPrimary";
import DateCalendar from "../../src/components/dateTimePicker/DateCalendar";
import TimePicker from "../../src/components/dateTimePicker/TimePicker";
import TabBar from "../../src/components/navigation/TabBar";
import TitleCard from "../../src/components/TitleCard";
import EmptyState from "@/src/components/EmptyState";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Toast from "@/src/components/Toast";
import { Button, View } from "react-native";
import BookingCard from "@/src/components/BookingCard"; 


export default function Index() {
  const [selectedDate, setSelectedDate] = useState("");
  const [visible, setVisible] = useState(true);

  return (
    <>
      <TabBar />
      
    </>
  );
}

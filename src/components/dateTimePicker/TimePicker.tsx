import React, { useState } from "react";
import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  FlatList,
  ListRenderItem,
  Modal,
  TouchableWithoutFeedback,
} from "react-native";
import { COLORS } from "../../constants/colors";
import { SHADOWS } from "../../constants/shadows";
import AppIcon from "../AppIcon";
import { TYPOGRAPHY } from "@/src/constants/typography";
import useTheme from "@/src/hooks/useTheme";

type Props = {
  selectedDate: string;
  onSelectTime: (time: string) => void;
};

const generateTimes = (): string[] => {
  const times: string[] = [];

  for (let hour = 11; hour <= 21; hour++) {
    times.push(`${hour}:00`);
    if (hour !== 21) times.push(`${hour}:30`);
  }

  return times;
};

const BOOKED_SLOTS: Record<string, string[]> = {
  "2026-05-01": ["12:00", "13:30"],
  "2026-05-02": ["11:30"],
};

export default function TimePicker({ selectedDate, onSelectTime }: Props) {
  const [selectedTime, setSelectedTime] = useState<string>("");
  const [open, setOpen] = useState<boolean>(false);

  const TIMES = generateTimes();

  const today: string = new Date().toISOString().split("T")[0];
  const currentHour: number = new Date().getHours();

  const isDisabled = (time: string): boolean => {
    const hour = parseInt(time.split(":")[0], 10);

    if (selectedDate === today && hour < currentHour) {
      return true;
    }

    if (BOOKED_SLOTS[selectedDate]?.includes(time)) {
      return true;
    }

    return false;
  };
  const colors = useTheme().colors;

  const renderItem: ListRenderItem<string> = ({ item }) => {
    const disabled = isDisabled(item);

    return (
      <TouchableOpacity
        style={styles.item}
        disabled={disabled}
        onPress={() => {
          setSelectedTime(item);
          onSelectTime(item);
          setOpen(false);
        }}
      >
        <Text
          style={[
            styles.itemText,
            item === selectedTime && styles.selected,
            disabled && styles.disabled,
          ]}
        >
          {item}
        </Text>
      </TouchableOpacity>
    );
  };

  const styles = StyleSheet.create({
    container: {
      marginTop: 16,
    },

    field: {
      height: 48,
      width: 130,
      borderRadius: 8,
      borderWidth: 1,
      borderColor: COLORS.secondary[200],
      backgroundColor: colors.inputBackground,
      paddingHorizontal: 16,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      ...SHADOWS.soft,
    },

    text: {
      ...TYPOGRAPHY.body.s,
    },

    dropdown: {
      marginTop: 4,
      borderRadius: 8,
      borderWidth: 1,
      borderColor: COLORS.secondary[200],
      backgroundColor: COLORS.white,
      maxHeight: 320,
      width: 130,
      ...SHADOWS.card,
    },

    item: {
      padding: 12,
    },

    itemText: {
      ...TYPOGRAPHY.body.s,
      color: COLORS.grey[600],
    },

    selected: {
      color: COLORS.primary[400],
      ...TYPOGRAPHY.action.m,
    },

    disabled: {
      color: COLORS.grey[300],
    },
    overlay: {
      ...StyleSheet.absoluteFillObject,
      justifyContent: "center",
      padding: 24,
    },
  });

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.field} onPress={() => setOpen(true)}>
        <Text style={[styles.text, { color: colors.text }]}>
          {selectedTime || "Time"}
        </Text>

        <AppIcon name="chevron-down" size={24} color={colors.primary} />
      </TouchableOpacity>

      <Modal visible={open} transparent animationType="fade">
        <TouchableWithoutFeedback onPress={() => setOpen(false)}>
          <View style={[styles.overlay, { backgroundColor: colors.overlay }]}>
            <TouchableWithoutFeedback>
              <View style={styles.dropdown}>
                <FlatList
                  data={TIMES}
                  keyExtractor={(item) => item}
                  renderItem={renderItem}
                />
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
}

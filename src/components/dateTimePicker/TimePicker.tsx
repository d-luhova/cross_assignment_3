import React, { useState } from 'react';
import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  FlatList,
  ListRenderItem,
} from 'react-native';
import { COLORS } from '../../constants/colors';
import { MaterialIcons } from '@expo/vector-icons';
import { TYPOGRAPHY } from '@/src/constants/typography';

type Props = {
  selectedDate: string;
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
  '2026-05-01': ['12:00', '13:30'],
  '2026-05-02': ['11:30'],
};

export default function TimePicker({ selectedDate }: Props) {
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [open, setOpen] = useState<boolean>(false);

  const TIMES = generateTimes();

  const today: string = new Date().toISOString().split('T')[0];
  const currentHour: number = new Date().getHours();

  const isDisabled = (time: string): boolean => {
    const hour = parseInt(time.split(':')[0], 10);

    if (selectedDate === today && hour < currentHour) {
      return true;
    }

    if (BOOKED_SLOTS[selectedDate]?.includes(time)) {
      return true;
    }

    return false;
  };

  const renderItem: ListRenderItem<string> = ({ item }) => {
    const disabled = isDisabled(item);

    return (
      <TouchableOpacity
        style={styles.item}
        disabled={disabled}
        onPress={() => {
          setSelectedTime(item);
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

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.field}
        onPress={() => setOpen((prev) => !prev)}
      >
        <Text style={styles.text}>
          {selectedTime || 'Time'}
        </Text>
        <MaterialIcons
        name={open ? 'keyboard-arrow-up' : 'keyboard-arrow-down'}
        size={24}
        color={COLORS.grey[400]}
        />
      </TouchableOpacity>

      {open && (
        <View style={styles.dropdown}>
          <FlatList
            data={TIMES}
            keyExtractor={(item) => item}
            renderItem={renderItem}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 16,
  },

  field: {
    height: 48,
    width: 130,
    backgroundColor: COLORS.white,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.secondary[200],
    paddingHorizontal: 16,
    flexDirection: 'row',        
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  text: {
    ...TYPOGRAPHY.body.s,
    color: COLORS.grey[500],
  },

  dropdown: {
    marginTop: 4,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.secondary[200],
    backgroundColor: COLORS.white,
    maxHeight: 120,
    width: 130,
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
});
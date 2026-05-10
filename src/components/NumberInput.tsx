import { useState } from 'react';

import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { COLORS } from '../constants/colors';
import { TYPOGRAPHY } from '../constants/typography';

type Props = {
  guests: number;
  onChange: (value: number) => void;
};


export default function NumberInput({ guests, onChange }: Props) {
  const increase = () => {
      onChange(guests + 1);
 };

  const decrease = () => {
    if (guests > 1) {
      onChange(guests - 1);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Number of guests
      </Text>

      <View style={styles.inputField}>
        <TouchableOpacity
          style={styles.button}
          onPress={decrease}
        >
          <MaterialIcons
            name="remove"
            size={14}
            color={COLORS.grey[700]}
          />
        </TouchableOpacity>

        <View style={styles.number}>
          <Text style={styles.numberText}>
            {guests}
          </Text>
        </View>

        <TouchableOpacity
          style={styles.button}
          onPress={increase}
        >
          <MaterialIcons
            name="add"
            size={14}
            color={COLORS.grey[700]}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  title: {
    ...TYPOGRAPHY.action.l,
    color: COLORS.grey[700],
  },

  inputField: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },

  button: {
    width: 36,
    height: 36,
    borderRadius: 999,
    backgroundColor: COLORS.secondary[100],
    alignItems: 'center',
    justifyContent: 'center',
  },

  number: {
    paddingHorizontal: 4,
    paddingVertical: 6,
  },

  numberText: {
    ...TYPOGRAPHY.body.m,
    color: COLORS.grey[700],
    textAlign: 'center',
  },
});
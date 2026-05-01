import React from 'react';
import {
  Text,
  StyleSheet,
  TouchableOpacity,
  View,
  GestureResponderEvent,
  ViewStyle,
  useWindowDimensions
} from 'react-native';

import { COLORS } from '../constants/colors';
import { TYPOGRAPHY } from '../constants/typography';

type Props = {
  title: string;
  onPress: (e: GestureResponderEvent) => void;
  icon?: React.ReactNode;
  disabled?: boolean;
  style?: ViewStyle;
};

export default function ButtonPrimary({
  title,
  onPress,
  icon,
  disabled = false,
  style,
}: Props) {
  const { width } = useWindowDimensions();
  const isSmall = width < 375;
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      style={[styles.button, disabled && styles.disabled, { paddingHorizontal: isSmall ? 12 : 16 }, style]}
      activeOpacity={0.8}
    >
      {icon ? <View style={styles.icon}>{icon}</View> : null}

      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    height: 48,
    backgroundColor: COLORS.primary[400],
    borderRadius: 12,

    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
  },

  text: {
    ...TYPOGRAPHY.action.l,
    color: COLORS.white,
  },

  icon: {
    marginRight: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },

  disabled: {
    backgroundColor: COLORS.grey[300],
  },
});
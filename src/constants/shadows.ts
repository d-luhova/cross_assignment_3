import { Platform, ViewStyle } from "react-native";

import { COLORS } from "./colors";

type ShadowStyle = ViewStyle & {
  boxShadow?: string;
};

const toRgba = (hex: string, opacity: number) => {
  const normalized = hex.replace("#", "");
  const red = parseInt(normalized.slice(0, 2), 16);
  const green = parseInt(normalized.slice(2, 4), 16);
  const blue = parseInt(normalized.slice(4, 6), 16);

  return `rgba(${red}, ${green}, ${blue}, ${opacity})`;
};

const createShadow = (
  elevation: number,
  radius: number,
  offsetY: number,
  opacity: number,
  color: string
): ShadowStyle => {
  if (Platform.OS === "web") {
    return {
      boxShadow: `0 ${offsetY}px ${radius * 2}px ${toRgba(color, opacity)}`,
    };
  }

  return {
    shadowColor: color,
    shadowOffset: {
      width: 0,
      height: offsetY,
    },
    shadowOpacity: opacity,
    shadowRadius: radius,
    elevation,
  };
};

export const SHADOWS = {
  soft: createShadow(1, 5, 2, 0.1, COLORS.secondary[200]),
  card: createShadow(2, 7, 3, 0.14, COLORS.secondary[200]),
  floating: createShadow(3, 10, -3, 0.12, COLORS.secondary[200]),
  primary: createShadow(3, 8, 4, 0.14, COLORS.primary[400]),
} as const;

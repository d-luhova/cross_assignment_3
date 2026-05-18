import type { ComponentType } from "react";
import type { ColorValue, StyleProp, ViewStyle } from "react-native";
import {
  ArrowRight,
  Calendar,
  CalendarDays,
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  CircleCheck,
  Moon,
  Minus,
  Phone,
  Plus,
  Search,
  Sun,
  Trash2,
  Utensils,
  X,
} from "lucide-react-native/icons";

export type AppIconName =
  | "trash"
  | "calendar-days"
  | "search"
  | "chevron-right"
  | "check"
  | "arrow-right"
  | "phone"
  | "chevron-down"
  | "minus"
  | "plus"
  | "chevron-left"
  | "restaurant"
  | "calendar"
  | "moon"
  | "sun"
  | "check-circle"
  | "close";

type IconProps = {
  size?: number;
  color?: ColorValue;
  strokeWidth?: number;
  style?: StyleProp<ViewStyle>;
};

const ICONS: Record<AppIconName, ComponentType<IconProps>> = {
  trash: Trash2,
  "calendar-days": CalendarDays,
  search: Search,
  "chevron-right": ChevronRight,
  check: Check,
  "arrow-right": ArrowRight,
  phone: Phone,
  "chevron-down": ChevronDown,
  minus: Minus,
  plus: Plus,
  "chevron-left": ChevronLeft,
  restaurant: Utensils,
  calendar: Calendar,
  moon: Moon,
  sun: Sun,
  "check-circle": CircleCheck,
  close: X,
};

export default function AppIcon({
  name,
  size = 24,
  color,
  strokeWidth = 2,
  style,
}: IconProps & { name: AppIconName }) {
  const Icon = ICONS[name];

  return (
    <Icon
      size={size}
      color={color}
      strokeWidth={strokeWidth}
      style={style}
    />
  );
}

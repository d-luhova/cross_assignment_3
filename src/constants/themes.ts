import { COLORS } from "../constants/colors";

export type ThemeColors = {
  background: string;
  card: string;
  text: string;
  secondaryText: string;
  tetriaryText: string;
  placeholderText: string;
  border: string;
  primary: string;
  tabBar: string;
  inputBackground: string;
  overlay: string;
};

export type Theme = {
  colors: ThemeColors;
};

export const lightTheme: Theme = {
  colors: {
    background: COLORS.white,
    card: COLORS.white,
    text: COLORS.grey[700],
    secondaryText: COLORS.grey[600],
    tetriaryText: COLORS.grey[500],
    placeholderText: COLORS.grey[300],
    border: COLORS.secondary[100],
    primary: COLORS.primary[400],
    tabBar: COLORS.secondary[50],
    inputBackground: COLORS.white,
    overlay: "rgba(0,0,0,0.3)",
  },
};

export const darkTheme: Theme = {
  colors: {
    background: COLORS.grey[600],
    card: COLORS.grey[600],
    text: COLORS.white,
    secondaryText: COLORS.grey[200],
    tetriaryText: COLORS.grey[300],
    placeholderText: COLORS.grey[400],
    border: COLORS.secondary[100],
    primary: COLORS.primary[200],
    tabBar: COLORS.secondary[100],
    inputBackground: COLORS.grey[600],
    overlay: "rgba(0,0,0,0.5)" ,
  },
};
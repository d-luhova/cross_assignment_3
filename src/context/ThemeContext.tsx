import {
  createContext,
  useMemo,
  useState,
} from "react";

import {
  darkTheme,
  lightTheme,
  ThemeColors,
} from "../constants/themes";

export type ThemeMode = "light" | "dark";

type ThemeContextType = {
  theme: ThemeMode;
  colors: ThemeColors;
  toggleTheme: () => void;
};

export const ThemeContext =
  createContext<ThemeContextType | null>(null);

type Props = {
  children: React.ReactNode;
};

export default function ThemeProvider({
  children,
}: Props) {
  const [theme, setTheme] =
    useState<ThemeMode>("light");

  const toggleTheme = () => {
    setTheme(prev =>
      prev === "light" ? "dark" : "light"
    );
  };

  const colors =
    theme === "light"
      ? lightTheme.colors
      : darkTheme.colors;

  const value = useMemo(
    () => ({
      theme,
      colors,
      toggleTheme,
    }),
    [theme, colors]
  );

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}
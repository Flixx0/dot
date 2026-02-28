import type { Theme } from "@react-navigation/native";
import { DefaultTheme } from "@react-navigation/native";

import {
  black,
  darkGray,
  gray,
  lightGray,
  offWhite,
  orange,
  white,
} from "@/constants/Colors";

/**
 * Thème app : mêmes noms que les constantes (orange, offWhite, etc.).
 * Les clés primary, background, etc. restent pour React Navigation.
 * Police : Nunito (regular, medium, semibold, bold).
 */
const themeColors = {
  orange,
  offWhite,
  white,
  darkGray,
  lightGray,
  gray,
  black,
  primary: orange,
  background: offWhite,
  card: white,
  text: darkGray,
  border: lightGray,
  notification: orange,
};

/** Couleurs du thème (noms des constantes + clés RN). Pour typer useTheme().colors. */
export type AppThemeColors = typeof themeColors;

export const AppTheme: Theme = {
  ...DefaultTheme,
  dark: false,
  colors: themeColors as Theme["colors"],
  fonts: {
    regular: {
      fontFamily: "Nunito_400Regular",
      fontWeight: "400",
    },
    medium: {
      fontFamily: "Nunito_500Medium",
      fontWeight: "500",
    },
    bold: {
      fontFamily: "Nunito_600SemiBold",
      fontWeight: "600",
    },
    heavy: {
      fontFamily: "Nunito_700Bold",
      fontWeight: "700",
    },
  },
};

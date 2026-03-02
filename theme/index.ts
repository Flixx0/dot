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

const appFonts = {
  regular: {
    fontFamily: "Nunito_400Regular",
    fontWeight: "400",
  },
  medium: {
    fontFamily: "Nunito_500Medium",
    fontWeight: "500",
  },
  bold: {
    fontFamily: "Nunito_700Bold",
    fontWeight: "700",
  },
  extraBold: {
    fontFamily: "Nunito_800ExtraBold",
    fontWeight: "800",
  },
  heavy: {
    fontFamily: "Nunito_900Black",
    fontWeight: "900",
  },
};

/** Polices du thème (regular, medium, bold, extraBold, heavy). Pour typer useTheme().fonts. */
export type AppThemeFonts = typeof appFonts;

export const AppTheme: Theme = {
  ...DefaultTheme,
  dark: false,
  colors: themeColors as Theme["colors"],
  fonts: appFonts as Theme["fonts"],
};

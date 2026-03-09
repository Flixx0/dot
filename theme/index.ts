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

export type AppThemeFonts = typeof appFonts;

export const AppTheme: ReactNavigation.Theme = {
  ...DefaultTheme,
  dark: false,
  colors: themeColors,
  fonts: appFonts,
};

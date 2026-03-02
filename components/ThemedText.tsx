/**
 * Text with theme color and font (Nunito).
 */

import { Theme, useTheme } from "@react-navigation/native";
import {
  Text as DefaultText,
  TextProps as DefaultTextProps,
} from "react-native";

import { useThemeColor } from "./useThemeColor";

type FontWeight = "regular" | "medium" | "bold" | "heavy" | "extraBold";

type ThemeProps = {
  lightColor?: string;
  darkColor?: string;
  weight?: FontWeight;
  size?: number;
};

export type TextProps = ThemeProps & DefaultTextProps;

export const ThemedText = (props: TextProps) => {
  const {
    style,
    lightColor,
    darkColor,
    weight = "regular",
    size,
    ...otherProps
  } = props;
  const color = useThemeColor({ light: lightColor, dark: darkColor }, "text");
  const theme = useTheme();
  const fontFamily =
    theme?.fonts?.[weight as keyof Theme["fonts"]]?.fontFamily ??
    theme?.fonts?.regular?.fontFamily;
  return (
    <DefaultText
      style={[
        { color, ...(fontFamily && { fontFamily }) },
        size !== undefined && { fontSize: size },
        style,
      ]}
      {...otherProps}
    />
  );
};

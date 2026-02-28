/**
 * View with theme background color (light/dark).
 */

import {
  View as DefaultView,
  ViewProps as DefaultViewProps,
} from "react-native";

import { useThemeColor } from "./useThemeColor";

type ThemeProps = {
  lightColor?: string;
  darkColor?: string;
};

export type ViewProps = ThemeProps & DefaultViewProps;

export const ThemedView = (props: ViewProps) => {
  const { style, lightColor, darkColor, ...otherProps } = props;
  const backgroundColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    "background"
  );
  return <DefaultView style={[{ backgroundColor }, style]} {...otherProps} />;
};

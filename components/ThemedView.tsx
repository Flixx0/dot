import {
  View as DefaultView,
  ViewProps as DefaultViewProps,
} from "react-native";

import { useThemeColor } from "./useThemeColor";

type ThemeProps = {
  lightColor?: string;
  darkColor?: string;
  backgroundColor?: string;
};

export type ViewProps = ThemeProps & DefaultViewProps;

export const ThemedView = (props: ViewProps) => {
  const {
    style,
    lightColor,
    darkColor,
    backgroundColor: backgroundColorProp,
    ...otherProps
  } = props;
  const themeBackground = useThemeColor(
    { light: lightColor, dark: darkColor },
    "background"
  );
  const backgroundColor = backgroundColorProp ?? themeBackground;
  return <DefaultView style={[{ backgroundColor }, style]} {...otherProps} />;
};

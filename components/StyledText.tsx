import { TextProps as RNTextProps, Text } from "react-native";

import { TextProps } from "./ThemedText";

export const MonoText = (props: TextProps) => {
  const { style, ...rest } = props;
  return (
    <Text
      {...(rest as RNTextProps)}
      style={[style, { fontFamily: "SpaceMono" }]}
    />
  );
};

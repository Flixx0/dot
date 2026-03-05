import { withMemo } from "@/helpers/withMemo";
import { useTheme } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { StyleSheet } from "react-native";

export const ModalHeaderBackground = withMemo(() => {
  const { colors } = useTheme();
  return (
    <LinearGradient
      colors={[colors.black, "transparent"]}
      style={StyleSheet.absoluteFill}
    />
  );
});

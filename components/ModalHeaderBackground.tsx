import { useTheme } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { StyleSheet } from "react-native";

export const ModalHeaderBackground = () => {
  const { colors } = useTheme();

  return (
    <LinearGradient
      colors={[colors.black, "transparent"]}
      style={StyleSheet.absoluteFill}
    />
  );
};

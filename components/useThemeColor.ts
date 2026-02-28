import Colors from "@/constants/Colors";
import { useColorScheme } from "./useColorScheme";

export const useThemeColor = (
  props: { light?: string; dark?: string },
  colorName: keyof typeof Colors.light & keyof typeof Colors.dark
) => {
  const theme = useColorScheme() ?? "light";
  const colorFromProps = props[theme];
  return colorFromProps ?? Colors[theme][colorName];
};

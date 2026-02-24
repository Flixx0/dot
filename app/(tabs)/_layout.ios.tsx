import { useColorScheme } from "@/components/useColorScheme";
import { DarkTheme, DefaultTheme, ThemeProvider } from "@react-navigation/native";
import { DynamicColorIOS } from "react-native";

import { Icon, Label, NativeTabs } from "expo-router/unstable-native-tabs";

const TabLayoutIOS = () => {
  const colorScheme = useColorScheme();
  const theme = colorScheme === "dark" ? DarkTheme : DefaultTheme;
  const tintColor = DynamicColorIOS({ dark: "#fff", light: "#2f95dc" });
  const labelColor = DynamicColorIOS({
    dark: "white",
    light: "black",
  });

  return (
    <ThemeProvider value={theme}>
      <NativeTabs
        tintColor={tintColor}
        labelStyle={{ color: labelColor }}
        minimizeBehavior="onScrollDown"
      >
        <NativeTabs.Trigger name="index">
          <Label>Tab One</Label>
          <Icon sf={{ default: "house", selected: "house.fill" }} />
        </NativeTabs.Trigger>
        <NativeTabs.Trigger name="two">
          <Label>Tab Two</Label>
          <Icon
            sf={{ default: "square.grid.2x2", selected: "square.grid.2x2.fill" }}
          />
        </NativeTabs.Trigger>
      </NativeTabs>
    </ThemeProvider>
  );
};

export default TabLayoutIOS;

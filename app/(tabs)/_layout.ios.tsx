import { useColorScheme } from "@/components/useColorScheme";
import { ThemeProvider } from "@react-navigation/native";

import { AppTheme } from "@/theme";
import { DynamicColorIOS } from "react-native";

import { Icon, Label, NativeTabs } from "expo-router/unstable-native-tabs";

const TabLayoutIOS = () => {
  const colorScheme = useColorScheme();
  const tintColor = DynamicColorIOS({
    dark: "#E86A53",
    light: "#E86A53",
  });
  const labelColor = DynamicColorIOS({
    dark: "#FFFFFF",
    light: "#333333",
  });

  return (
    <ThemeProvider value={AppTheme}>
      <NativeTabs
        tintColor={AppTheme.colors.primary}
        labelStyle={{
          default: { color: labelColor },
          selected: { color: tintColor },
        }}
        minimizeBehavior="onScrollDown"
      >
        <NativeTabs.Trigger name="home">
          <Label>Tab One</Label>
          <Icon sf={{ default: "house", selected: "house.fill" }} />
        </NativeTabs.Trigger>
        <NativeTabs.Trigger name="two">
          <Label>Tab Two</Label>
          <Icon
            sf={{
              default: "square.grid.2x2",
              selected: "square.grid.2x2.fill",
            }}
          />
        </NativeTabs.Trigger>
      </NativeTabs>
    </ThemeProvider>
  );
};

export default TabLayoutIOS;

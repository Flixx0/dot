import { HIDE_TAB_BAR } from "@/constants/Dev";
import { ThemeProvider } from "@react-navigation/native";

import { AppTheme } from "@/theme";
import { DynamicColorIOS } from "react-native";

import { Icon, Label, NativeTabs } from "expo-router/unstable-native-tabs";

import TabLayoutAndroid from "./_layout.android";

const TabLayoutIOS = () => {
  if (HIDE_TAB_BAR) return <TabLayoutAndroid />;

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
          <Label>Home</Label>
          <Icon sf={{ default: "house", selected: "house.fill" }} />
        </NativeTabs.Trigger>
        <NativeTabs.Trigger name="two">
          <Label>New</Label>
          <Icon
            sf={{
              default: "plus",
              selected: "plus",
            }}
          />
        </NativeTabs.Trigger>
      </NativeTabs>
    </ThemeProvider>
  );
};

export default TabLayoutIOS;

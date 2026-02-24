import { useColorScheme } from "@/components/useColorScheme";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import type { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { DarkTheme, DefaultTheme, ThemeProvider } from "@react-navigation/native";
import { Tabs } from "expo-router";
import type { ComponentProps } from "react";
import { useCallback } from "react";

import { FloatingTabBar } from "@/components/FloatingTabBar";
import Colors from "@/constants/Colors";

const TabBarIcon = (props: {
  name: ComponentProps<typeof FontAwesome>["name"];
  color: string;
}) => <FontAwesome size={24} style={{ marginBottom: -2 }} {...props} />;

const TabLayoutAndroid = () => {
  const colorScheme = useColorScheme();
  const theme = colorScheme === "dark" ? DarkTheme : DefaultTheme;
  const colors = Colors[colorScheme ?? "light"];

  const renderTabBar = useCallback((props: BottomTabBarProps) => (
    <FloatingTabBar {...props} />
  ), []);

  return (
    <ThemeProvider value={theme}>
      <Tabs
        tabBar={renderTabBar}
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: colors.tint,
          tabBarInactiveTintColor: colors.tabIconDefault,
          tabBarStyle: {
            position: "absolute",
            borderTopWidth: 0,
            elevation: 0,
            backgroundColor: "transparent",
          },
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: "Tab One",
            tabBarIcon: ({ color }) => (
              <TabBarIcon name="home" color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="two"
          options={{
            title: "Tab Two",
            tabBarIcon: ({ color }) => (
              <TabBarIcon name="th-large" color={color} />
            ),
          }}
        />
      </Tabs>
    </ThemeProvider>
  );
};

export default TabLayoutAndroid;

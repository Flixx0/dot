import { useColorScheme } from "@/components/useColorScheme";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import type { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { ThemeProvider } from "@react-navigation/native";

import { FloatingTabBar } from "@/components/FloatingTabBar";
import Colors from "@/constants/Colors";
import { HIDE_TAB_BAR } from "@/constants/Dev";
import { AppTheme } from "@/theme";
import { Tabs } from "expo-router";
import type { ComponentProps } from "react";
import { useCallback } from "react";

const TabBarIcon = (props: {
  name: ComponentProps<typeof FontAwesome>["name"];
  color: string;
}) => <FontAwesome size={24} style={{ marginBottom: -2 }} {...props} />;

const TabLayoutAndroid = () => {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? "light"];

  const renderTabBar = useCallback(
    (props: BottomTabBarProps) => <FloatingTabBar {...props} />,
    []
  );

  return (
    <ThemeProvider value={AppTheme}>
      <Tabs
        initialRouteName="home"
        tabBar={HIDE_TAB_BAR ? () => null : renderTabBar}
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
        <Tabs.Screen name="index" options={{ href: null }} />
        <Tabs.Screen
          name="home"
          options={{
            title: "Tab One",
            tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />,
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

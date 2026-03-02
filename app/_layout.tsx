import {
  Nunito_400Regular,
  Nunito_500Medium,
  Nunito_600SemiBold,
  Nunito_700Bold,
  Nunito_800ExtraBold,
  Nunito_900Black,
} from "@expo-google-fonts/nunito";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { ThemeProvider } from "@react-navigation/native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import { RemindersProvider } from "@/contexts/RemindersContext";
import { AppTheme } from "@/theme";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { Platform, StyleSheet, Text } from "react-native";

const RNText = Text as typeof Text & { defaultProps?: { style?: object } };
RNText.defaultProps = {
  ...RNText.defaultProps,
  style: { fontFamily: AppTheme.fonts.regular.fontFamily },
};

export { ErrorBoundary } from "expo-router";

export const unstable_settings = {
  initialRouteName: "(tabs)",
};

SplashScreen.preventAutoHideAsync();

const RootLayoutNav = () => (
  <GestureHandlerRootView style={StyleSheet.absoluteFill}>
    <ThemeProvider value={AppTheme}>
      <RemindersProvider>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen
            name="modal"
            options={{
              presentation: Platform.OS === "ios" ? "modal" : "formSheet",
              animation:
                Platform.OS === "android" ? "slide_from_bottom" : undefined,
              ...(Platform.OS === "android" && {
                sheetAllowedDetents: [1],
              }),
            }}
          />
        </Stack>
      </RemindersProvider>
    </ThemeProvider>
  </GestureHandlerRootView>
);

const RootLayout = () => {
  const [loaded, error] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    ...FontAwesome.font,
    Nunito_400Regular,
    Nunito_500Medium,
    Nunito_600SemiBold,
    Nunito_700Bold,
    Nunito_800ExtraBold,
    Nunito_900Black,
  });

  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
};

export default RootLayout;

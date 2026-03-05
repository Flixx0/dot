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
import { KeyboardProvider } from "react-native-keyboard-controller";

import { ModalHeaderBackground } from "@/components/ModalHeaderBackground";
import { ModalHeaderCloseButton } from "@/components/ModalHeaderCloseButton";
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

const addModalHeaderRight = () => <ModalHeaderCloseButton />;
const addModalHeaderBackground = () => <ModalHeaderBackground />;

const RootLayoutNav = () => (
  <GestureHandlerRootView style={StyleSheet.absoluteFill}>
    <KeyboardProvider>
      <ThemeProvider value={AppTheme}>
        <RemindersProvider>
          <Stack>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen
              name="addModal"
              options={{
                presentation: Platform.OS === "ios" ? "modal" : "formSheet",
                animation:
                  Platform.OS === "android" ? "slide_from_bottom" : undefined,
                ...(Platform.OS === "android" && {
                  sheetAllowedDetents: [1],
                }),
                headerShown: false,
                // headerRight: addModalHeaderRight,
                // headerTitle: "Ajouter un rappel",
                // headerTransparent: true,
                // headerBackground: addModalHeaderBackground,
                // headerTintColor: AppTheme.colors.background,
              }}
            />
          </Stack>
        </RemindersProvider>
      </ThemeProvider>
    </KeyboardProvider>
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

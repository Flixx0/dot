import { AddReminderSettingsView } from "@/components/AddReminderSettingsView";
import { AddReminderTitleView } from "@/components/AddReminderTitleView";
import { Button } from "@/components/Button";
import type { Reminder } from "@/components/RemiderRow";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useReminders } from "@/contexts/RemindersContext";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { useTheme } from "@react-navigation/native";
import { useRouter } from "expo-router";
import { useCallback, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { StyleSheet } from "react-native";
import { KeyboardStickyView } from "react-native-keyboard-controller";
import Animated, {
  LinearTransition,
  SlideInLeft,
} from "react-native-reanimated";

export type AddReminderFormValues = Omit<Reminder, "id">;

const defaultValues: AddReminderFormValues = {
  title: "",
  description: "",
  date: undefined,
  duration: 0,
  recurring: false,
};

const layoutTransition = LinearTransition.springify()
  .damping(18)
  .stiffness(120)
  .duration(320);

const AddModalScreen = () => {
  const { colors } = useTheme();
  const { addReminder } = useReminders();
  const [viewState, setViewState] = useState<"title" | "settings">("title");
  const router = useRouter();

  const methods = useForm<AddReminderFormValues>({
    defaultValues,
  });
  const title = methods.watch("title");

  const handleNextPress = useCallback(() => {
    if (viewState === "title") {
      setViewState("settings");
    } else {
      addReminder(methods.getValues());
      router.back();
    }
  }, [viewState, methods, addReminder, router]);

  return (
    <FormProvider {...methods}>
      <ThemedView style={styles.container} backgroundColor={colors.primary}>
        {viewState === "title" ? (
          <AddReminderTitleView />
        ) : (
          <AddReminderSettingsView title={title ?? ""} />
        )}
        <KeyboardStickyView>
          <Animated.View
            layout={layoutTransition}
            style={styles.buttonContainer}
          >
            {viewState === "settings" ? (
              <Animated.View entering={SlideInLeft.duration(100)}>
                <Button
                  onPress={() => setViewState("title")}
                  style={[styles.backButton]}
                >
                  <FontAwesome6
                    name="chevron-left"
                    size={24}
                    color={colors.background}
                  />
                </Button>
              </Animated.View>
            ) : null}
            <Animated.View
              layout={layoutTransition}
              style={[styles.buttonContainer, styles.nextButtonWrapper]}
            >
              <Button
                style={[styles.button, { backgroundColor: colors.black }]}
                onPress={handleNextPress}
              >
                <ThemedText weight="bold" size={18} color={colors.background}>
                  {viewState === "title" ? "Suivant" : "Créer"}
                </ThemedText>
              </Button>
            </Animated.View>
          </Animated.View>
        </KeyboardStickyView>
      </ThemedView>
    </FormProvider>
  );
};

export default AddModalScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 24,
  },
  button: {
    flex: 1,
    paddingVertical: 16,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 32,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 16,
  },
  nextButtonWrapper: {
    flex: 1,
    minWidth: 0,
  },
  backButton: {
    width: 48,
    height: 48,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 24,
    backgroundColor: "rgba(0, 0, 0, 0.3)",
  },
});

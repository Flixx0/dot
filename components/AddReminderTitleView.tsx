import type { AddReminderFormValues } from "@/app/addModal";
import { withMemo } from "@/helpers/withMemo";
import { useTheme } from "@react-navigation/native";
import { useCallback, useEffect } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { StyleSheet, TextInput, View } from "react-native";
import { KeyboardAvoidingView } from "react-native-keyboard-controller";
import Animated, {
  FadeOut,
  withDelay,
  withTiming,
} from "react-native-reanimated";

const DELAY_PER_LETTER_MS = 20;
const AUTO_FOCUS_DELAY_MS = 600;
const headerText = "De quoi tu veux te souvenir ?";

export const AddReminderTitleView = withMemo(() => {
  const { colors, fonts } = useTheme();
  const { control, setFocus } = useFormContext<AddReminderFormValues>();

  useEffect(() => {
    const t = setTimeout(() => setFocus("title"), AUTO_FOCUS_DELAY_MS);
    return () => clearTimeout(t);
  }, [setFocus]);

  const customEntering = useCallback(
    (index: number, rotation: string = "45deg") =>
      (targetValues: { targetOriginY: number }) => {
        "worklet";
        const delay = index * DELAY_PER_LETTER_MS;
        const animations = {
          originY: withDelay(
            delay,
            withTiming(targetValues.targetOriginY, { duration: 150 })
          ),
          opacity: withDelay(delay, withTiming(1, { duration: 150 })),
          transform: [
            { rotate: withDelay(delay, withTiming("0deg", { duration: 150 })) },
          ],
        };
        const initialValues = {
          originY: targetValues.targetOriginY + 10,
          opacity: 0,
          transform: [{ rotate: rotation }],
        };
        return {
          initialValues,
          animations,
        };
      },
    []
  );

  return (
    <KeyboardAvoidingView style={styles.keyboardAvoid} behavior="padding">
      <Animated.View
        exiting={FadeOut.duration(100)}
        style={styles.contentContainer}
      >
        <View style={styles.headerContainer}>
          {headerText.split("").map((letter, index) => (
            <Animated.Text
              key={letter + index}
              entering={customEntering(index)}
              style={[
                styles.title,
                {
                  fontFamily: fonts.heavy.fontFamily,
                  color: colors.background,
                },
              ]}
            >
              {letter}
            </Animated.Text>
          ))}
        </View>
        <Animated.View
          entering={customEntering(headerText.length / 2, "2deg")}
          style={[
            styles.inputContainer,
            { backgroundColor: colors.background },
          ]}
        >
          <Controller
            control={control}
            name="title"
            render={({ field: { onChange, onBlur, value, ref } }) => (
              <TextInput
                ref={ref}
                style={[styles.input, { color: colors.text }]}
                placeholder="Entre un titre pour ton rappel"
                placeholderTextColor={colors.gray}
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
              />
            )}
          />
        </Animated.View>
      </Animated.View>
    </KeyboardAvoidingView>
  );
});

const styles = StyleSheet.create({
  keyboardAvoid: {
    flex: 1,
    justifyContent: "center",
  },
  contentContainer: {
    width: "100%",
    gap: 32,
  },
  headerContainer: {
    flexDirection: "row",
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
  },
  input: {
    fontSize: 16,
  },
  inputContainer: {
    width: "100%",
    padding: 16,
    borderRadius: 16,
  },
});

import { withMemo } from "@/helpers/withMemo";
import { useTheme } from "@react-navigation/native";
import { useCallback, useEffect, useRef } from "react";
import { StyleSheet, TextInput, View } from "react-native";
import { KeyboardAvoidingView } from "react-native-keyboard-controller";
import Animated, { withDelay, withTiming } from "react-native-reanimated";

const DELAY_PER_LETTER_MS = 20;
const AUTO_FOCUS_DELAY_MS = 600;
const headerText = "De quoi tu veux te souvenir ?";

export const AddReminderTitleView = withMemo(() => {
  const { colors, fonts } = useTheme();
  const inputRef = useRef<TextInput>(null);

  useEffect(() => {
    const t = setTimeout(() => {
      inputRef.current?.focus();
    }, AUTO_FOCUS_DELAY_MS);
    return () => clearTimeout(t);
  }, []);

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
      <View style={styles.contentContainer}>
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
          <TextInput
            ref={inputRef}
            style={[styles.input, { color: colors.text }]}
            placeholder="Titre du rappel"
            placeholderTextColor={colors.gray}
          />
        </Animated.View>
      </View>
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

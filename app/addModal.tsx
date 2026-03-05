import { StyleSheet, TextInput, View } from "react-native";

import { Button } from "@/components/Button";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useTheme } from "@react-navigation/native";
import { useCallback, useEffect, useRef } from "react";
import {
  KeyboardAvoidingView,
  KeyboardStickyView,
} from "react-native-keyboard-controller";
import Animated, { withDelay, withTiming } from "react-native-reanimated";

const headerText = "De quoi tu veux te souvenir ?";
const AUTO_FOCUS_DELAY_MS = 600;

const AddModalScreen = () => {
  const { colors, fonts } = useTheme();
  const inputRef = useRef<TextInput>(null);

  const DELAY_PER_LETTER_MS = 20;

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
    <ThemedView style={styles.container} backgroundColor={colors.primary}>
      <KeyboardAvoidingView
        style={styles.keyboardAvoid}
        behavior="padding"
        keyboardVerticalOffset={0}
      >
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
      <KeyboardStickyView>
        <Button style={[styles.button, { backgroundColor: colors.black }]}>
          <ThemedText weight="bold" size={18} color={colors.background}>
            Suivant
          </ThemedText>
        </Button>
      </KeyboardStickyView>
    </ThemedView>
  );
};

export default AddModalScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 24,
  },
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
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
  input: {
    fontSize: 16,
  },
  inputContainer: {
    width: "100%",
    padding: 16,
    borderRadius: 16,
  },
  button: {
    width: "100%",
    paddingVertical: 16,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 32,
  },
});

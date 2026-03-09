import { AddReminderFormValues } from "@/app/addModal";
import { ReminderDateTimePicker } from "@/components/ReminderDateTimePicker";
import { ThemedText } from "@/components/ThemedText";
import { withMemo } from "@/helpers/withMemo";
import { useTheme } from "@react-navigation/native";
import { Controller, useFormContext } from "react-hook-form";
import { StyleSheet, TextInput, View } from "react-native";
import { KeyboardAvoidingView } from "react-native-keyboard-controller";
import Animated, {
  LinearTransition,
  SlideInRight,
  SlideOutRight,
} from "react-native-reanimated";

const layoutTransition = LinearTransition.springify()
  .damping(18)
  .stiffness(120)
  .duration(320);

export const AddReminderSettingsView = withMemo(
  ({ title }: { title: string }) => {
    const { colors } = useTheme();
    const { control } = useFormContext<AddReminderFormValues>();

    return (
      <KeyboardAvoidingView style={styles.keyboardAvoid} behavior="padding">
        <Animated.View
          layout={layoutTransition}
          entering={SlideInRight.duration(100)}
          exiting={SlideOutRight.duration(100)}
          style={styles.content}
        >
          <ThemedText size={24} weight="heavy" color={colors.background}>
            {title}
          </ThemedText>
          <View
            style={[
              styles.inputContainer,
              { backgroundColor: colors.background },
            ]}
          >
            <Controller
              control={control}
              name="description"
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  style={[styles.input, { color: colors.text }]}
                  placeholder="Entre une description pour ton rappel"
                  placeholderTextColor={colors.gray}
                  value={value ?? ""}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  multiline
                />
              )}
            />
          </View>
          <ReminderDateTimePicker />
        </Animated.View>
      </KeyboardAvoidingView>
    );
  }
);

const styles = StyleSheet.create({
  keyboardAvoid: {
    flex: 1,
    justifyContent: "center",
  },
  content: {
    gap: 16,
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

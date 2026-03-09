import { AddReminderFormValues } from "@/app/addModal";
import { Button } from "@/components/Button";
import { ThemedText } from "@/components/ThemedText";
import { withMemo } from "@/helpers/withMemo";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useTheme } from "@react-navigation/native";
import { format, parseISO } from "date-fns";
import { fr } from "date-fns/locale";
import { useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { Platform, Pressable, StyleSheet, View } from "react-native";
import Animated, {
  FadeIn,
  FadeOut,
  LinearTransition,
} from "react-native-reanimated";

const DATE_FORMAT = "EEEE d MMMM yyyy";
const TIME_FORMAT = "HH:mm";

const layoutTransition = LinearTransition.springify()
  .damping(18)
  .stiffness(120)
  .duration(320);

const ReminderDateTimePickerComponent = () => {
  const { colors } = useTheme();
  const { control } = useFormContext<AddReminderFormValues>();
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);

  return (
    <Controller
      control={control}
      name="date"
      render={({ field: { onChange, value } }) => (
        <Animated.View layout={layoutTransition} style={styles.container}>
          <Animated.View
            layout={layoutTransition}
            style={[
              styles.dateContainer,
              { backgroundColor: colors.background },
            ]}
          >
            <View
              style={[
                styles.inputContainer,
                styles.dateRow,
                { backgroundColor: colors.background },
              ]}
            >
              <Pressable
                onPress={() => {
                  setShowDatePicker(true);
                  setShowTimePicker(false);
                  if (!value) onChange(new Date().toISOString());
                }}
                style={styles.datePressable}
              >
                <ThemedText
                  style={[
                    styles.dateLabel,
                    { color: value ? colors.text : colors.gray },
                  ]}
                >
                  {value
                    ? format(parseISO(value), DATE_FORMAT, { locale: fr })
                    : "Choisir une date (optionnel)"}
                </ThemedText>
              </Pressable>
              {value ? (
                <Pressable
                  onPress={() => onChange("")}
                  hitSlop={8}
                  style={styles.clearButton}
                >
                  <ThemedText size={14} color={colors.gray}>
                    Effacer
                  </ThemedText>
                </Pressable>
              ) : null}
            </View>
            {showDatePicker ? (
              <Animated.View
                entering={FadeIn.duration(300)}
                exiting={FadeOut.duration(240)}
                style={styles.datePickerContainer}
              >
                <DateTimePicker
                  value={value ? parseISO(value) : new Date()}
                  mode="date"
                  display={Platform.OS === "ios" ? "spinner" : "default"}
                  onChange={(_, selectedDate) => {
                    setShowDatePicker(Platform.OS === "ios");
                    if (selectedDate) onChange(selectedDate.toISOString());
                  }}
                />
                <Button
                  onPress={() => setShowDatePicker(false)}
                  style={[styles.closeButton, { borderColor: colors.border }]}
                >
                  <ThemedText size={16}>Fermer</ThemedText>
                </Button>
              </Animated.View>
            ) : null}
          </Animated.View>
          <Animated.View
            layout={layoutTransition}
            style={[
              styles.dateContainer,
              { backgroundColor: colors.background },
            ]}
          >
            <View
              style={[
                styles.inputContainer,
                styles.dateRow,
                { backgroundColor: colors.background },
              ]}
            >
              <Pressable
                onPress={() => {
                  setShowTimePicker(true);
                  setShowDatePicker(false);
                  if (!value) onChange(new Date().toISOString());
                }}
                style={styles.datePressable}
              >
                <ThemedText
                  style={[
                    styles.dateLabel,
                    { color: value ? colors.text : colors.gray },
                  ]}
                >
                  {value
                    ? format(parseISO(value), TIME_FORMAT)
                    : "Choisir une heure (optionnel)"}
                </ThemedText>
              </Pressable>
              {value ? (
                <Pressable
                  onPress={() => {
                    if (value) {
                      const d = parseISO(value);
                      d.setHours(0, 0, 0, 0);
                      onChange(d.toISOString());
                    }
                  }}
                  hitSlop={8}
                  style={styles.clearButton}
                >
                  <ThemedText size={14} color={colors.gray}>
                    Effacer
                  </ThemedText>
                </Pressable>
              ) : null}
            </View>
            {showTimePicker ? (
              <Animated.View
                entering={FadeIn.duration(300)}
                exiting={FadeOut.duration(240)}
                style={styles.datePickerContainer}
              >
                <DateTimePicker
                  value={value ? parseISO(value) : new Date()}
                  mode="time"
                  display={Platform.OS === "ios" ? "spinner" : "default"}
                  onChange={(_, selectedTime) => {
                    setShowTimePicker(Platform.OS === "ios");
                    if (selectedTime) {
                      const base = value ? parseISO(value) : new Date();
                      base.setHours(
                        selectedTime.getHours(),
                        selectedTime.getMinutes(),
                        0,
                        0
                      );
                      onChange(base.toISOString());
                    }
                  }}
                />
                <Button
                  onPress={() => setShowTimePicker(false)}
                  style={[styles.closeButton, { borderColor: colors.border }]}
                >
                  <ThemedText size={16}>Fermer</ThemedText>
                </Button>
              </Animated.View>
            ) : null}
          </Animated.View>
        </Animated.View>
      )}
    />
  );
};

export const ReminderDateTimePicker = withMemo(ReminderDateTimePickerComponent);

const styles = StyleSheet.create({
  container: {
    gap: 16,
  },
  inputContainer: {
    width: "100%",
    padding: 16,
    borderRadius: 16,
  },
  dateContainer: {
    borderRadius: 16,
    overflow: "hidden",
  },
  dateRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  datePressable: {
    flex: 1,
  },
  dateLabel: {
    fontSize: 16,
    textTransform: "capitalize",
  },
  clearButton: {
    paddingVertical: 4,
    paddingLeft: 12,
  },
  datePickerContainer: {
    gap: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  closeButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderWidth: 1,
    borderRadius: 24,
    marginBottom: 16,
  },
});

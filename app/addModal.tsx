import { StyleSheet } from "react-native";

import { AddReminderTitleView } from "@/components/AddReminderTitleView";
import { Button } from "@/components/Button";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useTheme } from "@react-navigation/native";
import { KeyboardStickyView } from "react-native-keyboard-controller";

const AddModalScreen = () => {
  const { colors } = useTheme();

  return (
    <ThemedView style={styles.container} backgroundColor={colors.primary}>
      <AddReminderTitleView />
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
  button: {
    width: "100%",
    paddingVertical: 16,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 32,
  },
});

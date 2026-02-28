import { ThemedText } from "@/components/ThemedText";
import { Stack } from "expo-router";
import { StyleSheet, View } from "react-native";

const NotFoundScreen = () => (
  <>
    <Stack.Screen options={{ title: "Oops!" }} />
    <View style={styles.container}>
      <ThemedText style={styles.title}>
        This screen doesn&apos;t exist.
      </ThemedText>
    </View>
  </>
);

export default NotFoundScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
  linkText: {
    fontSize: 14,
    color: "#2e78b7",
  },
});

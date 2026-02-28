import { StatusBar } from "expo-status-bar";
import { Platform, StyleSheet, View } from "react-native";

import { ThemedText } from "@/components/ThemedText";

const ModalScreen = () => (
  <View style={styles.container}>
    <ThemedText style={styles.title}>Modal</ThemedText>
    <View style={styles.separator} />

    {/* Use a light status bar on iOS to account for the black space above the modal */}
    <StatusBar style={Platform.OS === "ios" ? "light" : "auto"} />
  </View>
);

export default ModalScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});

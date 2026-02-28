import { StyleSheet, View } from "react-native";

import { ThemedText } from "@/components/ThemedText";

const TabTwoScreen = () => (
  <View style={styles.container}>
    <ThemedText style={styles.title}>Tab Two</ThemedText>
    <View style={styles.separator} />
  </View>
);

export default TabTwoScreen;

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

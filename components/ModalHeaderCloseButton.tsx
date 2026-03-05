import { withMemo } from "@/helpers/withMemo";
import { Button } from "@/components/Button";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { useTheme } from "@react-navigation/native";
import { useRouter } from "expo-router";
import { StyleSheet } from "react-native";

export const ModalHeaderCloseButton = withMemo(() => {
  const router = useRouter();
  const { colors } = useTheme();
  return (
    <Button onPress={() => router.back()} style={[styles.button]}>
      <FontAwesome6 name="xmark" size={24} color={colors.primary} />
    </Button>
  );
});

const styles = StyleSheet.create({
  button: {
    paddingLeft: 9,
    marginRight: 8,
  },
});

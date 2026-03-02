import { Button } from "@/components/Button";
import { useTheme } from "@react-navigation/native";
import { useRef, useState } from "react";

import LottieView from "lottie-react-native";
import { StyleSheet } from "react-native";

export const CheckButton = ({ completed }: { completed: boolean }) => {
  const { colors } = useTheme();
  const [isCompleted, setIsCompleted] = useState(true);

  const animationRef = useRef<LottieView>(null);

  return (
    <Button
      onPress={() => {
        if (isCompleted) {
          animationRef.current?.reset();
          setIsCompleted(false);
        } else {
          animationRef.current?.play(16, 88);
        }
      }}
      style={[styles.container, { borderColor: colors.border }]}
    >
      <LottieView
        ref={animationRef}
        source={require("../assets/lottie/successConfetti.json")}
        style={{
          position: "absolute",
          top: -32,
          left: -32,
          width: 100,
          height: 100,
        }}
        progress={isCompleted ? 1 : 0}
        onAnimationFinish={() => {
          animationRef.current?.pause();
          setIsCompleted(true);
        }}
        loop={false}
        duration={1500}
      />
    </Button>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 40,
    height: 40,
    borderRadius: 40,
    borderWidth: 2,
  },
});

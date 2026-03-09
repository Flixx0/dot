import { withMemo } from "@/helpers/withMemo";
import { type StyleProp, type ViewStyle } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

export type CustomButtonProps = {
  onPress?: () => void;
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  disabled?: boolean;
};

export const Button = withMemo(
  ({ onPress, children, style, disabled = false }: CustomButtonProps) => {
    const scale = useSharedValue(1);
    const animatedStyle = useAnimatedStyle(() => ({
      transform: [{ scale: scale.value }],
    }));
    return (
      <Animated.View
        style={[style, animatedStyle]}
        onTouchStart={() => {
          scale.value = withSpring(0.8);
        }}
        onTouchEnd={() => {
          scale.value = withSpring(1);
          !disabled && onPress?.();
        }}
      >
        {children}
      </Animated.View>
    );
  }
);

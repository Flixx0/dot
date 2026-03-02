/**
 * Bouton avec Gesture Handler et animation scale au press (Reanimated).
 */

import { type StyleProp, type ViewStyle } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

const ACTIVE_SCALE = 0.96;
const SPRING_CONFIG = { damping: 15, stiffness: 400 };

export type CustomButtonProps = {
  onPress?: () => void;
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  disabled?: boolean;
};

export const Button = ({
  onPress,
  children,
  style,
  disabled = false,
}: CustomButtonProps) => {
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
};

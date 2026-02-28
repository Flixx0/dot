import { StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { HorizontalCalendar } from "@/components/HorizontalCalendar";
import type { AppThemeColors } from "@/theme";
import { useTheme } from "@react-navigation/native";
import { useCallback, useEffect, useRef } from "react";
import Animated, {
  Easing,
  Extrapolation,
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";

const HomeScreen = () => {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  const scrollRef = useRef<Animated.ScrollView>(null);

  const scrollY = useSharedValue(0);
  const safeAreaTop = useSharedValue(0);
  const isHeaderReduced = useSharedValue(false);

  useEffect(() => {
    safeAreaTop.value = insets.top;
  }, [insets.top, safeAreaTop]);

  const headerStyle = useAnimatedStyle(() => {
    const progress = interpolate(
      scrollY.value,
      [0, 90],
      [0, 1],
      Extrapolation.CLAMP
    );
    const smoothProgress = Easing.inOut(Easing.cubic)(progress);
    const radius = interpolate(
      smoothProgress,
      [0, 1],
      [40, 0],
      Extrapolation.CLAMP
    );
    return {
      height:
        70 +
        safeAreaTop.value +
        interpolate(scrollY.value, [0, 90], [90, 0], {
          extrapolateLeft: Extrapolation.EXTEND,
          extrapolateRight: Extrapolation.CLAMP,
        }),
      borderBottomLeftRadius: radius,
      borderBottomRightRadius: radius,
    };
  });

  const scrollHandler = useAnimatedScrollHandler((event) => {
    scrollY.value = event.contentOffset.y;
    isHeaderReduced.value = event.contentOffset.y >= 90;
  });

  const scrollEndDragHandler = useCallback(() => {
    if (scrollY.value < 90 && scrollY.value > 0) {
      scrollRef.current?.scrollTo({ y: 90, animated: true });
    }
  }, [scrollRef, scrollY]);

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: (colors as AppThemeColors).black },
      ]}
    >
      <Animated.View
        style={[
          {
            backgroundColor: colors.primary,
            paddingTop: insets.top,
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            zIndex: 1000,
            overflow: "hidden",
          },
          headerStyle,
        ]}
      >
        <HorizontalCalendar
          selectedDate={new Date()}
          isHeaderReduced={isHeaderReduced}
        />
      </Animated.View>
      <Animated.ScrollView
        ref={scrollRef}
        onScroll={scrollHandler}
        scrollEventThrottle={16}
        onScrollEndDrag={scrollEndDragHandler}
        style={{ flex: 1, gap: 50, paddingTop: 200 + insets.top }}
      >
        {[1, 2, 3, 4].map((item) => (
          <View
            key={item}
            style={{
              backgroundColor: colors.card,
              height: 100,
              marginBottom: 500,
            }}
          ></View>
        ))}
      </Animated.ScrollView>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    height: 100,
  },
});

import { FlatList, StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { HorizontalCalendar } from "@/components/HorizontalCalendar";
import { RemiderRow, Reminder } from "@/components/RemiderRow";
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

const reminderList: Reminder[] = [
  {
    id: 1,
    title: "Reminder 1",
    description: "Description 1",
    date: new Date().toISOString(),
    duration: 30,
  },
  {
    id: 2,
    title: "Reminder 2",
    description: "Description 2",
    date: new Date().toISOString(),
  },
  {
    id: 3,
    title: "Reminder 3",
    description: "Description 3",
    date: new Date().toISOString(),
  },
  {
    id: 4,
    title: "Reminder 4",
    description: "Description 4",
    date: new Date().toISOString(),
  },
  {
    id: 5,
    title: "Reminder 5",
    description: "Description 5",
    date: new Date().toISOString(),
  },

  {
    id: 6,
    title: "Reminder 6",
    description: "Description 6",
    date: new Date().toISOString(),
  },
  {
    id: 7,
    title: "Reminder 7",
    description: "Description 7",
    date: new Date().toISOString(),
  },
  {
    id: 8,
    title: "Reminder 8",
    description: "Description 8",
    date: new Date().toISOString(),
    location: {
      latitude: 48.8566,
      longitude: 2.3522,
      address: "Paris, France",
      radiusMeters: 100,
    },
  },
];

const HomeScreen = () => {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  const scrollRef = useRef<FlatList<Reminder>>(null);

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

  const scrollEndDragHandler = useCallback(
    (event: { nativeEvent: { contentOffset: { y: number } } }) => {
      const y = event.nativeEvent.contentOffset.y;
      if (y >= 90 / 2 && y > 0 && y <= 90) {
        scrollRef.current?.scrollToOffset({ offset: 90, animated: true });
      } else if (y < 90 / 2 && y > 0) {
        scrollRef.current?.scrollToOffset({ offset: 0, animated: true });
      }
    },
    [scrollRef]
  );

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
      <Animated.FlatList<Reminder>
        ref={scrollRef}
        data={reminderList}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <RemiderRow reminder={item} />}
        onScroll={scrollHandler}
        scrollEventThrottle={16}
        onScrollEndDrag={scrollEndDragHandler}
        style={styles.list}
        contentContainerStyle={[
          styles.listContent,
          { paddingTop: 200 + insets.top },
        ]}
      />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  list: {
    flex: 1,
  },
  listContent: {
    gap: 8,
    paddingBottom: 100,
  },
  item: {
    height: 100,
  },
});

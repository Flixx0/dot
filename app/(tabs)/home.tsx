import { FlatList, StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { Button } from "@/components/Button";
import { HorizontalCalendar } from "@/components/HorizontalCalendar";
import { RemiderRow, Reminder } from "@/components/RemiderRow";
import { useReminders } from "@/contexts/RemindersContext";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { useTheme } from "@react-navigation/native";
import { isSameDay } from "date-fns";
import { useRouter } from "expo-router";
import { useCallback, useEffect, useRef, useState } from "react";
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
  const { reminders } = useReminders();
  const router = useRouter();
  const [selectedDate, setSelectedDate] = useState(new Date());

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

  const onScrollAnimationEnd = useCallback(
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
    <View style={[styles.container, { backgroundColor: colors.black }]}>
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
          selectedDate={selectedDate}
          onDateSelect={setSelectedDate}
          isHeaderReduced={isHeaderReduced}
        />
      </Animated.View>
      <Animated.FlatList<Reminder>
        ref={scrollRef}
        data={reminders.filter(
          (reminder) =>
            !reminder.date || isSameDay(new Date(reminder.date), selectedDate)
        )}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <RemiderRow reminder={item} />}
        onScroll={scrollHandler}
        scrollEventThrottle={16}
        onMomentumScrollEnd={onScrollAnimationEnd}
        style={styles.list}
        contentContainerStyle={[
          styles.listContent,
          { paddingTop: 200 + insets.top },
        ]}
      />
      <View style={styles.newButtonContainer}>
        <Button
          onPress={() => {
            router.push("/addModal");
          }}
          style={[styles.newButton, { backgroundColor: colors.primary }]}
        >
          <FontAwesome6 name="plus" size={24} color={colors.background} />
        </Button>
      </View>
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
  newButton: {
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderRadius: 100,
    elevation: 10,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  newButtonContainer: {
    position: "absolute",
    bottom: 50,
    left: 0,
    right: 0,
    flex: 1,
    justifyContent: "center",
    alignItems: "flex-end",
    paddingHorizontal: 20,
  },
});

/**
 * Horizontal calendar : une semaine à la fois, scroll infini, snap par semaine.
 */

import { withMemo } from "@/helpers/withMemo";
import { useTheme } from "@react-navigation/native";
import {
  addDays,
  addWeeks,
  format,
  isSameDay,
  parseISO,
  startOfDay,
  startOfISOWeek,
} from "date-fns";
import { fr } from "date-fns/locale";
import { useCallback, useMemo, useRef, useState } from "react";
import {
  Dimensions,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  View,
  type ViewToken,
} from "react-native";
import type { SharedValue } from "react-native-reanimated";
import Animated, {
  LinearTransition,
  runOnJS,
  SlideInLeft,
  useAnimatedReaction,
} from "react-native-reanimated";
import { ThemedText } from "./ThemedText";

const DATE_KEY_FORMAT = "yyyy-MM-dd";
const NUM_WEEKS_BACK = 52;
const NUM_WEEKS_FORWARD = 52;
const TOTAL_WEEKS = NUM_WEEKS_BACK + NUM_WEEKS_FORWARD + 1;
const CURRENT_WEEK_INDEX = NUM_WEEKS_BACK;

const { width: SCREEN_WIDTH } = Dimensions.get("window");
const WEEK_WIDTH = SCREEN_WIDTH;
const DAY_GAP = 10;

type HorizontalCalendarProps = {
  /** Date sélectionnée (timestamp ou string YYYY-MM-DD) */
  selectedDate?: Date | string | number;
  /** Appelé au clic sur un jour */
  onDateSelect?: (date: Date) => void;
  /** Header réduit (ex. après scroll) – SharedValue pour usage dans des worklets */
  isHeaderReduced?: SharedValue<boolean>;
};

const toDateKey = (d: Date) => format(d, DATE_KEY_FORMAT);

function toNormalizedDate(v: Date | string | number): Date {
  if (typeof v === "string") return parseISO(v);
  if (typeof v === "number") return new Date(v);
  return v;
}

const parseSelected = (
  v: Date | string | number | undefined
): string | null => {
  if (v == null) return null;
  return toDateKey(toNormalizedDate(v));
};

function getWeekStart(weekIndex: number): Date {
  const today = startOfDay(new Date());
  const thisWeekStart = startOfISOWeek(today);
  const offset = weekIndex - CURRENT_WEEK_INDEX;
  return addWeeks(thisWeekStart, offset);
}

function getWeekDates(weekIndex: number): Date[] {
  const start = getWeekStart(weekIndex);
  const dates: Date[] = [];
  for (let i = 0; i < 7; i++) {
    dates.push(addDays(start, i));
  }
  return dates;
}

function getMonthLabel(weekIndex: number): string {
  const weekStart = getWeekStart(weekIndex);
  return format(weekStart, "MMMM yyyy", { locale: fr });
}

export const HorizontalCalendar = withMemo(
  ({
    selectedDate,
    onDateSelect,
    isHeaderReduced,
  }: HorizontalCalendarProps) => {
    const { colors } = useTheme();
    const selectedKey = parseSelected(selectedDate);
    const today = useMemo(() => startOfDay(new Date()), []);
    const [visibleWeekIndex, setVisibleWeekIndex] =
      useState(CURRENT_WEEK_INDEX);
    const [isHeaderReducedState, setIsHeaderReducedState] = useState(false);

    useAnimatedReaction(
      () => isHeaderReduced?.value ?? false,
      (reduced) => {
        runOnJS(setIsHeaderReducedState)(reduced);
      },
      [isHeaderReduced]
    );

    const onViewableItemsChanged = useRef(
      ({ viewableItems }: { viewableItems: ViewToken[] }) => {
        const first = viewableItems[0];
        if (first?.index != null) {
          setVisibleWeekIndex(first.index);
        }
      }
    ).current;

    const viewabilityConfig = useRef({
      itemVisiblePercentThreshold: 50,
    }).current;

    const weekIndices = useMemo(
      () => Array.from({ length: TOTAL_WEEKS }, (_, i) => i),
      []
    );

    const renderWeek = useCallback(
      ({ item }: { item: number }) => {
        const dates = getWeekDates(item);
        return (
          <View style={[styles.weekRow, { width: WEEK_WIDTH }]}>
            {dates.map((date) => {
              const key = toDateKey(date);
              const isSelected = key === selectedKey;
              const isToday = isSameDay(date, today);

              return (
                <TouchableOpacity
                  key={key}
                  onPress={() => onDateSelect?.(date)}
                  activeOpacity={0.7}
                  style={[
                    styles.dayCard,
                    {
                      backgroundColor: isSelected ? colors.card : undefined,
                      borderColor:
                        isToday && !isSelected ? colors.card : "transparent",
                    },
                  ]}
                >
                  <ThemedText
                    size={12}
                    weight="medium"
                    style={{
                      color: isSelected ? colors.text : colors.background,
                    }}
                  >
                    {format(date, "EEE", { locale: fr })}
                  </ThemedText>
                  <ThemedText
                    size={18}
                    weight="bold"
                    style={{
                      color: isSelected ? colors.text : colors.background,
                    }}
                  >
                    {format(date, "d")}
                  </ThemedText>
                </TouchableOpacity>
              );
            })}
          </View>
        );
      },
      [colors, selectedKey, today, onDateSelect]
    );

    const getItemLayout = useCallback(
      (_: unknown, index: number) => ({
        length: WEEK_WIDTH,
        offset: WEEK_WIDTH * index,
        index,
      }),
      []
    );

    const monthLabel = useMemo(
      () => getMonthLabel(visibleWeekIndex),
      [visibleWeekIndex]
    );

    const selectedDateObj =
      selectedDate == null ? null : toNormalizedDate(selectedDate);

    const dayLabel = useMemo(
      () =>
        selectedDateObj
          ? format(selectedDateObj, "EEEE d", { locale: fr })
          : "",
      [selectedDateObj]
    );

    return (
      <View style={styles.wrapper}>
        <View style={styles.headerRow}>
          {isHeaderReducedState && dayLabel ? (
            <Animated.Text
              entering={SlideInLeft.duration(400)}
              layout={LinearTransition.springify()}
              style={[styles.dayLabel, { color: colors.background }]}
            >
              {dayLabel}
            </Animated.Text>
          ) : null}
          <Animated.Text
            layout={LinearTransition.springify()}
            style={[styles.monthLabel, { color: colors.background }]}
          >
            {monthLabel}
          </Animated.Text>
        </View>
        <FlatList
          data={weekIndices}
          keyExtractor={(item) => `week-${item}`}
          renderItem={renderWeek}
          onViewableItemsChanged={onViewableItemsChanged}
          viewabilityConfig={viewabilityConfig}
          horizontal
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          snapToInterval={WEEK_WIDTH}
          snapToAlignment="start"
          decelerationRate="fast"
          initialScrollIndex={CURRENT_WEEK_INDEX}
          getItemLayout={getItemLayout}
          contentContainerStyle={styles.container}
        />
      </View>
    );
  }
);

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "space-between",
    gap: 12,
  },
  headerRow: {
    flexDirection: "row",
    paddingHorizontal: 16,
    alignItems: "flex-start",
    gap: 12,
  },
  dayLabel: {
    textTransform: "capitalize",
    fontSize: 32,
    fontWeight: "800",
    fontFamily: "Nunito_800ExtraBold",
    paddingTop: 8,
    paddingBottom: 4,
  },
  monthLabel: {
    textTransform: "capitalize",
    fontSize: 32,
    fontWeight: "800",
    fontFamily: "Nunito_800ExtraBold",
    paddingTop: 8,
    paddingBottom: 4,
  },
  container: {
    paddingVertical: 12,
  },
  weekRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "stretch",
    paddingHorizontal: 16,
    gap: DAY_GAP,
  },
  dayCard: {
    display: "flex",
    flexDirection: "column",
    minWidth: 0,
    padding: 6,
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 2,
    height: 70,
  },
});

import {
  type BottomTabBarProps,
  BottomTabBarHeightCallbackContext,
} from "@react-navigation/bottom-tabs";
import { useCallback, useContext } from "react";
import {
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { useColorScheme } from "@/components/useColorScheme";
import Colors from "@/constants/Colors";

export const FloatingTabBar = (
  props: Readonly<BottomTabBarProps>
) => {
  const { state, descriptors, navigation } = props;
  const insets = useSafeAreaInsets();
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? "light"];
  const reportHeight = useContext(BottomTabBarHeightCallbackContext);

  const handleLayout = useCallback(
    (e: { nativeEvent: { layout: { height: number } } }) => {
      reportHeight?.(e.nativeEvent.layout.height);
    },
    [reportHeight]
  );

  return (
    <View
      onLayout={handleLayout}
      style={[
        styles.wrapper,
        { paddingBottom: Math.max(insets.bottom, 12), paddingHorizontal: 20 },
      ]}
      pointerEvents="box-none"
    >
      <View
        style={[
          styles.container,
          {
            backgroundColor:
              colorScheme === "dark"
                ? "rgba(40, 40, 40, 0.95)"
                : "rgba(255, 255, 255, 0.92)",
            shadowColor: "#000",
          },
        ]}
      >
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];
          const isFocused = state.index === index;
          const color = isFocused ? colors.tint : colors.tabIconDefault;
          const labelOption =
            options.tabBarLabel ?? options.title ?? route.name;
          const label =
            typeof labelOption === "function"
              ? labelOption({
                  focused: isFocused,
                  color,
                  position: "below-icon",
                  children: route.name,
                })
              : labelOption;
          const tabBarIcon = options.tabBarIcon;

          const onPress = () => {
            const event = navigation.emit({
              type: "tabPress",
              target: route.key,
              canPreventDefault: true,
            });
            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name, route.params);
            }
          };

          const onLongPress = () => {
            navigation.emit({
              type: "tabLongPress",
              target: route.key,
            });
          };

          return (
            <Pressable
              key={route.key}
              accessibilityRole="button"
              accessibilityState={isFocused ? { selected: true } : {}}
              accessibilityLabel={
                options.tabBarAccessibilityLabel ??
                (typeof label === "string" ? label : route.name)
              }
              testID={options.tabBarButtonTestID}
              onPress={onPress}
              onLongPress={onLongPress}
              style={styles.tab}
            >
              {tabBarIcon?.({
                focused: isFocused,
                color,
                size: 24,
              })}
              {typeof label === "string" ? (
                <Text
                  style={[
                    styles.label,
                    { color },
                    isFocused && styles.labelFocused,
                  ]}
                  numberOfLines={1}
                >
                  {label}
                </Text>
              ) : (
                label
              )}
            </Pressable>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    alignItems: "center",
  },
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderRadius: 28,
    minHeight: 56,
    ...Platform.select({
      android: {
        elevation: 8,
      },
      default: {
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 12,
      },
    }),
  },
  tab: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 4,
  },
  label: {
    fontSize: 12,
  },
  labelFocused: {
    fontWeight: "600",
  },
});

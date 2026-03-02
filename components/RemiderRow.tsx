import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { useTheme } from "@react-navigation/native";
import { format } from "date-fns";
import { useMemo } from "react";
import { StyleSheet, View } from "react-native";

/** Localisation pour un rappel (géolocalisation / geofencing) */
export type ReminderLocation = {
  latitude: number;
  longitude: number;
  /** Adresse ou nom du lieu (affichage) */
  address?: string;
  /** Rayon en mètres pour déclencher le rappel (geofence). Ex: 100 */
  radiusMeters?: number;
};

export type Reminder = {
  id: number;
  title: string;
  description?: string;
  /** Optionnel : si absent, rappel déclenché à l'arrivée au lieu (location). */
  date?: string;
  duration?: number; // in minutes
  /** Localisation optionnelle : coordonnées + adresse + rayon pour rappel à l’arrivée */
  location?: ReminderLocation;
  recurring?: boolean;
};

export const RemiderRow = ({ reminder }: { reminder: Reminder }) => {
  const { colors } = useTheme();

  const timeLabel = useMemo(() => {
    if (reminder.date) {
      const startDate = new Date(reminder.date);
      const endDate = new Date(reminder.date);
      endDate.setMinutes(endDate.getMinutes() + (reminder.duration || 0));

      return (
        <>
          <ThemedText>{format(startDate, "HH:mm")}</ThemedText>
          {reminder.duration && endDate ? (
            <ThemedText>{`- ${format(endDate, "HH:mm")}`}</ThemedText>
          ) : null}
        </>
      );
    } else if (reminder.location) {
      return <ThemedText>{`À l'arrivée`}</ThemedText>;
    }
    return null;
  }, [reminder.date, reminder.duration, reminder.location]);

  return (
    <ThemedView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.timeContainer}>{timeLabel}</View>
        <ThemedText size={18} weight="extraBold">
          {reminder.title}
        </ThemedText>
        <ThemedView style={styles.tags}>
          {reminder.location?.address ? (
            <ThemedView
              style={[styles.tag, { backgroundColor: colors.notification }]}
            >
              <FontAwesome6
                name="location-dot"
                size={16}
                color={colors.background}
              />
              <ThemedText style={{ color: colors.background }}>
                {reminder.location?.address}
              </ThemedText>
            </ThemedView>
          ) : null}
        </ThemedView>
      </View>
      <View style={[styles.actions, { borderColor: colors.border }]}></View>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    borderRadius: 16,
    gap: 16,
  },
  content: {
    flex: 1,
    gap: 8,
  },
  timeContainer: {
    flexDirection: "row",
    gap: 8,
  },
  tags: {
    flexDirection: "row",
    gap: 8,
  },
  tag: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 16,
    flexDirection: "row",
    gap: 8,
    alignItems: "center",
  },
  actions: {
    padding: 2,
    borderRadius: 40,
    borderWidth: 2,
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
});

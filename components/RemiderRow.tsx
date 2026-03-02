import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { format } from "date-fns";
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
  date: string;
  duration?: number; // in minutes
  /** Localisation optionnelle : coordonnées + adresse + rayon pour rappel à l’arrivée */
  location?: ReminderLocation;
  recurring?: boolean;
};

export const RemiderRow = ({ reminder }: { reminder: Reminder }) => {
  const startDate = new Date(reminder.date);
  const endDate = new Date(reminder.date);
  endDate.setMinutes(endDate.getMinutes() + (reminder.duration || 0));

  return (
    <ThemedView style={styles.container}>
      <View style={styles.timeContainer}>
        <ThemedText>{format(startDate, "HH:mm")}</ThemedText>
        {reminder.duration ? (
          <ThemedText>{`- ${format(endDate, "HH:mm")}`}</ThemedText>
        ) : null}
      </View>
      <ThemedText size={18} weight="extraBold">
        {reminder.title}
      </ThemedText>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    borderRadius: 16,
  },
  timeContainer: {
    flexDirection: "row",
    gap: 8,
  },
});

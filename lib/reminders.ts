import type { Reminder } from "@/components/RemiderRow";
import { storage } from "@/lib/storage";

const REMINDERS_KEY = "reminders";

/** Rappels initiaux au premier lancement (liste vide sinon). */
const INITIAL_REMINDERS: Reminder[] = [
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

function parseReminders(raw: string | undefined): Reminder[] {
  if (!raw) return [];
  try {
    const data = JSON.parse(raw) as unknown;
    return Array.isArray(data) ? data : [];
  } catch {
    return [];
  }
}

/** Charge tous les rappels depuis le stockage. */
export function getReminders(): Reminder[] {
  return parseReminders(storage.getString(REMINDERS_KEY));
}

/** Écrit la liste complète des rappels (utilisé en interne ou pour reset). */
export function setReminders(reminders: Reminder[]): void {
  storage.set(REMINDERS_KEY, JSON.stringify(reminders));
}

/** Génère un id unique (max existant + 1, ou 1 si vide). */
function nextId(reminders: Reminder[]): number {
  if (reminders.length === 0) return 1;
  return Math.max(...reminders.map((r) => r.id), 0) + 1;
}

/** Ajoute un rappel et le persiste. Retourne le rappel avec son id. */
export function addReminder(reminder: Omit<Reminder, "id">): Reminder {
  const list = getReminders();
  const newReminder: Reminder = { ...reminder, id: nextId(list) };
  setReminders([...list, newReminder]);
  return newReminder;
}

/** Supprime un rappel par id. */
export function deleteReminder(id: number): void {
  const list = getReminders().filter((r) => r.id !== id);
  setReminders(list);
}

/** Met à jour un rappel existant (patch partiel). */
export function updateReminder(
  id: number,
  patch: Partial<Omit<Reminder, "id">>
): Reminder | null {
  const list = getReminders();
  const index = list.findIndex((r) => r.id === id);
  if (index === -1) return null;
  const updated: Reminder = { ...list[index], ...patch, id };
  const newList = [...list];
  newList[index] = updated;
  setReminders(newList);
  return updated;
}

/** Remplit le stockage avec des rappels initiaux si la liste est vide (à appeler une fois au démarrage). */
export function seedRemindersIfEmpty(): void {
  if (getReminders().length === 0) {
    setReminders(INITIAL_REMINDERS);
  }
}

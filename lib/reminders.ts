import type { Reminder } from "@/components/RemiderRow";
import { storage } from "@/lib/storage";

const REMINDERS_KEY = "reminders";

function at(dayOffset: number, hour: number, minute: number): string {
  const d = new Date();
  d.setDate(d.getDate() + dayOffset);
  d.setHours(hour, minute, 0, 0);
  return d.toISOString();
}

const INITIAL_REMINDERS: Reminder[] = [
  {
    id: 1,
    title: "Réveil",
    description: "Démarrage de journée",
    date: at(0, 7, 0),
    duration: 0,
    recurring: true,
  },
  {
    id: 2,
    title: "Stand-up équipe",
    description: "Point quotidien 15 min",
    date: at(0, 9, 30),
    duration: 15,
  },
  {
    id: 3,
    title: "Pause déjeuner",
    date: at(0, 12, 0),
    duration: 60,
  },
  {
    id: 4,
    title: "Rendez-vous médecin",
    description: "Centre médical",
    date: at(0, 14, 0),
    duration: 45,
    location: {
      latitude: 48.8566,
      longitude: 2.3522,
      address: "Paris, Centre",
      radiusMeters: 150,
    },
  },
  {
    id: 5,
    title: "Sport",
    date: at(0, 18, 0),
    duration: 90,
  },
  {
    id: 6,
    title: "Course supermarché",
    date: at(1, 10, 0),
    duration: 45,
    location: {
      latitude: 48.872,
      longitude: 2.348,
      address: "Supermarché, Paris",
      radiusMeters: 100,
    },
  },
  {
    id: 7,
    title: "Réunion client",
    description: "Présentation Q4",
    date: at(1, 15, 0),
    duration: 120,
  },
  {
    id: 8,
    title: "Anniversaire Paul",
    date: at(2, 19, 0),
    duration: 0,
  },
  {
    id: 9,
    title: "Dentiste",
    date: at(-1, 11, 0),
    duration: 30,
  },
  {
    id: 10,
    title: "Lecture",
    description: "30 min par jour",
    date: at(0, 21, 0),
    duration: 30,
    recurring: true,
  },
  {
    id: 11,
    title: "Acheter du pain",
    description: "Rappel à l'arrivée à la boulangerie",
    location: {
      latitude: 48.8584,
      longitude: 2.2945,
      address: "Boulangerie, Paris",
      radiusMeters: 80,
    },
  },
  {
    id: 12,
    title: "Récupérer colis",
    location: {
      latitude: 48.8611,
      longitude: 2.3358,
      address: "Point relais, Paris",
      radiusMeters: 120,
    },
  },
  {
    id: 13,
    title: "Passer à la pharmacie",
    description: "Ordonnance",
    location: {
      latitude: 48.8498,
      longitude: 2.3522,
      address: "Pharmacie du centre",
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

/** Vide tous les rappels. Penser à appeler refreshReminders() dans le contexte après. */
export function clearReminders(): void {
  setReminders([]);
}

/** Réinitialise les rappels avec la liste initiale (seed). Penser à appeler refreshReminders() après. */
export function resetReminders(): void {
  setReminders([]);
  seedRemindersIfEmpty();
}

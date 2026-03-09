import type { Reminder } from "@/components/RemiderRow";
import {
  addReminder as addReminderRepo,
  clearReminders as clearRemindersRepo,
  deleteReminder as deleteReminderRepo,
  getReminders,
  resetReminders as resetRemindersRepo,
  seedRemindersIfEmpty,
  updateReminder as updateReminderRepo,
} from "@/lib/reminders";
import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";

type RemindersContextValue = {
  reminders: Reminder[];
  addReminder: (reminder: Omit<Reminder, "id">) => Reminder;
  deleteReminder: (id: number) => void;
  updateReminder: (
    id: number,
    patch: Partial<Omit<Reminder, "id">>
  ) => Reminder | null;
  refreshReminders: () => void;
  clearReminders: () => void;
  resetReminders: () => void;
};

const RemindersContext = createContext<RemindersContextValue | null>(null);

export const RemindersProvider = ({
  children,
}: Readonly<{ children: React.ReactNode }>) => {
  const [reminders, setReminders] = useState<Reminder[]>(() => {
    seedRemindersIfEmpty();
    return getReminders();
  });

  const refreshReminders = useCallback(() => {
    setReminders(getReminders());
  }, []);

  const addReminder = useCallback((reminder: Omit<Reminder, "id">) => {
    const added = addReminderRepo(reminder);
    setReminders(getReminders());
    return added;
  }, []);

  const deleteReminder = useCallback((id: number) => {
    deleteReminderRepo(id);
    setReminders(getReminders());
  }, []);

  const updateReminder = useCallback(
    (id: number, patch: Partial<Omit<Reminder, "id">>) => {
      const updated = updateReminderRepo(id, patch);
      if (updated) setReminders(getReminders());
      return updated;
    },
    []
  );

  const clearReminders = useCallback(() => {
    clearRemindersRepo();
    setReminders(getReminders());
  }, []);

  const resetReminders = useCallback(() => {
    resetRemindersRepo();
    setReminders(getReminders());
  }, []);

  const value = useMemo<RemindersContextValue>(
    () => ({
      reminders,
      addReminder,
      deleteReminder,
      updateReminder,
      refreshReminders,
      clearReminders,
      resetReminders,
    }),
    [
      reminders,
      addReminder,
      deleteReminder,
      updateReminder,
      refreshReminders,
      clearReminders,
      resetReminders,
    ]
  );

  return (
    <RemindersContext.Provider value={value}>
      {children}
    </RemindersContext.Provider>
  );
};

export const useReminders = (): RemindersContextValue => {
  const ctx = useContext(RemindersContext);
  if (!ctx) {
    throw new Error("useReminders must be used within RemindersProvider");
  }
  return ctx;
};

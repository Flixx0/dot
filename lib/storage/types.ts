/**
 * Abstraction du stockage clé-valeur.
 * Implémentation actuelle : MMKV. Plus tard : DB (SQLite, etc.).
 */
export interface IStorage {
  getString(key: string): string | undefined;
  set(key: string, value: string): void;
  remove(key: string): void;
  contains(key: string): boolean;
}

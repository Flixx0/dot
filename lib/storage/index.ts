export type { IStorage } from "./types";
export { mmkvStorage } from "./mmkvStorage";

/** Instance utilisée par l’app. Remplacer par un adapteur DB plus tard. */
export { mmkvStorage as storage } from "./mmkvStorage";

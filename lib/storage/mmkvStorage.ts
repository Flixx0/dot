import { createMMKV } from "react-native-mmkv";

import type { IStorage } from "./types";

const mmkv = createMMKV({ id: "dot-storage" });

export const mmkvStorage: IStorage = {
  getString: (key: string) => mmkv.getString(key),
  set: (key: string, value: string) => mmkv.set(key, value),
  remove: (key: string) => {
    mmkv.remove(key);
  },
  contains: (key: string) => mmkv.contains(key),
};

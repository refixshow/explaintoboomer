import { StorageKeys } from "@/shared/constants/storage-keys";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const storage = {
  getItem: async <T = unknown>(key: StorageKeys): Promise<T | null> => {
    const raw = await AsyncStorage.getItem(key);

    if (!raw) {
      return null;
    }

    return JSON.parse(raw) as T;
  },
  setItem: async (key: StorageKeys, data: unknown) => {
    await AsyncStorage.setItem(key, JSON.stringify(data));
  },
  clear: async () => {
    AsyncStorage.removeItem(StorageKeys.memes);
    AsyncStorage.removeItem(StorageKeys.phrases);
  },
};

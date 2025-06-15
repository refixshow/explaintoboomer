import { openai } from "@/libs/openai";
import { storage } from "@/libs/storage";
import { StorageKeys } from "@/shared/constants/storage-keys";
import { Phrase } from "./types";

export const PhrasesService = {
  getAllPhrases: () => storage.getItem<Phrase[]>(StorageKeys.phrases),
  getPhraseByTimestamp: async (timestamp: number) => {
    const history = await storage.getItem<Phrase[]>(StorageKeys.phrases);

    return history?.find((p) => p.timestamp === timestamp) ?? null;
  },
  explainPhrase: async (phrase: string) => {
    if (!phrase || phrase.length < 5) {
      throw new Error("Fraza nie spełnia wymagań! Musi mieć minimum 5 znaków!");
    }

    const explanation = await openai.explainPhrase(phrase);

    const history =
      (await storage.getItem<Phrase[]>(StorageKeys.phrases)) || [];

    const updated: Phrase[] = [
      {
        phrase,
        explanation,
        timestamp: Date.now(),
      },
      ...history,
    ];

    await storage.setItem(StorageKeys.phrases, updated);

    return explanation;
  },
  removePhrase: async (timestamp: number) => {
    const history =
      (await storage.getItem<Phrase[]>(StorageKeys.phrases)) || [];

    const updated = history.filter(
      (entry: { timestamp: number }) => entry.timestamp !== timestamp
    );

    await storage.setItem(StorageKeys.phrases, updated);

    return updated;
  },
};

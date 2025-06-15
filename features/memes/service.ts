import { openai } from "@/libs/openai";
import { storage } from "@/libs/storage";
import { StorageKeys } from "@/shared/constants/storage-keys";
import { ExplainMemeInput, Meme } from "./types";

export const MemesService = {
  getAllMemes: () => storage.getItem<Meme[]>(StorageKeys.memes),
  getMemeByTimestamp: async (timestamp: number) => {
    const storedMeme = await storage.getItem<Meme[]>(StorageKeys.memes);

    return storedMeme?.find((m) => m.timestamp === timestamp) ?? null;
  },
  explainMeme: async ({ base64, imageUri }: ExplainMemeInput) => {
    const explanation = await openai.explainMeme(base64);

    const memes = (await storage.getItem<Meme[]>(StorageKeys.memes)) || [];

    const updated: Meme[] = [
      { imageUri, explanation, timestamp: Date.now() },
      ...memes,
    ];

    await storage.setItem(StorageKeys.memes, updated);

    return explanation;
  },
  removeMeme: async (timestamp: number) => {
    const memes = (await storage.getItem<Meme[]>(StorageKeys.memes)) || [];

    const updated = memes.filter((m) => m.timestamp !== timestamp);

    await storage.setItem(StorageKeys.memes, updated);

    return updated;
  },
};

import { client } from "@/libs/openai";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

type ExplainMemeInput = {
  base64: string;
  imageUri: string;
};

type MemeEntry = {
  imageUri: string;
  explanation: string;
  timestamp: number;
};

const STORAGE_KEY = "meme_history";

export const useMemeList = () =>
  useQuery({
    queryKey: ["memes"],
    queryFn: async () => {
      const raw = await AsyncStorage.getItem(STORAGE_KEY);
      return raw ? (JSON.parse(raw) as MemeEntry[]) : ([] as MemeEntry[]);
    },
  });

export const useMemeByTimestamp = (timestamp: number) =>
  useQuery({
    queryKey: ["memes", timestamp],
    queryFn: async (): Promise<MemeEntry | null> => {
      const raw = await AsyncStorage.getItem(STORAGE_KEY);
      const parsed: MemeEntry[] = raw ? JSON.parse(raw) : [];
      return parsed.find((m) => m.timestamp === timestamp) ?? null;
    },
    enabled: !!timestamp,
  });

export const useExplainMeme = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ base64, imageUri }: ExplainMemeInput) => {
      const completion = await client.chat.completions.create({
        model: "gpt-4o",
        messages: [
          {
            role: "system",
            content:
              "Jesteś asystentem, który tłumaczy slang i memy starszym osobom w prosty, zabawny sposób. Pamiętaj żeby mówić jak najmniej, najlepiej max do 2-3 zdań.",
          },
          {
            role: "user",
            content: [
              {
                type: "image_url",
                image_url: {
                  url: `data:image/jpeg;base64,${base64}`,
                },
              },
              {
                type: "text",
                text: "Wytłumacz tego mema jak boomerowi.",
              },
            ],
          },
        ],
      });

      const explanation = completion.choices[0].message.content ?? "";

      // Inline history saving
      const raw = await AsyncStorage.getItem(STORAGE_KEY);
      const current: MemeEntry[] = raw ? JSON.parse(raw) : [];
      const updated: MemeEntry[] = [
        { imageUri, explanation, timestamp: Date.now() },
        ...current,
      ];
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updated));

      return explanation;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["memes"],
      });
    },
  });
};

export const useRemoveMeme = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (timestamp: number) => {
      const raw = await AsyncStorage.getItem(STORAGE_KEY);
      const parsed = raw ? JSON.parse(raw) : [];

      const updated = parsed.filter(
        (m: { timestamp: number }) => m.timestamp !== timestamp
      );

      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["memes"] });
    },
  });
};

export function useMemeEntry(timestamp: number) {
  return useQuery<MemeEntry | null>({
    queryKey: ["memes", timestamp],
    queryFn: async () => {
      const raw = await AsyncStorage.getItem(STORAGE_KEY);
      const all: MemeEntry[] = raw ? JSON.parse(raw) : [];
      return all.find((m) => m.timestamp === timestamp) ?? null;
    },
    enabled: !isNaN(timestamp),
  });
}

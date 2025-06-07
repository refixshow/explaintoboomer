import { client } from "@/libs/openai";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

type PhraseEntry = {
  phrase: string;
  explanation: string;
  timestamp: number;
};

const STORAGE_KEY = "phrase_history";

export const usePhraseList = () =>
  useQuery({
    queryKey: ["phrases"],
    queryFn: async (): Promise<PhraseEntry[]> => {
      const raw = await AsyncStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : [];
    },
  });

export const useExplainText = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (phrase: string) => {
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
                type: "text",
                text: phrase,
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

      // zapis do lokalnego cache
      const raw = await AsyncStorage.getItem(STORAGE_KEY);
      const history: PhraseEntry[] = raw ? JSON.parse(raw) : [];

      const updated: PhraseEntry[] = [
        {
          phrase,
          explanation,
          timestamp: Date.now(),
        },
        ...history,
      ];

      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updated));

      return explanation;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["phrases"] });
    },
  });
};

export const useRemovePhrase = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (timestamp: number) => {
      const raw = await AsyncStorage.getItem(STORAGE_KEY);
      const current = raw ? JSON.parse(raw) : [];

      const updated = current.filter(
        (entry: { timestamp: number }) => entry.timestamp !== timestamp
      );

      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["phrases"] });
    },
  });
};

export function usePhraseEntry(timestamp: number) {
  return useQuery<PhraseEntry | null>({
    queryKey: ["phrases", timestamp],
    queryFn: async () => {
      const raw = await AsyncStorage.getItem(STORAGE_KEY);
      const all: PhraseEntry[] = raw ? JSON.parse(raw) : [];
      return all.find((p) => p.timestamp === timestamp) ?? null;
    },
    enabled: !!timestamp,
  });
}

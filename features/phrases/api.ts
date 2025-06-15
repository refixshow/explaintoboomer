import { PhrasesService } from "@/features/phrases/service";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export function usePhraseEntryByTimestamp(timestamp: number) {
  return useQuery({
    queryKey: ["phrases", timestamp],
    queryFn: () => PhrasesService.getPhraseByTimestamp(timestamp),
    enabled: !!timestamp,
  });
}

export const usePhraseList = () =>
  useQuery({
    queryKey: ["phrases"],
    queryFn: PhrasesService.getAllPhrases,
  });

export const useExplainText = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: PhrasesService.explainPhrase,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["phrases"] });
    },
  });
};

export const useRemovePhrase = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: PhrasesService.removePhrase,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["phrases"] });
    },
  });
};

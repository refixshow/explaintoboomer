import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { MemesService } from "./service";

export const useMemeList = () =>
  useQuery({
    queryKey: ["memes"],
    queryFn: MemesService.getAllMemes,
  });

export const useMemeByTimestamp = (timestamp: number) =>
  useQuery({
    queryKey: ["memes", timestamp],
    queryFn: () => MemesService.getMemeByTimestamp(timestamp),
    enabled: !!timestamp,
  });

export const useExplainMeme = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: MemesService.explainMeme,
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
    mutationFn: MemesService.removeMeme,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["memes"] });
    },
  });
};

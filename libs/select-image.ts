import { useMutation } from "@tanstack/react-query";
import * as ImagePicker from "expo-image-picker";

export const useSelectImage = () => {
  return useMutation({
    mutationFn: async (arg?: any) => {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        base64: true,
        quality: 0.8,
      });

      if (result.canceled) {
        return null;
      }

      return {
        base64: result.assets[0].base64!,
        uri: result.assets[0].uri,
      };
    },
  });
};

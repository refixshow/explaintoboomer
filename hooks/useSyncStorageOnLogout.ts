import { storage } from "@/libs/storage";
import { useAuth } from "@clerk/clerk-expo";
import { useMutation } from "@tanstack/react-query";
import { useEffect } from "react";

export const useSyncStorageOnLogout = () => {
  const { isSignedIn } = useAuth();

  const { mutate } = useMutation({
    mutationFn: storage.clear,
  });

  useEffect(() => {
    if (!isSignedIn) {
      mutate();
    }
  }, [isSignedIn, mutate]);
};

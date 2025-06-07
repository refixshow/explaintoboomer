import NetInfo from "@react-native-community/netinfo";
import { useEffect } from "react";
import { Alert } from "react-native";

export function useOfflineAlert() {
  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      if (!state.isConnected) {
        Alert.alert("Brak internetu", "Połączenie zostało utracone.");
      }
    });

    return () => unsubscribe();
  }, []);
}

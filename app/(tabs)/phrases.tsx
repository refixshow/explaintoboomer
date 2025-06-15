import { usePhraseList, useRemovePhrase } from "@/features/phrases/api";
import { ThemedText } from "@/shared/ui/ThemedText";
import { useRouter } from "expo-router";
import { Alert, FlatList, StyleSheet, TouchableOpacity } from "react-native";

export default function PhrasesScreen() {
  const router = useRouter();
  const { data: phrases, isLoading } = usePhraseList();
  const removePhrase = useRemovePhrase();

  if (isLoading) {
    return <ThemedText style={styles.center}>Ładowanie...</ThemedText>;
  }

  if (!phrases || phrases.length === 0) {
    return <ThemedText style={styles.center}>Brak zapisanych fraz.</ThemedText>;
  }

  return (
    <FlatList
      data={phrases}
      keyExtractor={(item) => `${item.phrase}`}
      contentContainerStyle={styles.list}
      renderItem={({ item }) => (
        <TouchableOpacity
          onPress={() =>
            router.push({
              pathname: "/phrases/[timestamp]",
              params: { timestamp: String(item.timestamp) },
            })
          }
          onLongPress={() => {
            Alert.alert(
              "Usuń frazę",
              `Czy na pewno chcesz usunąć "${item.phrase}" z historii?`,
              [
                { text: "Anuluj", style: "cancel" },
                {
                  text: "Usuń",
                  style: "destructive",
                  onPress: () => removePhrase.mutate(item.timestamp),
                },
              ]
            );
          }}
          style={styles.item}
        >
          <ThemedText>{item.phrase}</ThemedText>
        </TouchableOpacity>
      )}
    />
  );
}

const styles = StyleSheet.create({
  list: {
    paddingTop: 64,
    paddingHorizontal: 16,
    gap: 12,
  },
  item: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  center: {
    padding: 64,
    textAlign: "center",
  },
});

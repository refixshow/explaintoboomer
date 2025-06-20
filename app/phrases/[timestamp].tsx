import { usePhraseEntryByTimestamp } from "@/features/phrases/api";
import { ThemedText } from "@/shared/ui/ThemedText";
import { useLocalSearchParams } from "expo-router";
import { ScrollView, StyleSheet } from "react-native";

export default function PhraseDetail() {
  const { timestamp } = useLocalSearchParams<{ timestamp: string }>();
  const parsedTimestamp = Number(timestamp);

  const { data, isLoading } = usePhraseEntryByTimestamp(parsedTimestamp);

  if (isLoading) {
    return <ThemedText style={styles.center}>Ładowanie...</ThemedText>;
  }

  if (!data) {
    return <ThemedText style={styles.center}>Nie znaleziono frazy.</ThemedText>;
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <ThemedText style={styles.phrase}>{data.phrase}</ThemedText>
      <ThemedText style={styles.explanation}>{data.explanation}</ThemedText>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 24, gap: 32 },
  phrase: { fontSize: 22, fontWeight: "600" },
  explanation: { fontSize: 16, lineHeight: 22 },
  center: { padding: 64, textAlign: "center" },
});

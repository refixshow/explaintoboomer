import { ThemedText } from "@/components/ThemedText";
import { useMemeEntry } from "@/libs/meme";
import { useLocalSearchParams } from "expo-router";
import { Image, ScrollView, StyleSheet } from "react-native";

export default function MemeDetailScreen() {
  const { timestamp } = useLocalSearchParams<{ timestamp: string }>();
  const numericTimestamp = Number(timestamp);

  const { data: meme, isLoading } = useMemeEntry(numericTimestamp);

  if (isLoading) {
    return <ThemedText style={styles.center}>Ładowanie...</ThemedText>;
  }

  if (!meme) {
    return <ThemedText style={styles.center}>Nie znaleziono mema.</ThemedText>;
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image source={{ uri: meme.imageUri }} style={styles.image} />
      <ThemedText style={styles.explanation}>{meme.explanation}</ThemedText>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    gap: 24,
  },
  image: {
    width: "100%",
    height: 300,
    resizeMode: "contain",
    borderRadius: 8,
  },
  explanation: {
    fontSize: 16,
    lineHeight: 22,
  },
  center: {
    padding: 16,
    textAlign: "center",
  },
});

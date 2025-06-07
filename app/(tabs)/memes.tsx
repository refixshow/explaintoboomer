import { ThemedText } from "@/components/ThemedText";
import { useMemeList, useRemoveMeme } from "@/libs/meme";
import { useRouter } from "expo-router";
import {
  Alert,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

export default function MemesScreen() {
  const router = useRouter();
  const { data: memes, isLoading } = useMemeList();
  const removeMeme = useRemoveMeme();

  if (isLoading) {
    return <ThemedText style={styles.center}>Ładowanie...</ThemedText>;
  }

  if (!memes || memes.length === 0) {
    return (
      <ThemedText style={styles.center}>Brak zapisanych memów.</ThemedText>
    );
  }

  return (
    <FlatList
      data={memes}
      keyExtractor={(item) => `${item.timestamp}`}
      numColumns={2}
      contentContainerStyle={styles.list}
      style={{
        paddingTop: 64,
      }}
      renderItem={({ item }) => (
        <TouchableOpacity
          style={styles.imageWrapper}
          onPress={() =>
            router.push({
              pathname: "/memes/[timestamp]",
              params: { timestamp: String(item.timestamp) },
            })
          }
          onLongPress={() => {
            Alert.alert(
              "Usuń mema",
              "Czy na pewno chcesz usunąć tego mema z historii?",
              [
                { text: "Anuluj", style: "cancel" },
                {
                  text: "Usuń",
                  style: "destructive",
                  onPress: () => {
                    removeMeme.mutate(item.timestamp);
                  },
                },
              ]
            );
          }}
        >
          <Image source={{ uri: item.imageUri }} style={styles.image} />
        </TouchableOpacity>
      )}
    />
  );
}

const styles = StyleSheet.create({
  list: {
    padding: 8,
    gap: 8,
  },
  imageWrapper: {
    flex: 1,
    margin: 4,
    aspectRatio: 1,
    borderRadius: 8,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  center: {
    padding: 64,
    textAlign: "center",
  },
});

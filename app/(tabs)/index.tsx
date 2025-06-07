import {
  ActivityIndicator,
  Image,
  Pressable,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedInput } from "@/components/ThemedInput";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";

import { SignOutButton } from "@/components/SignOutButton";
import { useExplainMeme } from "@/libs/meme";
import { useExplainText } from "@/libs/phase";
import { useSelectImage } from "@/libs/select-image";
import { useUser } from "@clerk/clerk-expo";
import { useState } from "react";

export default function HomeScreen() {
  const { user } = useUser();
  const explainMeme = useExplainMeme();
  const explainText = useExplainText();
  const selectImage = useSelectImage();

  const [isInputActive, setInputActive] = useState(false);

  const [text, setText] = useState("");

  const pickImage = () => {
    explainText.reset();
    setText("");
    selectImage.mutate(null, {
      onSuccess: (result) => {
        if (result) {
          explainMeme.mutate({ base64: result.base64, imageUri: result.uri });
        }
      },
    });
  };

  const runExplainTest = () => {
    explainMeme.reset();
    selectImage.reset();
    explainText.mutate(text, {
      onSuccess: () => {
        setText("");
      },
    });
  };

  return (
    <ParallaxScrollView
      size={isInputActive ? "small" : "big"}
      headerBackgroundColor={{ light: "#A1CEDC", dark: "#1D3D47" }}
      headerImage={
        <Image
          source={require("@/assets/images/splashart.png")}
          style={styles.headerImage}
          resizeMode="contain"
        />
      }
    >
      <ThemedView style={styles.screenContainer}>
        <ThemedText type="title" style={styles.title}>
          Explain to Boomer
        </ThemedText>

        <ThemedView style={styles.card}>
          <ThemedInput
            multiline
            numberOfLines={4}
            label="Co wyjaśnić?"
            placeholder="Wpisz zdanie lub zwrot do wyjaśnienia"
            value={text}
            editable={!explainText.isPending && !explainMeme.isPending}
            onChangeText={setText}
            onFocus={() => setInputActive(true)}
            onBlur={() => setInputActive(false)}
            extendedLabel={
              <TouchableOpacity onPress={pickImage}>
                <ThemedText lightColor="#047d2c" darkColor="#047d2c">
                  📷 Wybierz mema
                </ThemedText>
              </TouchableOpacity>
            }
          />

          <Pressable
            style={({ pressed }) => [
              styles.button,
              pressed && { opacity: 0.8 },
            ]}
            onPress={runExplainTest}
            disabled={explainText.isPending || explainMeme.isPending}
          >
            <ThemedText style={styles.buttonText}>Wyjaśnij</ThemedText>
          </Pressable>
        </ThemedView>

        {selectImage.data && (
          <Image source={{ uri: selectImage.data.uri }} style={styles.image} />
        )}
        {explainMeme.isPending && <ActivityIndicator size="large" />}
        {explainMeme.error && (
          <ThemedText style={styles.error}>Coś poszło nie tak 🙁</ThemedText>
        )}
        {explainMeme.data && (
          <ThemedText style={styles.response}>{explainMeme.data}</ThemedText>
        )}

        {explainText.data && (
          <ThemedText style={styles.response}>{explainText.data}</ThemedText>
        )}
        {explainText.isPending && <ActivityIndicator size="large" />}
        {explainText.error && (
          <ThemedText style={styles.error}>Coś poszło nie tak 🙁</ThemedText>
        )}

        <ThemedView style={styles.logout}>
          <ThemedText style={styles.error}>
            Cześć {user?.primaryEmailAddress?.emailAddress}
          </ThemedText>
          <SignOutButton />
        </ThemedView>
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  logout: {
    display: "flex",
  },
  screenContainer: {
    padding: 16,
    gap: 24,
  },
  headerImage: {
    width: "100%",
    aspectRatio: 16 / 9,
    alignSelf: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
  },
  card: {
    gap: 16,
    borderRadius: 12,
    padding: 16,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  button: {
    backgroundColor: "#047d2c",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
  },
  image: {
    width: "100%",
    height: 280,
    resizeMode: "contain",
    borderRadius: 12,
    marginVertical: 16,
  },
  response: {
    fontSize: 18,
    lineHeight: 24,
    marginTop: 12,
  },
  error: {
    color: "red",
    fontWeight: "bold",
    marginTop: 12,
  },
});

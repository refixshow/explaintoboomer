import { ThemedInput } from "@/components/ThemedInput";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useSignInMutation } from "@/libs/clerk";
import { Link } from "expo-router";
import React from "react";
import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function SignInScreen() {
  const [emailAddress, setEmailAddress] = React.useState("");
  const [password, setPassword] = React.useState("");

  const signInMutation = useSignInMutation();

  const onSignInPress = () => {
    signInMutation.mutate({
      emailAddress,
      password,
    });
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.select({ ios: "padding", android: undefined })}
      style={styles.container}
    >
      <ThemedView style={styles.inner}>
        <ThemedText type="title" style={styles.title}>
          Zaloguj się
        </ThemedText>

        <ThemedInput
          autoCapitalize="none"
          value={emailAddress}
          placeholder="Adres e-mail"
          onChangeText={setEmailAddress}
        />

        <ThemedInput
          value={password}
          placeholder="Hasło"
          secureTextEntry
          onChangeText={setPassword}
        />

        <TouchableOpacity style={styles.button} onPress={onSignInPress}>
          <Text style={styles.buttonText}>Kontynuuj</Text>
        </TouchableOpacity>

        <View style={styles.footer}>
          <ThemedText>Nie masz konta?</ThemedText>
          <Link href="/sign-up">
            <ThemedText style={styles.link}>Zarejestruj się</ThemedText>
          </Link>
        </View>
      </ThemedView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 24,
  },
  inner: {
    gap: 20,
    padding: 24,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 16,
  },
  button: {
    backgroundColor: "#047d2c",
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
  },
  footer: {
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "center",
    gap: 6,
  },
  link: {
    color: "#047d2c",
    fontWeight: "600",
  },
});

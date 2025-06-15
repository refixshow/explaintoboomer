import { useSignUpMutation, useVerifyCodeMutation } from "@/libs/clerk";
import { Colors } from "@/shared/constants/Colors";
import { ThemedInput } from "@/shared/ui/ThemedInput";
import { ThemedText } from "@/shared/ui/ThemedText";
import { ThemedView } from "@/shared/ui/ThemedView";
import { Link, useRouter } from "expo-router";
import * as React from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function SignUpScreen() {
  const router = useRouter();

  const [emailAddress, setEmailAddress] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [code, setCode] = React.useState("");

  const signUpMutation = useSignUpMutation();
  const verifyCodeMutation = useVerifyCodeMutation();

  const onSignUpPress = () => {
    signUpMutation.mutate(
      { emailAddress, password },
      {
        onError: (err: any) => {
          Alert.alert("Błąd rejestracji", err?.message ?? "Nieznany błąd.");
        },
      }
    );
  };

  const onVerifyPress = () => {
    verifyCodeMutation.mutate(
      { code },
      {
        onSuccess: () => {
          router.replace("/");
        },
        onError: (err: any) => {
          Alert.alert("Błąd weryfikacji", err?.message ?? "Nieprawidłowy kod.");
        },
      }
    );
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.select({ ios: "padding", android: undefined })}
      style={styles.container}
    >
      <ThemedView style={styles.inner}>
        <ThemedText type="title" style={styles.title}>
          {verifyCodeMutation.isPending ? "Potwierdź e-mail" : "Załóż konto"}
        </ThemedText>

        {verifyCodeMutation.isPending ? (
          <>
            <ThemedInput
              value={code}
              placeholder="Wpisz kod weryfikacyjny"
              onChangeText={setCode}
            />
            <TouchableOpacity style={styles.button} onPress={onVerifyPress}>
              <Text style={styles.buttonText}>Potwierdź</Text>
            </TouchableOpacity>
          </>
        ) : (
          <>
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
            <TouchableOpacity style={styles.button} onPress={onSignUpPress}>
              <Text style={styles.buttonText}>Kontynuuj</Text>
            </TouchableOpacity>

            <View style={styles.footer}>
              <ThemedText>Masz już konto?</ThemedText>
              <Link href="/sign-in">
                <ThemedText style={styles.link}>Zaloguj się</ThemedText>
              </Link>
            </View>
          </>
        )}
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
    backgroundColor: Colors.dark.primary,
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

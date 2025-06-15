import { useClerk, useSignIn, useSignUp } from "@clerk/clerk-expo";
import { useMutation } from "@tanstack/react-query";
import { Alert } from "react-native";
import { storage } from "./storage";

export const useSignUpMutation = () => {
  const { isLoaded, signUp } = useSignUp();

  return useMutation({
    mutationFn: async ({
      emailAddress,
      password,
    }: {
      emailAddress: string;
      password: string;
    }) => {
      if (!isLoaded) throw new Error("Clerk nie jest załadowany");

      await signUp.create({ emailAddress, password });
      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });
    },
  });
};

export const useVerifyCodeMutation = () => {
  const { isLoaded, signUp, setActive } = useSignUp();

  return useMutation({
    mutationFn: async ({ code }: { code: string }) => {
      if (!isLoaded) throw new Error("Clerk nie jest załadowany");

      const attempt = await signUp.attemptEmailAddressVerification({ code });

      if (attempt.status !== "complete") {
        throw new Error("Weryfikacja niekompletna");
      }

      await setActive({ session: attempt.createdSessionId });
    },
  });
};

export const useSignInMutation = () => {
  const { signIn, setActive, isLoaded } = useSignIn();

  return useMutation({
    mutationFn: async ({
      emailAddress,
      password,
    }: {
      emailAddress: string;
      password: string;
    }) => {
      if (!isLoaded) throw new Error("Clerk nie jest załadowany");
      const signInAttempt = await signIn.create({
        identifier: emailAddress,
        password,
      });

      if (signInAttempt.status === "complete") {
        await setActive({ session: signInAttempt.createdSessionId });
      } else {
        throw new Error("Błąd logowania.");
      }
    },
  });
};

export const useSignOut = () => {
  const { signOut } = useClerk();

  return useMutation({
    mutationFn: async () => {
      await signOut();
      storage.clear();
    },
    onError: (err) => {
      console.error("Błąd wylogowania", err.message);
      Alert.alert("Błąd wylogowania", err.message);
    },
  });
};

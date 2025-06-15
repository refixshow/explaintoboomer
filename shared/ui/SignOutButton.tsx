import { useSignOut } from "@/libs/clerk";
import { TouchableOpacity } from "react-native";
import { ThemedText } from "./ThemedText";

export const SignOutButton = () => {
  const signOutMutation = useSignOut();

  const handleSignOut = () => {
    signOutMutation.mutate();
  };

  return (
    <TouchableOpacity onPress={handleSignOut}>
      <ThemedText>Tutaj możesz się wylogować ⬅️</ThemedText>
    </TouchableOpacity>
  );
};

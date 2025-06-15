import { useThemeColor } from "@/hooks/useThemeColor";
import { ThemedText } from "@/shared/ui/ThemedText";
import { ReactNode } from "react";
import {
  StyleProp,
  StyleSheet,
  TextInput,
  TextInputProps,
  View,
  ViewStyle,
} from "react-native";

export type ThemedInputProps = TextInputProps & {
  lightBackground?: string;
  darkBackground?: string;
  lightBorder?: string;
  darkBorder?: string;
  lightPlaceholder?: string;
  darkPlaceholder?: string;
  label?: string;
  containerStyle?: StyleProp<ViewStyle>;
  extendedLabel?: ReactNode;
};

export function ThemedInput({
  label,
  style,
  lightBackground,
  darkBackground,
  lightBorder,
  darkBorder,
  lightPlaceholder,
  darkPlaceholder,
  extendedLabel,
  containerStyle,
  ...rest
}: ThemedInputProps) {
  const backgroundColor = useThemeColor(
    { light: lightBackground, dark: darkBackground },
    "background"
  );
  const borderColor = useThemeColor(
    { light: lightBorder, dark: darkBorder },
    "border"
  );
  const placeholderTextColor = useThemeColor(
    { light: lightPlaceholder, dark: darkPlaceholder },
    "placeholder"
  );
  const textColor = useThemeColor({}, "text");

  return (
    <View style={containerStyle}>
      <View style={styles.labelWrapper}>
        {label && <ThemedText type="defaultSemiBold">{label}</ThemedText>}

        {extendedLabel}
      </View>

      <TextInput
        placeholderTextColor={placeholderTextColor}
        style={[
          styles.input,
          { backgroundColor, borderColor, color: textColor },
          style,
        ]}
        {...rest}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
    marginTop: 6,
    color: "white",
  },
  labelWrapper: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

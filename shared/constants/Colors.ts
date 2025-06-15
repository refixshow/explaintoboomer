/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

const tintColorLight = "#2f95dc";
const tintColorDark = "#fff";

export const Colors = {
  light: {
    primary: "#047d2c",
    text: "#11181C",
    textSecondary: "#687076",
    textDisabled: "#B0B8C1",
    background: "#FFFFFF",
    backgroundSurface: "#F1F3F5",
    backgroundElevated: "#FFFFFF",
    border: "#E6E8EB",
    placeholder: "#A0A8B0",
    icon: "#687076",
    error: "#FF4D4F",
    success: "#2ECC71",
    warning: "#FFC107",
    tint: tintColorLight,
    tabIconDefault: "#687076",
    tabIconSelected: tintColorLight,
  },
  dark: {
    primary: "#047d2c",
    text: "#ECEDEE",
    textSecondary: "#9BA1A6",
    textDisabled: "#5A5F63",
    background: "#151718",
    backgroundSurface: "#1A1D1F",
    backgroundElevated: "#1F2224",
    border: "#2A2D2E",
    placeholder: "#5F6469",
    icon: "#9BA1A6",
    error: "#FF6B6B",
    success: "#2ECC71",
    warning: "#FFC107",
    tint: tintColorDark,
    tabIconDefault: "#9BA1A6",
    tabIconSelected: tintColorDark,
  },
};

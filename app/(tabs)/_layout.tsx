import { Redirect, Tabs } from "expo-router";
import React from "react";
import { Platform } from "react-native";

import { useColorScheme } from "@/hooks/useColorScheme";
import { useSyncStorageOnLogout } from "@/hooks/useSyncStorageOnLogout";
import { Colors } from "@/shared/constants/Colors";
import { HapticTab } from "@/shared/ui/HapticTab";
import { IconSymbol } from "@/shared/ui/IconSymbol";
import TabBarBackground from "@/shared/ui/TabBarBackground";
import { useAuth } from "@clerk/clerk-expo";

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const { isSignedIn } = useAuth();

  useSyncStorageOnLogout();

  if (!isSignedIn) {
    return <Redirect href={"/(auth)/sign-up"} />;
  }

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: Platform.select({
          ios: {
            // Use a transparent background on iOS to show the blur effect
            position: "absolute",
          },
          default: {},
        }),
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="house.fill" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="memes"
        options={{
          title: "Memy",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="doc.text.image.fill" color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="statements"
        options={{
          title: "Zwroty",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="pencil.and.ruler.fill" color={color} />
          ),
        }}
      />
    </Tabs>
  );
}

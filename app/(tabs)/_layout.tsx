import { Redirect, Tabs } from "expo-router";
import React, { useEffect } from "react";
import { Platform } from "react-native";

import { HapticTab } from "@/components/HapticTab";
import { IconSymbol } from "@/components/ui/IconSymbol";
import TabBarBackground from "@/components/ui/TabBarBackground";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { useAuth } from "@clerk/clerk-expo";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function TabLayout() {
  const colorScheme = useColorScheme();

  const { isSignedIn } = useAuth();

  useEffect(() => {
    if (!isSignedIn) {
      AsyncStorage.removeItem("meme_history");
      AsyncStorage.removeItem("phrase_history");
    }
  }, [isSignedIn]);

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

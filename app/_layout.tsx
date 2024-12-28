import { Stack } from "expo-router";
import { TamaguiProvider } from "tamagui";
import { useColorScheme } from "react-native";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { tamaguiConfig } from "../tamagui.config";
import * as Linking from "expo-linking";
import { useEffect } from "react";

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const isLoggedIn = false;
  useEffect(() => {
    const initialUrl = Linking.createURL("/");
    console.log("Current URL:", initialUrl);
  }, []);

  return (
    <TamaguiProvider config={tamaguiConfig} defaultTheme={colorScheme!}>
      <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
        <Stack>
          {isLoggedIn ? (
            <Stack.Screen name="(main)" options={{ headerShown: false }} />
          ) : (
            <Stack.Screen name="(auth)" options={{ headerShown: false }} />
          )}
        </Stack>
      </ThemeProvider>
    </TamaguiProvider>
  );
}

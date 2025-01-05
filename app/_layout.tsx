import { Stack } from "expo-router";
import { TamaguiProvider } from "tamagui";
import { useColorScheme } from "react-native";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { tamaguiConfig } from "../tamagui.config";
import { ToastProvider, ToastViewport } from "@tamagui/toast";

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const isLoggedIn = false;

  return (
    <TamaguiProvider config={tamaguiConfig} defaultTheme={colorScheme!}>
      <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
        <ToastProvider>
          <ToastViewport />
          <Stack>
            {isLoggedIn ? (
              <Stack.Screen name="(main)" options={{ headerShown: false }} />
            ) : (
              <Stack.Screen name="(auth)" options={{ headerShown: false }} />
            )}
          </Stack>
        </ToastProvider>
      </ThemeProvider>
    </TamaguiProvider>
  );
}

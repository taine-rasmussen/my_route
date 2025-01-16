import { Stack, useRouter } from "expo-router";
import { TamaguiProvider, Text } from "tamagui";
import { useColorScheme } from "react-native";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { tamaguiConfig } from "../tamagui.config";
import { ToastProvider, ToastViewport } from "@tamagui/toast";
import { getFromSecureStore } from "./utils";
import { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

interface DecodedToken {
  exp: number;
  iat?: number;
  [key: string]: any;
}

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    const checkAuthStatus = async () => {
      setLoading(true);
      try {
        const accessToken = await getFromSecureStore("access_token");

        if (accessToken) {
          const decodedToken = jwtDecode(
            accessToken
          ) as unknown as DecodedToken;

          const currentTime = Math.floor(Date.now() / 1000);

          if (decodedToken.exp > currentTime) {
            setIsLoggedIn(true);
          } else {
            console.log("Access token expired.");
          }
        } else {
          console.log("No access token found.");
        }
      } catch (error) {
        console.error("Error checking auth status:", error);
      } finally {
        setLoading(false);
      }
    };

    checkAuthStatus();
  }, []);

  useEffect(() => {
    if (isLoggedIn) {
      router.push("/(main)");
    } else {
      router.push("/(auth)");
    }
  }, [isLoggedIn]);

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

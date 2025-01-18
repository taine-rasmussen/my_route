import { Stack, useRouter } from "expo-router";
import { Spinner, TamaguiProvider, Text } from "tamagui";
import { useColorScheme } from "react-native";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { tamaguiConfig } from "../tamagui.config";
import { ToastProvider, ToastViewport } from "@tamagui/toast";
import { getFromSecureStore, saveToSecureStore } from "./utils";
import { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { UserProvider } from "./UserContext";

interface DecodedToken {
  exp: number;
  iat?: number;
  [key: string]: any;
}

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();

  const refreshAccessToken = async (refreshToken: string) => {
    try {
      const response = await fetch("YOUR_BACKEND_URL/refresh-token/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ refresh_token: refreshToken }),
      });

      if (response.ok) {
        const data = await response.json();
        return {
          access_token: data.access_token,
          refresh_token: data.refresh_token,
        };
      } else {
        console.log("Failed to refresh token");
        return null;
      }
    } catch (error) {
      console.error("Error refreshing token:", error);
      return null;
    }
  };

  const checkAuthStatus = async () => {
    setLoading(true);
    try {
      const accessToken = await getFromSecureStore("access_token");
      const refreshToken = await getFromSecureStore("refresh_token");

      if (accessToken) {
        const decodedToken = jwtDecode(accessToken) as DecodedToken;
        const currentTime = Math.floor(Date.now() / 1000);

        if (decodedToken.exp > currentTime) {
          // If access token is still valid
          setIsLoggedIn(true);
        } else {
          console.log("Access token expired.");

          if (refreshToken) {
            // Try to refresh the access token
            const refreshedTokens = await refreshAccessToken(refreshToken);

            if (refreshedTokens) {
              // If refresh successful, store new tokens
              await saveToSecureStore(
                "access_token",
                refreshedTokens.access_token
              );
              await saveToSecureStore(
                "refresh_token",
                refreshedTokens.refresh_token
              );
              setIsLoggedIn(true);
            } else {
              console.log("Refresh token expired or invalid.");
              setIsLoggedIn(false); // Invalid refresh token, logout user
            }
          } else {
            console.log("No refresh token found.");
            setIsLoggedIn(false); // No refresh token, logout user
          }
        }
      } else {
        console.log("No access token found.");
        setIsLoggedIn(false); // No access token, logout user
      }
    } catch (error) {
      console.error("Error checking auth status:", error);
      setIsLoggedIn(false); // Handle error and logout
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkAuthStatus();
  }, []);

  useEffect(() => {
    if (loading) return;
    if (isLoggedIn) {
      router.push("/(main)");
    } else {
      router.push("/(auth)");
    }
  }, [isLoggedIn, loading, router]);

  return (
    <TamaguiProvider config={tamaguiConfig} defaultTheme={colorScheme!}>
      <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
        <ToastProvider>
          <ToastViewport />
          <UserProvider>
            <Stack>
              {loading ? (
                <Spinner size="large" color="$orange10" />
              ) : (
                <Stack.Screen
                  name={isLoggedIn ? "(main)" : "(auth)"}
                  options={{ headerShown: false }}
                />
              )}
            </Stack>
          </UserProvider>
        </ToastProvider>
      </ThemeProvider>
    </TamaguiProvider>
  );
}

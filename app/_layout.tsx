import { Stack } from "expo-router";

export default function RootLayout() {
  const isLoggedIn = false;
  return (
    <Stack>
      {isLoggedIn ? (
        <Stack.Screen name="(main)" options={{ headerShown: false }} />
      ) : (
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
      )}
    </Stack>
  );
}

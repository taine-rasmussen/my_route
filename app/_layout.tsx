import { Stack } from 'expo-router';
import { TamaguiProvider } from 'tamagui';
import { useColorScheme } from 'react-native';
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from '@react-navigation/native';
import { tamaguiConfig } from '../tamagui.config';
import { UserProvider, useUser } from './contexts/UserContext';
import { AuthProvider } from './contexts/AuthContext';

function AppContent() {
  const systemColorScheme = useColorScheme();
  const { themePreference } = useUser();

  const colorScheme =
    themePreference === 'system' ? systemColorScheme : themePreference;

  return (
    <TamaguiProvider config={tamaguiConfig} defaultTheme={colorScheme!}>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <Stack>
          <Stack.Screen name="customLayout" options={{ headerShown: false }} />
        </Stack>
      </ThemeProvider>
    </TamaguiProvider>
  );
}

export default function RootLayout() {
  return (
    <AuthProvider>
      <UserProvider>
        <AppContent />
      </UserProvider>
    </AuthProvider>
  );
}

import { Stack } from 'expo-router';
import { Spinner, TamaguiProvider } from 'tamagui';
import { useColorScheme } from 'react-native';
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from '@react-navigation/native';
import { tamaguiConfig } from '../tamagui.config';
import { UserProvider, useUser } from './contexts/UserContext';
import { AuthProvider, useAuth } from './contexts/AuthContext';

const AppContent = () => {
  const systemColorScheme = useColorScheme();
  const { themePreference } = useUser();
  const { loading, isLoggedIn } = useAuth();

  const colorScheme =
    themePreference === 'system' ? systemColorScheme : themePreference;

  const screenName = isLoggedIn ? '(main)' : '(auth)';

  if (loading) {
    return <Spinner size="large" color="$orange10" />;
  }

  return (
    <TamaguiProvider config={tamaguiConfig} defaultTheme={colorScheme!}>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <Stack>
          <Stack.Screen name={screenName} options={{ headerShown: false }} />
        </Stack>
      </ThemeProvider>
    </TamaguiProvider>
  );
};

export default function RootLayout() {
  return (
    <AuthProvider>
      <UserProvider>
        <AppContent />
      </UserProvider>
    </AuthProvider>
  );
}

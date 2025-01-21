import { Stack } from 'expo-router';
import { Spinner, TamaguiProvider } from 'tamagui';
import { useColorScheme } from 'react-native';
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from '@react-navigation/native';
import { tamaguiConfig } from '../tamagui.config';
import { UserProvider } from './contexts/UserContext';
import { AuthProvider } from './contexts/AuthContext';

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <TamaguiProvider config={tamaguiConfig} defaultTheme={colorScheme!}>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <AuthProvider>
          <UserProvider>
            <Stack>
              <Stack.Screen
                name="customLayout"
                options={{ headerShown: false }}
              />
            </Stack>
          </UserProvider>
        </AuthProvider>
      </ThemeProvider>
    </TamaguiProvider>
  );
}

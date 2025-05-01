import { Stack } from 'expo-router';
import { SizableText, Spinner, TamaguiProvider, View } from 'tamagui';
import { useColorScheme } from 'react-native';
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from '@react-navigation/native';
import { tamaguiConfig } from '../tamagui.config';
import { UserProvider, useUser } from './contexts/UserContext';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { ToastProvider } from 'react-native-toast-notifications';

const AppContent = () => {
  const systemColorScheme = useColorScheme();
  const { themePreference } = useUser();
  const { isLoggedIn } = useAuth();

  const colorScheme =
    themePreference === 'system' ? systemColorScheme : themePreference;

  const screenName = isLoggedIn ? '(main)' : '(auth)';

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name={screenName} options={{ headerShown: false }} />
      </Stack>
    </ThemeProvider>
  );
};

export default function RootLayout() {
  return (
    <TamaguiProvider config={tamaguiConfig}>
      <ToastProvider
        placement="bottom"
        duration={4000}
        animationType="slide-in"
        animationDuration={250}
        offset={50}
        successColor="green"
        dangerColor="red"
        warningColor="orange"
        normalColor="gray"
        textStyle={{
          fontSize: 20,
          paddingHorizontal: 16,
          paddingVertical: 12,
        }}
        swipeEnabled={true}
        renderType={{
          custom_type: (toast) => (
            <View
              style={{
                paddingHorizontal: 20,
                paddingVertical: 14,
                backgroundColor: '#444',
                borderRadius: 16,
                marginHorizontal: 20,
              }}
            >
              <SizableText style={{ color: '#fff', fontSize: 20 }}>
                {toast.message}
              </SizableText>
            </View>
          ),
        }}
      >
        <AuthProvider>
          <UserProvider>
            <AppContent />
          </UserProvider>
        </AuthProvider>
      </ToastProvider>
    </TamaguiProvider>
  );
}

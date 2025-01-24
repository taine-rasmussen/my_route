import { Moon, Sun } from '@tamagui/lucide-icons';
import { ListItem, XStack, SizableText, Switch } from 'tamagui';
import { useUser } from '@/app/contexts/UserContext';
import { useColorScheme } from 'react-native';
import { useMemo } from 'react';

const DarkModeListItem = () => {
  const { themePreference, toggleTheme } = useUser();
  const systemColorScheme = useColorScheme();

  const colorScheme =
    themePreference === 'system' ? systemColorScheme : themePreference;

  const isChecked = useMemo((): boolean => {
    return colorScheme === 'dark';
  }, [toggleTheme]);

  const handleCheckedChange = (checked: boolean) => {
    // Toggle between 'dark' and 'light' based on the switch state
    toggleTheme(checked ? 'dark' : 'light');
  };

  // dark === isChecked TRUE
  // light === isChecked FALSE

  return (
    <ListItem>
      <XStack
        flex={1}
        display="flex"
        alignItems="center"
        justifyContent="space-between"
      >
        <XStack gap={8} alignItems="center">
          {colorScheme === 'dark' ? <Moon size="$1" /> : <Sun size="$1" />}
          <SizableText size="$6">Dark mode</SizableText>
        </XStack>
        <Switch
          native
          size="$3"
          value="colour scheme"
          onCheckedChange={handleCheckedChange}
          checked={isChecked}
        >
          <Switch.Thumb animation="bouncy" />
        </Switch>
      </XStack>
    </ListItem>
  );
};

export default DarkModeListItem;

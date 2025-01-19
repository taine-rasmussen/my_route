import { Moon } from '@tamagui/lucide-icons';
import { ListItem, XStack, SizableText, Switch } from 'tamagui';

const DarkModeListItem = () => {
  return (
    <ListItem>
      <XStack
        flex={1}
        display="flex"
        alignItems="center"
        justifyContent="space-between"
      >
        <XStack gap={8} alignItems="center">
          <Moon size="$1" />
          <SizableText size="$6">Dark mode</SizableText>
        </XStack>
        <Switch size="$3">
          <Switch.Thumb animation="bouncy" />
        </Switch>
      </XStack>
    </ListItem>
  );
};

export default DarkModeListItem;

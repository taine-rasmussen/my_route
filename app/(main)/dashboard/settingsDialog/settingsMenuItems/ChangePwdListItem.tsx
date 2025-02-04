import { ListItem, SizableText, XStack, Button } from 'tamagui';
import { Lock } from '@tamagui/lucide-icons';

const ChangePwdListListItem = () => {
  return (
    <ListItem>
      <XStack
        flex={1}
        display="flex"
        alignItems="center"
        justifyContent="space-between"
      >
        <XStack gap={8} alignItems="center">
          <Lock size="$1" />
          <SizableText size="$6">Password</SizableText>
        </XStack>
        <Button>Change</Button>
      </XStack>
    </ListItem>
  );
};

export default ChangePwdListListItem;

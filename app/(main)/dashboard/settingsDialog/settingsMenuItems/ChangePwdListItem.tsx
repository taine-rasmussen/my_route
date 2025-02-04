import { useState } from 'react';
import { ListItem, SizableText, XStack, Button, Sheet, YStack } from 'tamagui';
import { Lock } from '@tamagui/lucide-icons';

const ChangePwdListListItem = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
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
          <Button onPress={() => setIsOpen(true)}>Change</Button>
        </XStack>
      </ListItem>

      <Sheet modal open={isOpen} onOpenChange={setIsOpen} dismissOnSnapToBottom>
        <Sheet.Frame>
          <Sheet.ScrollView>
            <YStack padding={16} gap={12}>
              <SizableText size="$6">Reset Password</SizableText>

              <Button onPress={() => setIsOpen(false)}>Close</Button>
            </YStack>
          </Sheet.ScrollView>
        </Sheet.Frame>
        <Sheet.Overlay />
      </Sheet>
    </>
  );
};

export default ChangePwdListListItem;

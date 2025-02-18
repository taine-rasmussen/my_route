import { CirclePlus } from '@tamagui/lucide-icons';
import {
  Popover,
  SizableText,
  YStack,
  XStack,
  Label,
  Input,
  Button,
} from 'tamagui';

const AddClimbPopover = () => {
  return (
    <Popover size="$5" allowFlip stayInFrame offset={10} placement="bottom">
      <Popover.Trigger asChild>
        <Button icon={CirclePlus} scaleIcon={2} circular padding={8} />
      </Popover.Trigger>

      <Popover.Content
        borderWidth={1}
        borderColor="$borderColor"
        width={250}
        height={250}
        enterStyle={{ y: -10, opacity: 0 }}
        exitStyle={{ y: -10, opacity: 0 }}
        elevate
        animation={[
          'quick',
          {
            opacity: {
              overshootClamping: true,
            },
          },
        ]}
      >
        <Popover.Arrow borderWidth={1} borderColor="$borderColor" />
        <YStack gap="$3">
          <SizableText>content goes here</SizableText>
          <XStack gap="$3">
            <Label size="$3">Name</Label>
            <Input f={1} size="$3" />
          </XStack>
          <Popover.Close asChild>
            <Button size="$3">Save</Button>
          </Popover.Close>
        </YStack>
      </Popover.Content>
    </Popover>
  );
};

export default AddClimbPopover;

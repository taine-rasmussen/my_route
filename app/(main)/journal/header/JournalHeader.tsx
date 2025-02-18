import { SizableText, XStack, Card } from 'tamagui';
import { Settings2 } from '@tamagui/lucide-icons';
import AddClimbPopover from './AddClimbPopover';

const JournalHeader = () => {
  return (
    <Card padding={4} elevate size="$2" bordered padded>
      <XStack
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        padding={8}
      >
        <SizableText size={'$9'}>Journal</SizableText>
        <XStack gap={8}>
          <Settings2 size="$3" />
          <AddClimbPopover />
        </XStack>
      </XStack>
    </Card>
  );
};

export default JournalHeader;

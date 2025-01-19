import { Edit3 } from '@tamagui/lucide-icons';
import { Button, ListItem, SizableText, XStack } from 'tamagui';

const DashboardLayoutListItem = () => {
  // Opens mock dashboard
  // ability to drag and customise layout of overview components
  return (
    <ListItem>
      <XStack
        flex={1}
        display="flex"
        alignItems="center"
        justifyContent="space-between"
      >
        <XStack gap={8} alignItems="center">
          <Edit3 size="$1" />
          <SizableText size="$6">Dashboard layout</SizableText>
        </XStack>
        <Button>Edit</Button>
      </XStack>
    </ListItem>
  );
};

export default DashboardLayoutListItem;

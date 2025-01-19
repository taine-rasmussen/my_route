import { LogOut } from '@tamagui/lucide-icons';
import { SizableText, Card, XStack } from 'tamagui';

const UserLogout = () => {
  // Plug into backend logout
  // remove tokens
  // navigate to login flow
  return (
    <Card padding={16}>
      <XStack gap={16}>
        <LogOut size="$2" color="salmon" />
        <SizableText size="$7" color="salmon">
          Sign out
        </SizableText>
      </XStack>
    </Card>
  );
};

export default UserLogout;

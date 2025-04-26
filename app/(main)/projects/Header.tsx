import Button from '@/app/components/Button';
import { CirclePlus, FolderClosed, FolderOpen } from '@tamagui/lucide-icons';
import { Card, SizableText, XStack } from 'tamagui';

const Header = () => {
  return (
    <Card padding="$4" size="auto" elevate bordered>
      <XStack justifyContent="space-between" alignItems="center">
        <SizableText style={{ fontSize: 24, zIndex: 100 }}>
          Projects
        </SizableText>
        <XStack space="$2">
          <Button icon={<FolderOpen />} scaleIcon={2} circular padding={8} />
          <Button icon={<FolderClosed />} scaleIcon={2} circular padding={8} />
          <Button icon={<CirclePlus />} scaleIcon={2} circular padding={8} />
        </XStack>
      </XStack>
    </Card>
  );
};

export default Header;

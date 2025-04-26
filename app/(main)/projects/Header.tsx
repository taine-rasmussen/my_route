import Button from '@/app/components/Button';
import { CirclePlus, FolderClosed, FolderOpen } from '@tamagui/lucide-icons';
import { Card, SizableText, XStack } from 'tamagui';
import { useProjects } from '@/app/contexts/ProjectsContext';

const Header = () => {
  const {
    projectFilters: { showClosedProjects, showOpenProjects },
  } = useProjects();

  console.log(showClosedProjects, showOpenProjects);

  return (
    <Card padding="$4" bordered>
      <XStack justifyContent="space-between" alignItems="center">
        <SizableText style={{ fontSize: 24 }}>Projects</SizableText>
        <XStack space="$2">
          <Button
            icon={<FolderOpen />}
            scaleIcon={2}
            circular
            padding={8}
            backgroundColor={showOpenProjects ? '$orange10' : '$background'}
          />
          <Button
            icon={<FolderClosed />}
            scaleIcon={2}
            circular
            padding={8}
            backgroundColor={showClosedProjects ? '$orange10' : '$background'}
          />
          <Button icon={<CirclePlus />} scaleIcon={2} circular padding={8} />
        </XStack>
      </XStack>
    </Card>
  );
};

export default Header;

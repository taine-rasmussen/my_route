import Button from '@/app/components/Button';
import { CirclePlus, FolderClosed, FolderOpen } from '@tamagui/lucide-icons';
import { Card, SizableText, XStack } from 'tamagui';
import { useProjects } from '@/app/contexts/ProjectsContext';
import { ProjectFilters } from '@/app/types';
import useCustomToast from '@/hooks/useToast';

const Header = () => {
  const {
    projectFilters: { showClosedProjects, showOpenProjects },
    setProjectFilters,
  } = useProjects();
  const { showSuccess, showError } = useCustomToast();

  const handleFilterPress = (type: keyof ProjectFilters) => {
    setProjectFilters((prev: ProjectFilters) => {
      const newValue = !prev[type];
      if (type === 'showOpenProjects') {
        if (newValue) {
          showSuccess('Showing open projects');
        } else {
          showError('Hidden open projects');
        }
      }
      if (type === 'showClosedProjects') {
        if (newValue) {
          showSuccess('Showing closed projects');
        } else {
          showError('Hidden closed projects');
        }
      }
      return {
        ...prev,
        [type]: newValue,
      };
    });
  };

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
            onPress={() => handleFilterPress('showOpenProjects')}
          />
          <Button
            icon={<FolderClosed />}
            scaleIcon={2}
            circular
            padding={8}
            backgroundColor={showClosedProjects ? '$orange10' : '$background'}
            onPress={() => handleFilterPress('showClosedProjects')}
          />
          <Button icon={<CirclePlus />} scaleIcon={2} circular padding={8} />
        </XStack>
      </XStack>
    </Card>
  );
};

export default Header;

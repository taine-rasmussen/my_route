import { Card, XStack, YStack, SizableText, Separator } from 'tamagui';
import { BarChart2, Goal } from '@tamagui/lucide-icons';
import { IClimbData } from '@/app/types';

interface IClimbCardSmall {
  climb: IClimbData;
}

const ClimbCardSmall = ({ climb }: IClimbCardSmall) => {
  const { attempts, grade } = climb;

  const getGradeColor = (grade: string): string => {
    const gradeNumber = parseInt(grade.replace('V', ''));

    if (gradeNumber <= 2) return 'blue'; // V0-V2
    if (gradeNumber <= 5) return 'green'; // V3-V5
    if (gradeNumber <= 8) return 'yellow'; // V6-V8
    if (gradeNumber <= 11) return 'orange'; // V9-V11
    if (gradeNumber <= 14) return 'red'; // V12-V14
    return 'purple'; // V15-V17
  };
  const gradeColor = getGradeColor(grade);

  return (
    <Card padding={16} elevate size="$5" bordered>
      <XStack gap={12} alignItems="center">
        <YStack flex={1} gap={4}>
          <XStack gap={8} padding={4} display="flex" alignItems="center">
            <Goal size="$2" color="$orange10" />
            <SizableText size={'$6'} fontWeight={'bold'}>
              Attempts: {attempts}
            </SizableText>
          </XStack>
          <Separator />
          <XStack gap={8} padding={4} display="flex" alignItems="center">
            <BarChart2 size="$2" color="$orange10" />
            <SizableText size={'$6'} fontWeight={'bold'}>
              Grade: {grade}
            </SizableText>
          </XStack>
        </YStack>
        <Card
          width={16}
          height="100%"
          backgroundColor={gradeColor}
          borderRadius={4}
        />
      </XStack>
    </Card>
  );
};

export default ClimbCardSmall;

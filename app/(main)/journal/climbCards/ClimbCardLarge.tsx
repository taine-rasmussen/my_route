import { Card, XStack, YStack, Separator } from 'tamagui';
import { BarChart2, Goal, CalendarDays, MapPin } from '@tamagui/lucide-icons';
import { IClimbData } from '@/app/types';
import { useUser } from '@/app/contexts/UserContext';
import { ItemWrapper, StyledIcon, StyledText } from './utils';

interface IClimbCardLarge {
  climb: IClimbData;
}

const ClimbCardLarge = ({ climb }: IClimbCardLarge) => {
  const { attempts, grade, created_at } = climb;
  const { user } = useUser();
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

  const formattedDate = new Date(created_at).toLocaleDateString();

  return (
    <Card padding={16} elevate size="$5" bordered>
      <XStack gap={12} alignItems="center">
        <YStack flex={1} gap={4}>
          <ItemWrapper>
            <StyledIcon Icon={Goal} />
            <StyledText>{attempts}</StyledText>
          </ItemWrapper>
          <ItemWrapper>
            <StyledIcon Icon={BarChart2} />
            <StyledText>{grade}</StyledText>
          </ItemWrapper>
          <Separator />
          <ItemWrapper>
            <StyledIcon Icon={CalendarDays} />
            <StyledText>{formattedDate}</StyledText>
          </ItemWrapper>
          <ItemWrapper>
            <StyledIcon Icon={MapPin} />
            <StyledText>{user?.home_gym}</StyledText>
          </ItemWrapper>
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

export default ClimbCardLarge;

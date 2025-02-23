import { SizableText, Card, XStack, YStack } from 'tamagui';

interface IClimbData {
  attempts: number;
  created_at: string; // Adjusted to string to handle the date correctly
  grade: string;
  id: number;
}

interface IJournaldClimbItem {
  climb: IClimbData;
}

const JournaldClimbItem = ({ climb }: IJournaldClimbItem) => {
  const { attempts, created_at, grade, id } = climb;

  // Parse the created_at string into a human-readable date format
  const formattedDate = new Date(created_at).toLocaleDateString();

  // Define a function to map grades to colors
  const getGradeColor = (grade: string): string => {
    const gradeNumber = parseInt(grade.replace('V', ''));

    // Group the grades into ranges
    if (gradeNumber <= 2) return 'blue'; // V0-V2
    if (gradeNumber <= 5) return 'green'; // V3-V5
    if (gradeNumber <= 8) return 'yellow'; // V6-V8
    if (gradeNumber <= 11) return 'orange'; // V9-V11
    if (gradeNumber <= 14) return 'red'; // V12-V14
    return 'purple'; // V15-V17
  };

  // Get the grade color based on the grade
  const gradeColor = getGradeColor(grade);

  return (
    <Card padding={16} elevate size="$5" bordered>
      <XStack gap={12} alignItems="center">
        <YStack flex={1} gap={4}>
          <SizableText fontWeight="bold">Climb #{id}</SizableText>
          <SizableText>Attempts: {attempts}</SizableText>
          <SizableText>Date: {formattedDate}</SizableText>
          <SizableText>Grade: {grade}</SizableText>
        </YStack>
        <Card
          width={8}
          height="100%"
          backgroundColor={gradeColor}
          borderRadius={4}
        />
      </XStack>
    </Card>
  );
};

export default JournaldClimbItem;

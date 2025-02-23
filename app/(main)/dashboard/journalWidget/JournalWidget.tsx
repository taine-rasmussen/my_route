import React, { useEffect, useState } from 'react';
import { SizableText, Card, XStack, YStack } from 'tamagui';
import { getFromSecureStore } from '@/app/utils';
import { useUser } from '@/app/contexts/UserContext';

const JournalWidget = () => {
  const [recentClimb, setRecentClimb] = useState<any | null>(null);
  const { user } = useUser();

  // create route for preview data instead of fetching all climbs
  const getRecentClimb = async () => {
    try {
      const accessToken = await getFromSecureStore('access_token');

      const response = await fetch(
        `${process.env.EXPO_PUBLIC_BASE_URL}get_climbs/?user_id=${user?.id}`,
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );

      if (!response.ok) {
        throw new Error('Failed to fetch climbs data');
      }

      const data = await response.json();
      const latestClimb = data.length > 0 ? data[0] : null;
      setRecentClimb(latestClimb);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getRecentClimb();
  }, [user?.id]);

  if (!recentClimb) {
    return <SizableText>Loading...</SizableText>;
  }

  const { attempts, created_at, grade, id } = recentClimb;
  const formattedDate = new Date(created_at).toLocaleDateString();

  // move to utils
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
    <Card padding={16} elevate size="$5" bordered width="45%" margin="auto">
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

export default JournalWidget;

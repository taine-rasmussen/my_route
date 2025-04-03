import { getFromSecureStore } from '@/app/utils';
import { useState, useEffect } from 'react';
import { Card, SizableText, XStack } from 'tamagui';
import moment from 'moment';
import { VGrade } from '@/app/types';

const AverageClimbWidget = () => {
  const [averageClimb, setAverageClimb] = useState<VGrade | null>(null);

  useEffect(() => {
    async function fetchAverageGrade() {
      const filters = {
        start_date: moment().subtract(1, 'months').format('YYYY-MM-DD'),
        end_date: moment().format('YYYY-MM-DD'),
      };

      try {
        const accessToken = await getFromSecureStore('access_token');
        const response = await fetch(
          `${process.env.EXPO_PUBLIC_BASE_URL}average_grade/`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${accessToken}`,
            },
            body: JSON.stringify(filters),
          },
        );
        const data = await response.json();
        if (response.ok) {
          setAverageClimb(`V${data.average_grade}` as VGrade);
        } else {
          console.error('Error fetching average grade:', data);
        }
      } catch (error) {
        console.error('Fetch error:', error);
      }
    }
    fetchAverageGrade();
  }, []);

  // TODO: press on card has pop up to show toggle hard coded dates for average range / custom - reuse date picker.

  return (
    <Card padding={16} elevate size="$5" bordered width="45%" margin="auto">
      <XStack gap={12} alignItems="center">
        <SizableText>
          Last months average:
          {averageClimb !== null ? averageClimb : 'Loading...'}
        </SizableText>
      </XStack>
    </Card>
  );
};

export default AverageClimbWidget;

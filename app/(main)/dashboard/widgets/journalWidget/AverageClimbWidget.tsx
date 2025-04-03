import { getFromSecureStore } from '@/app/utils';
import { useState, useEffect } from 'react';
import { Card, SizableText, XStack } from 'tamagui';

const AverageClimbWidget = () => {
  const [averageClimb, setAverageClimb] = useState(null);

  console.log('AVG GRADE', averageClimb);

  useEffect(() => {
    async function fetchAverageGrade() {
      const filters = {
        start_date: '2023-04-01T00:00:00',
        end_date: '2025-03-30T23:59:59',
      };

      try {
        // Retrieve the token from secure storage
        const accessToken = await getFromSecureStore('access_token');
        // Call the average_grade endpoint with an empty JSON body for all-time average
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
          setAverageClimb(data.average_grade);
        } else {
          console.error('Error fetching average grade:', data);
        }
      } catch (error) {
        console.error('Fetch error:', error);
      }
    }
    fetchAverageGrade();
  }, []);

  return (
    <Card padding={16} elevate size="$5" bordered width="45%" margin="auto">
      <XStack gap={12} alignItems="center">
        <SizableText>
          Average grade: {averageClimb !== null ? averageClimb : 'Loading...'}
        </SizableText>
      </XStack>
    </Card>
  );
};

export default AverageClimbWidget;

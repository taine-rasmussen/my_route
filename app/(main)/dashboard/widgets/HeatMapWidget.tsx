import { useUser } from '@/app/contexts/UserContext';
import { getFromSecureStore } from '@/app/utils';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { Card, SizableText } from 'tamagui';
import { ContributionGraph } from 'react-native-chart-kit';
import { ContributionChartValue } from 'react-native-chart-kit/dist/contribution-graph/ContributionGraph';
import { Dimensions } from 'react-native';

const HeatMapWidget = () => {
  const { user } = useUser();
  const [climbData, setClimbData] = useState([]);

  const getClimbsData = useCallback(async () => {
    try {
      const accessToken = await getFromSecureStore('access_token');

      const filters = {
        start_date: null,
        end_date: null,
        grade_range: null,
      };

      const response = await fetch(
        `${process.env.EXPO_PUBLIC_BASE_URL}get_climbs/?user_id=${user?.id}`,
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(filters),
        },
      );

      if (!response.ok) {
        throw new Error('Failed to fetch climbs data');
      }

      const data = await response.json();
      setClimbData(data);
    } catch (error) {
      console.error(error);
    }
  }, [user?.id]);

  useEffect(() => {
    getClimbsData();
  }, []);

  // Transform the climb data into heatmap data (number of climbs per day)
  const heatmapData = useMemo(() => {
    const dateCounts = {};
    climbData.forEach((item) => {
      // Extract just the date part (YYYY-MM-DD)
      const date = new Date(item.created_at).toISOString().split('T')[0];
      dateCounts[date] = (dateCounts[date] || 0) + 1;
    });
    return Object.entries(dateCounts).map(([date, count]) => ({ date, count }));
  }, [climbData]);

  // Use the device width for responsive chart width
  const screenWidth = Dimensions.get('window').width;

  return (
    <Card padding={16} elevate size="$5" bordered width="auto" height="auto">
      <SizableText>Climb Activity Heatmap</SizableText>
      <ContributionGraph
        values={heatmapData}
        endDate={new Date()} // set to today's date or adjust as needed
        numDays={60} // adjust number of days to display
        width={screenWidth - 40} // responsive width with some margin
        height={220}
        chartConfig={{
          backgroundColor: '#ffffff',
          backgroundGradientFrom: '#ffffff',
          backgroundGradientTo: '#ffffff',
          color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          style: {
            borderRadius: 16,
          },
        }}
        tooltipDataAttrs={(value: ContributionChartValue) => ({
          onPress: () => alert(`${value.date}: ${value.count} climbs`),
          // handle nulls
        })}
      />
    </Card>
  );
};

export default HeatMapWidget;

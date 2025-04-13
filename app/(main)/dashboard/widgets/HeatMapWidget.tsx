import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useColorScheme, useWindowDimensions, Alert } from 'react-native';
import { ContributionGraph } from 'react-native-chart-kit';
import { getFromSecureStore } from '@/app/utils';
import { useUser } from '@/app/contexts/UserContext';
import { IClimbData } from '@/app/types';

const HeatMapWidget = () => {
  const { user } = useUser();
  const [climbData, setClimbData] = useState<IClimbData[]>([]);
  const { width } = useWindowDimensions();
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === 'dark' || !colorScheme;

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
  }, [getClimbsData]);

  const heatmapData = useMemo(() => {
    const dateCounts: Record<string, number> = {};
    climbData.forEach((item: IClimbData) => {
      const date = new Date(item.created_at).toISOString().split('T')[0];
      dateCounts[date] = (dateCounts[date] || 0) + 1;
    });
    return Object.entries(dateCounts).map(([date, count]) => ({ date, count }));
  }, [climbData]);

  const interpolateColor = (
    start: string,
    end: string,
    factor: number,
  ): string => {
    const hex = (color: string) =>
      color
        .slice(1)
        .match(/.{2}/g)
        ?.map((x) => parseInt(x, 16)) ?? [0, 0, 0];
    const [r1, g1, b1] = hex(start);
    const [r2, g2, b2] = hex(end);
    const r = Math.round(r1 + (r2 - r1) * factor);
    const g = Math.round(g1 + (g2 - g1) * factor);
    const b = Math.round(b1 + (b2 - b1) * factor);
    return `rgb(${r}, ${g}, ${b})`;
  };

  const chartConfig = {
    backgroundColor: isDarkMode ? '#1a1a1a' : '#ffffff',
    backgroundGradientFrom: isDarkMode ? '#1a1a1a' : '#ffffff',
    backgroundGradientTo: isDarkMode ? '#1a1a1a' : '#ffffff',
    color: (opacity = 1) => {
      const interpolateColor = (start: any, end: any, factor: any) => {
        const result = start
          .slice(1)
          .match(/.{2}/g)
          .map((hex: any, i: number) => {
            const startVal = parseInt(hex, 16);
            const endVal = parseInt(end.slice(1).match(/.{2}/g)[i], 16);
            const interpolated = Math.round(
              startVal + (endVal - startVal) * factor,
            );
            return interpolated.toString(16).padStart(2, '0');
          });
        return `#${result.join('')}`;
      };

      return interpolateColor('#100c08', '#ffffff', opacity);
    },
    labelColor: (opacity = 1) =>
      isDarkMode
        ? `rgba(255, 255, 255, ${opacity})`
        : `rgba(0, 0, 0, ${opacity})`,
    style: {
      borderRadius: 16,
    },
  };

  return (
    <ContributionGraph
      values={heatmapData}
      endDate={new Date()}
      numDays={127}
      width={width}
      height={200}
      gutterSize={2}
      squareSize={16}
      chartConfig={chartConfig}
      style={{ marginVertical: 8 }}
      tooltipDataAttrs={(value: any) => ({
        onPress: () =>
          Alert.alert('Climb Info', `${value.date}: ${value.count} climbs`),
      })}
      showMonthLabels={true}
      showOutOfRangeDays={true}
    />
  );
};

export default HeatMapWidget;

import { useUser } from '@/app/contexts/UserContext';
import { getFromSecureStore } from '@/app/utils';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { Card, SizableText } from 'tamagui';
import { Dimensions, View, Text } from 'react-native';
import { BarChart } from 'react-native-chart-kit';

const LineChartWidget = () => {
  const [climbData, setClimbData] = useState([]);
  const { user } = useUser();
  const screenWidth = Dimensions.get('window').width;

  const getClimbsData = async () => {
    try {
      const accessToken = await getFromSecureStore('access_token');

      const filters = {
        start_date: moment().subtract(1, 'months').format('YYYY-MM-DD'),
        end_date: moment().add(1, 'days').format('YYYY-MM-DD'),
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
  };

  useEffect(() => {
    getClimbsData();
  }, []);

  const processData = () => {
    const attemptsByGrade: { [grade: string]: number } = {};

    climbData.forEach((climb: any) => {
      if (!climb.grade || !climb.attempts) return;

      if (!attemptsByGrade[climb.grade]) {
        attemptsByGrade[climb.grade] = 0;
      }

      attemptsByGrade[climb.grade] += climb.attempts;
    });

    // Sort grades numerically (V0 to V17)
    const sortedGrades = Object.keys(attemptsByGrade).sort((a, b) => {
      const getGradeValue = (grade: string) => parseInt(grade.replace('V', ''));
      return getGradeValue(a) - getGradeValue(b);
    });

    const labels = sortedGrades;
    const data = sortedGrades.map((grade) =>
      Math.round(attemptsByGrade[grade]),
    );

    if (labels.length === 0 || data.length === 0) {
      return { labels: ['No Data'], data: [0] };
    }

    return { labels, data };
  };

  const chartData = processData();

  console.log(climbData);

  return (
    <Card elevate size="$5" bordered width="45%" margin="auto">
      <SizableText>Climb Attempts Over the Last Month</SizableText>
      <View>
        <Text>Attempts by Month</Text>
        <BarChart
          data={{
            labels: chartData.labels,
            datasets: [
              {
                data: chartData.data,
              },
            ],
          }}
          width={screenWidth * 0.9}
          height={220}
          yAxisLabel=""
          yAxisSuffix=""
          yAxisInterval={1}
          fromZero
          chartConfig={{
            backgroundColor: '#1e1e1e',
            backgroundGradientFrom: '#1e1e1e',
            backgroundGradientTo: '#1e1e1e',
            decimalPlaces: 0,
            barPercentage: 0.7,
            color: (opacity = 1) => `rgba(0, 200, 255, ${opacity})`, // 👈 bar color
            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`, // 👈 label color
            style: {
              borderRadius: 16,
            },
            propsForBackgroundLines: {
              stroke: '#444',
            },
          }}
          style={{
            marginVertical: 8,
            borderRadius: 16,
          }}
        />
      </View>
    </Card>
  );
};

export default LineChartWidget;

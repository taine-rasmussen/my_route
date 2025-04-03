import { useUser } from '@/app/contexts/UserContext';
import { getFromSecureStore } from '@/app/utils';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { Card, SizableText } from 'tamagui';
import { Dimensions, View, Text } from 'react-native';
import { LineChart } from 'react-native-chart-kit';

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

  // Prepare data for the chart
  const processData = () => {
    const attemptsByMonth: { [key: string]: number } = {};

    climbData.forEach((item: any) => {
      // or item: Climb if typed
      const month = moment(item.created_at).format('MMMM YYYY');
      if (!attemptsByMonth[month]) {
        attemptsByMonth[month] = 0;
      }
      attemptsByMonth[month] += item.attempts;
    });

    const labels = Object.keys(attemptsByMonth);
    const data = Object.values(attemptsByMonth) as number[];

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
        <LineChart
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
          yAxisInterval={1} // optional, defaults to 1
          chartConfig={{
            backgroundColor: '#e26a00',
            backgroundGradientFrom: '#fb8c00',
            backgroundGradientTo: '#ffa726',
            decimalPlaces: 2,
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            style: {
              borderRadius: 16,
            },
            propsForDots: {
              r: '6',
              strokeWidth: '2',
              stroke: '#ffa726',
            },
          }}
          bezier
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

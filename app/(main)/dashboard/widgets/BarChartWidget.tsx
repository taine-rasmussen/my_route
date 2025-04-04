import { useUser } from '@/app/contexts/UserContext';
import { getFromSecureStore } from '@/app/utils';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { Card, XStack, Group } from 'tamagui';
import { Dimensions, View } from 'react-native';
import { BarChart } from 'react-native-chart-kit';
import { AnimatePresence, MotiView } from 'moti';
import { MotiPressable } from 'moti/interactions';
import { Text } from 'react-native';

const BarChartWidget = () => {
  const screenWidth = Dimensions.get('window').width;
  const screenHeight = Dimensions.get('window').height;
  const [climbData, setClimbData] = useState([]);
  const [viewType, setViewType] = useState<'attempts' | 'count'>('attempts');

  const { user } = useUser();

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
    const climbsByGrade: { [grade: string]: number } = {};

    climbData.forEach((climb: any) => {
      if (!climb.grade || !climb.attempts) return;

      if (!attemptsByGrade[climb.grade]) {
        attemptsByGrade[climb.grade] = 0;
        climbsByGrade[climb.grade] = 0;
      }

      attemptsByGrade[climb.grade] += climb.attempts;
      climbsByGrade[climb.grade] += 1;
    });

    const sortedGrades = Object.keys(attemptsByGrade).sort((a, b) => {
      const valA = parseInt(a.replace('V', ''));
      const valB = parseInt(b.replace('V', ''));
      return valA - valB;
    });

    const labels = sortedGrades;
    const attemptData = sortedGrades.map((grade) =>
      Math.round(attemptsByGrade[grade]),
    );
    const climbDataCount = sortedGrades.map((grade) => climbsByGrade[grade]);

    return { labels, attemptData, climbDataCount };
  };

  const chart = processData();
  const chartWidth = screenWidth * 0.9;

  return (
    <Card
      elevate
      bordered
      borderRadius="$4"
      shadowColor="$shadowColor"
      shadowRadius="$4"
      p={'$4'}
    >
      <XStack gap={16} alignSelf="center" paddingBottom={'$4'}>
        <Group
          orientation="horizontal"
          borderRadius="$2"
          overflow="hidden"
          borderColor="$gray8"
        >
          {(['attempts', 'count'] as const).map((type, index) => {
            const isActive = viewType === type;

            return (
              <Group.Item key={type}>
                <MotiPressable
                  onPress={() => setViewType(type)}
                  animate={({ pressed }) => {
                    'worklet';
                    return {
                      scale: pressed ? 0.96 : 1,
                      backgroundColor: isActive ? '#FFA94D' : '#E0E0E0',
                    };
                  }}
                  transition={{
                    type: 'timing',
                    duration: 150,
                  }}
                  style={{
                    paddingVertical: 10,
                    paddingHorizontal: 20,
                    borderLeftWidth: index === 1 ? 2 : 0,
                    borderRightWidth: index === 1 ? 0 : 2,
                    borderColor: '#ccc',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <Text
                    style={{
                      color: isActive ? '#FFF' : '#333',
                      fontWeight: '600',
                    }}
                  >
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                  </Text>
                </MotiPressable>
              </Group.Item>
            );
          })}
        </Group>
      </XStack>

      <View style={{ paddingHorizontal: 12 }}>
        <AnimatePresence exitBeforeEnter>
          <MotiView
            key={viewType}
            from={{ opacity: 0, translateX: 40 }}
            animate={{ opacity: 1, translateX: 0 }}
            exit={{ opacity: 0, translateX: -40 }}
            transition={{
              type: 'spring',
              damping: 15,
              stiffness: 200,
              mass: 0.5,
            }}
          >
            <BarChart
              data={{
                labels: chart.labels,
                datasets: [
                  {
                    data:
                      viewType === 'attempts'
                        ? chart.attemptData
                        : chart.climbDataCount,
                  },
                ],
              }}
              width={chartWidth}
              height={screenHeight * 0.25}
              fromZero
              yAxisInterval={1}
              yAxisLabel=""
              yAxisSuffix=""
              chartConfig={{
                backgroundColor: '#1e1e1e',
                backgroundGradientFrom: '#1e1e1e',
                backgroundGradientTo: '#1e1e1e',
                decimalPlaces: 0,
                barPercentage: 0.7,
                color: (opacity = 1) => `rgba(72, 219, 251, ${opacity})`,
                labelColor: () => '#ffffff',
                propsForBackgroundLines: {
                  stroke: '#333',
                },
              }}
              style={{
                borderRadius: 8,
                marginLeft: -10,
              }}
            />
          </MotiView>
        </AnimatePresence>
      </View>
    </Card>
  );
};

export default BarChartWidget;

import { useUser } from '@/app/contexts/UserContext';
import { getFromSecureStore } from '@/app/utils';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { Card } from 'tamagui';
import { Dimensions, View, Text } from 'react-native';
import { BarChart } from 'react-native-chart-kit';
import { AnimatePresence, MotiView } from 'moti';
import { MotiPressable } from 'moti/interactions';
import Icon from 'react-native-vector-icons/MaterialIcons';

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

  const iconMapping = {
    attempts: 'show-chart',
    count: 'check-circle',
  };

  const dataArray =
    viewType === 'attempts' ? chart.attemptData : chart.climbDataCount;
  const maxValue = dataArray.length > 0 ? Math.max(...dataArray) : 0;
  const validMaxValue =
    Number.isFinite(maxValue) && maxValue > 0 ? maxValue : 1;
  const suggestedSegments = Math.min(validMaxValue, 5);

  const hasValidChartData =
    chart &&
    chart.labels.length > 0 &&
    (viewType === 'attempts'
      ? chart.attemptData.every((val) => typeof val === 'number')
      : chart.climbDataCount.every((val) => typeof val === 'number'));

  return (
    <Card
      elevate
      bordered
      borderRadius="$4"
      shadowColor="$shadowColor"
      shadowRadius="$4"
      p={'$4'}
    >
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingHorizontal: 12,
          marginBottom: 12,
        }}
      >
        <AnimatePresence exitBeforeEnter>
          <MotiView
            key={`label-${viewType}`}
            from={{ opacity: 0, translateY: -10 }}
            animate={{ opacity: 1, translateY: 0 }}
            exit={{ opacity: 0, translateY: -10 }}
            transition={{ type: 'spring', damping: 15, stiffness: 200 }}
          >
            <Text style={{ textAlign: 'left', fontSize: 16, color: '#fff' }}>
              {viewType === 'attempts'
                ? 'Total Attempts per Grade'
                : 'Completed Climbs per Grade'}
            </Text>
          </MotiView>
        </AnimatePresence>
        <View style={{ flexDirection: 'row' }}>
          {(['attempts', 'count'] as const).map((type, index) => {
            const isActive = viewType === type;
            return (
              <View key={type} style={{ marginLeft: index === 0 ? 0 : 10 }}>
                <MotiPressable
                  onPress={() => setViewType(type)}
                  hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                  animate={({ pressed }) => {
                    'worklet';
                    return {
                      scale: pressed ? 0.96 : 1,
                      backgroundColor: isActive ? '#FFA94D' : '#E0E0E0',
                    };
                  }}
                  transition={{ type: 'timing', duration: 150 }}
                  style={{
                    padding: 10,
                    borderRadius: 4,
                    justifyContent: 'center',
                    alignItems: 'center',
                    elevation: isActive ? 4 : 0,
                    shadowOpacity: isActive ? 0.3 : 0,
                    shadowRadius: isActive ? 4 : 0,
                    shadowOffset: { width: 0, height: isActive ? 2 : 0 },
                  }}
                >
                  <Icon
                    name={iconMapping[type]}
                    size={20}
                    color={isActive ? '#FFF' : '#333'}
                  />
                </MotiPressable>
              </View>
            );
          })}
        </View>
      </View>
      <View style={{ paddingHorizontal: 12 }}>
        <AnimatePresence exitBeforeEnter>
          <MotiView
            key={viewType}
            from={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ type: 'timing', duration: 300 }}
          >
            {hasValidChartData && (
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
                segments={suggestedSegments}
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
            )}
          </MotiView>
        </AnimatePresence>
      </View>
    </Card>
  );
};

export default BarChartWidget;

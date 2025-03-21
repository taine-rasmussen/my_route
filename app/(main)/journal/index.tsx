import React, { useEffect, useState, useCallback } from 'react';
import SafeAreaWrapper from '@/components/SafeAreaWrapper';
import { YStack, ScrollView, SizableText } from 'tamagui';
import JournalHeader from './header/JournalHeader';
import { getFromSecureStore } from '@/app/utils';
import { useUser } from '@/app/contexts/UserContext';
import ClimbCardSmall from './climbCards/ClimbCardSmall';
import ClimbCardLarge from './climbCards/ClimbCardLarge';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { IClimbData, IDateRange, SortOrder, VGrade } from '@/app/types';

const Journal = () => {
  const [climbs, setClimbs] = useState<IClimbData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [climbCardView, setClimbCardView] = useState<boolean>(false);
  const [sortOrder, setSortOrder] = useState<SortOrder>('newest');
  const [dateRange, setDateRange] = useState<IDateRange>({
    startDate: null,
    endDate: null,
  });
  const [gradeRange, setGradeRange] = useState<VGrade[]>([]);
  const { user } = useUser();
  const insets = useSafeAreaInsets();

  const getClimbsData = useCallback(async () => {
    try {
      const accessToken = await getFromSecureStore('access_token');

      const filters = {
        start_date: dateRange.startDate || null,
        end_date: dateRange.endDate || null,
        grade_range: gradeRange.length > 0 ? gradeRange : null,
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
      setClimbs(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, [user?.id, dateRange, gradeRange]);

  useEffect(() => {
    getClimbsData();
  }, [getClimbsData]);

  const handleRefresh = async () => {
    setLoading(true);
    await getClimbsData();
    setLoading(false);
  };

  const sortedClimbs = sortOrder === 'oldest' ? [...climbs].reverse() : climbs;

  return (
    <SafeAreaWrapper>
      <JournalHeader
        gradeRange={gradeRange}
        setGradeRange={setGradeRange}
        dateRange={dateRange}
        setDateRange={setDateRange}
        handleRefresh={handleRefresh}
        climbCardView={climbCardView}
        setClimbCardView={setClimbCardView}
        sortOrder={sortOrder}
        onSortChange={setSortOrder}
      />
      <ScrollView
        contentContainerStyle={{
          paddingBottom: insets.bottom + 64,
        }}
        showsVerticalScrollIndicator={false}
      >
        <YStack gap={16} paddingBlockStart={24}>
          {loading && <SizableText>Loading...</SizableText>}
          {!loading &&
            sortedClimbs.map((climb, index) =>
              climbCardView ? (
                <ClimbCardLarge key={index} climb={climb} />
              ) : (
                <ClimbCardSmall key={index} climb={climb} />
              ),
            )}
        </YStack>
      </ScrollView>
    </SafeAreaWrapper>
  );
};

export default Journal;

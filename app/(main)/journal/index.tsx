import React, { useEffect, useState, useCallback } from 'react';
import SafeAreaWrapper from '@/components/SafeAreaWrapper';
import { YStack, ScrollView, SizableText } from 'tamagui';
import JournalHeader from './header/JournalHeader';
import { getFromSecureStore } from '@/app/utils';
import { useUser } from '@/app/contexts/UserContext';
import ClimbCardSmall from './climbCards/ClimbCardSmall';
import ClimbCardLarge from './climbCards/ClimbCardLarge';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { IClimbData, SortOrder } from '@/app/types';

const Journal = () => {
  const [climbs, setClimbs] = useState<IClimbData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [climbCardView, setClimbCardView] = useState<boolean>(false);
  const [sortOrder, setSortOrder] = useState<SortOrder>('newest');
  const { user } = useUser();
  const insets = useSafeAreaInsets();

  const getClimbsData = useCallback(async () => {
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
      setClimbs(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, [user?.id]);

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

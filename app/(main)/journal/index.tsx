import React, { useEffect, useState, useCallback } from 'react';
import SafeAreaWrapper from '@/components/SafeAreaWrapper';
import JournaldClimbItem from './JournaldClimbItem';
import { YStack, ScrollView, SizableText } from 'tamagui';
import JournalHeader from './header/JournalHeader';
import { getFromSecureStore } from '@/app/utils';
import { useUser } from '@/app/contexts/UserContext';
import ClimbCardSmall from './ClimbCardSmall';

// A24 design princples

const Journal = () => {
  const [climbs, setClimbs] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const { user } = useUser();

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

  return (
    <SafeAreaWrapper>
      <JournalHeader handleRefresh={handleRefresh} />
      <ScrollView
        contentContainerStyle={{ paddingBottom: 24 }}
        showsVerticalScrollIndicator={false}
      >
        <YStack gap={16} paddingBlockStart={24}>
          {loading && <SizableText>Loading...</SizableText>}
          {!loading &&
            climbs.map((climb, index) => (
              // <JournaldClimbItem key={index} climb={climb} />
              <ClimbCardSmall key={index} climb={climb} />
            ))}
        </YStack>
      </ScrollView>
    </SafeAreaWrapper>
  );
};

export default Journal;

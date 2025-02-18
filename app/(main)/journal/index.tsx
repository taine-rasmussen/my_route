import React from 'react';
import SafeAreaWrapper from '@/components/SafeAreaWrapper';
import JournaldClimbItem from './JournaldClimbItem';
import { YStack } from 'tamagui';

const Tracker = () => {
  return (
    <SafeAreaWrapper>
      <YStack gap={16}>
        <JournaldClimbItem />
        <JournaldClimbItem />
        <JournaldClimbItem />
        <JournaldClimbItem />
      </YStack>
    </SafeAreaWrapper>
  );
};

export default Tracker;

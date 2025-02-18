import React from 'react';
import SafeAreaWrapper from '@/components/SafeAreaWrapper';
import JournaldClimbItem from './JournaldClimbItem';
import { YStack } from 'tamagui';
import JournalHeader from './header/JournalHeader';

const Tracker = () => {
  return (
    <SafeAreaWrapper>
      <JournalHeader />
      <YStack gap={16} paddingBlockStart={24}>
        <JournaldClimbItem />
      </YStack>
    </SafeAreaWrapper>
  );
};

export default Tracker;

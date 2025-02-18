import React from 'react';
import SafeAreaWrapper from '../../../components/SafeAreaWrapper';
import TrackedClimb from './TrackedClimb';
import { YStack } from 'tamagui';

const Tracker = () => {
  return (
    <SafeAreaWrapper>
      <YStack gap={16}>
        <TrackedClimb />
        <TrackedClimb />
        <TrackedClimb />
        <TrackedClimb />
      </YStack>
    </SafeAreaWrapper>
  );
};

export default Tracker;

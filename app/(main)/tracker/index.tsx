import React from 'react';
import { SizableText, Card } from 'tamagui';
import SafeAreaWrapper from '@/components/SafeAreaWrapper';

const Tracker = () => {
  return (
    <SafeAreaWrapper>
      <Card padding={4} elevate size="$5" bordered>
        <SizableText>TRACKER</SizableText>
      </Card>
    </SafeAreaWrapper>
  );
};

export default Tracker;

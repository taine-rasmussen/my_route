import { SizableText, Card, XStack } from 'tamagui';

const JournaldClimbItem = () => {
  return (
    <Card padding={4} elevate size="$5" bordered padded>
      <XStack gap={4}>
        <SizableText>Name</SizableText>
        <SizableText>date</SizableText>
        <SizableText>grade</SizableText>
        <SizableText>color band</SizableText>
      </XStack>
      {/* strip of colour at end of card? like jira - allow custom colors per grade for user to set */}
    </Card>
  );
};

export default JournaldClimbItem;

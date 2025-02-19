import { CirclePlus } from '@tamagui/lucide-icons';
import {
  Popover,
  SizableText,
  YStack,
  XStack,
  Label,
  Button,
  Input,
} from 'tamagui';
import { useState } from 'react';
import { Picker } from '@react-native-picker/picker';
import { VGrade } from '@/app/types';

const grades: VGrade[] = Array.from(
  { length: 18 },
  (_, i) => `V${i}` as VGrade,
);

const AddClimbPopover = () => {
  const [attempts, setAttempts] = useState<number>(0);
  const [grade, setGrade] = useState<VGrade>('V0'); // Ensure grade is never null

  return (
    <Popover size="$5" allowFlip stayInFrame offset={10} placement="bottom">
      <Popover.Trigger asChild>
        <Button icon={CirclePlus} scaleIcon={2} circular padding={8} />
      </Popover.Trigger>

      <Popover.Content
        borderWidth={1}
        borderColor="$borderColor"
        width={250}
        height={250}
        enterStyle={{ y: -10, opacity: 0 }}
        exitStyle={{ y: -10, opacity: 0 }}
        elevate
        animation={[
          'bouncy',
          {
            opacity: {
              overshootClamping: true,
            },
          },
        ]}
      >
        <Popover.Arrow borderWidth={1} borderColor="$borderColor" />
        <YStack gap="$3" width={'100%'}>
          <SizableText size={'$8'}>Log new climb</SizableText>

          <XStack gap="$3" alignItems="center">
            <Label size="$3">Grade</Label>
            <YStack
              flex={1}
              borderWidth={1}
              borderColor="$borderColor"
              borderRadius="$2"
            >
              <Picker
                selectedValue={grade}
                onValueChange={(value) => setGrade(value as VGrade)}
                style={{ height: 40, width: '100%' }}
              >
                {grades.map((g) => (
                  <Picker.Item key={g} label={g} value={g} />
                ))}
              </Picker>
            </YStack>
          </XStack>

          <XStack gap="$3">
            <Label size="$3">Attempts</Label>
            <Input
              keyboardType="numeric"
              width={80}
              value={attempts.toString()}
              onChangeText={(text) => setAttempts(Number(text) || 0)}
            />
          </XStack>

          <Popover.Close asChild>
            <Button size="$3">Save</Button>
          </Popover.Close>
        </YStack>
      </Popover.Content>
    </Popover>
  );
};

export default AddClimbPopover;

import { CirclePlus, ChevronDown, Check } from '@tamagui/lucide-icons';
import {
  Popover,
  SizableText,
  YStack,
  XStack,
  Label,
  Button,
  Input,
  Select,
  Adapt,
  Sheet,
} from 'tamagui';
import { useState } from 'react';
import { VGrade } from '@/app/types';

const grades: VGrade[] = Array.from(
  { length: 18 },
  (_, i) => `V${i}` as VGrade,
);

const AddClimbPopover = () => {
  const [attempts, setAttempts] = useState<number>(0);
  const [grade, setGrade] = useState<VGrade>('V0');

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
            <Select
              value={grade}
              onValueChange={(value) => setGrade(value as VGrade)}
            >
              <Select.Trigger width={120} iconAfter={ChevronDown}>
                <Select.Value placeholder="Select a grade" />
              </Select.Trigger>

              <Adapt when="sm" platform="touch">
                <Sheet native modal dismissOnSnapToBottom animation="medium">
                  <Sheet.Frame>
                    <Sheet.ScrollView>
                      <Adapt.Contents />
                    </Sheet.ScrollView>
                  </Sheet.Frame>
                </Sheet>
              </Adapt>

              <Select.Content zIndex={200000}>
                <Select.Viewport>
                  {grades.map((g, i) => (
                    <Select.Item key={g} index={i} value={g}>
                      <Select.ItemText>{g}</Select.ItemText>
                      <Select.ItemIndicator marginLeft="auto">
                        <Check size={16} />
                      </Select.ItemIndicator>
                    </Select.Item>
                  ))}
                </Select.Viewport>
              </Select.Content>
            </Select>
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

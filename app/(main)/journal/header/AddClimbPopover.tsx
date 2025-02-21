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
import { Dropdown } from 'react-native-element-dropdown';
import { VGrade } from '@/app/types';
import { StyleSheet } from 'react-native';

const grades = Array.from({ length: 18 }, (_, i) => ({
  label: `V${i}`,
  value: `V${i}`,
}));

const AddClimbPopover = () => {
  const [attempts, setAttempts] = useState<number>(0);
  const [grade, setGrade] = useState<VGrade>('V0');
  const [isFocus, setIsFocus] = useState(false);

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
        animation={['bouncy', { opacity: { overshootClamping: true } }]}
      >
        <Popover.Arrow borderWidth={1} borderColor="$borderColor" />
        <YStack gap="$3" width={'100%'}>
          <SizableText size={'$8'}>Log new climb</SizableText>

          <XStack gap="$3" alignItems="center">
            <Label size="$3">Grade</Label>
            <Dropdown
              style={[styles.dropdown, isFocus && { borderColor: 'white' }]}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              data={grades}
              labelField="label"
              valueField="value"
              placeholder="Select a grade"
              value={grade}
              onFocus={() => setIsFocus(true)}
              onBlur={() => setIsFocus(false)}
              onChange={(item) => {
                setGrade(item.value as VGrade);
                setIsFocus(false);
              }}
            />
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

const styles = StyleSheet.create({
  dropdown: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 8,
    flex: 1,
  },
  placeholderStyle: {
    fontSize: 14,
    color: 'gray',
  },
  selectedTextStyle: {
    fontSize: 14,
    color: 'black',
  },
});

export default AddClimbPopover;

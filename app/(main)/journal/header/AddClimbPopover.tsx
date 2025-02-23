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
import { GradeStyle, VGrade } from '@/app/types';
import { useColorScheme } from 'react-native';
import { useUser } from '@/app/contexts/UserContext';
import { getClimbingGrades } from '@/app/utils';

const getStyles = (isDarkMode: boolean) => {
  return {
    dropdown: {
      height: 40,
      borderWidth: 1,
      borderRadius: 8,
      paddingHorizontal: 8,
      flex: 1,
    },
    dropdownContainerStyle: {
      backgroundColor: isDarkMode ? 'black' : 'white',
    },
    placeholderStyle: {
      fontSize: 14,
      color: isDarkMode ? 'white' : 'black',
    },
    selectedTextStyle: {
      fontSize: 14,
      color: isDarkMode ? 'white' : 'black',
    },
    itemTextStyle: {
      fontSize: 14,
      color: isDarkMode ? 'white' : 'black',
    },
  };
};

const AddClimbPopover = () => {
  const [attempts, setAttempts] = useState<number>(0);
  const [grade, setGrade] = useState<VGrade | null>(null);
  const [isFocus, setIsFocus] = useState(false);

  const { themePreference, user } = useUser();
  const userGrade = user?.grade_style ?? 'V Scale';
  const dropDownItems = getClimbingGrades(userGrade as GradeStyle);

  const systemColorScheme = useColorScheme();
  const colorScheme =
    themePreference === 'system' ? systemColorScheme : themePreference;

  const isDarkMode = colorScheme === 'dark';

  const handleChange = (item: { label: string; value: VGrade }) => {
    setGrade(item.value);
    setIsFocus(false);
  };

  const styles = getStyles(isDarkMode);

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
            <Dropdown
              style={[
                styles.dropdown,
                isFocus && { borderColor: isDarkMode ? 'white' : 'black' },
              ]}
              containerStyle={styles.dropdownContainerStyle}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              itemTextStyle={styles.itemTextStyle}
              data={dropDownItems}
              labelField="label"
              valueField="value"
              placeholder="Select a grade"
              value={grade}
              onFocus={() => setIsFocus(true)}
              onBlur={() => setIsFocus(false)}
              onChange={handleChange}
              activeColor={isDarkMode ? 'black' : 'white'}
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

export default AddClimbPopover;
